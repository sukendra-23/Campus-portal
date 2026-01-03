/**
 * Authentication JavaScript
 * Handles user login, registration, and session management
 */

/**
 * Initialize authentication functionality
 */
function initAuth() {
    // Check if user is already logged in
    if (isAuthenticated()) {
        redirectToHome();
        return;
    }
    
    // Initialize login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Initialize registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // Add password confirmation validation
        const confirmPasswordField = document.getElementById('register-confirm-password');
        const passwordField = document.getElementById('register-password');
        
        if (confirmPasswordField && passwordField) {
            confirmPasswordField.addEventListener('input', () => {
                validatePasswordMatch(passwordField, confirmPasswordField);
            });
        }
    }
}

/**
 * Handle login form submission
 * @param {Event} e - Form submit event
 */
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    // Remove any existing error messages
    removeAuthMessages();
    
    // Validate inputs
    if (!email || !password) {
        showAuthError('Please fill in all fields');
        return;
    }
    
    if (!validateEmail(email)) {
        showAuthError('Please enter a valid email address');
        return;
    }
    
    // Get users from localStorage
    const users = getFromStorage('users') || [];
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showAuthError('Invalid email or password');
        return;
    }
    
    // Create session
    const session = {
        email: user.email,
        name: user.name,
        loginTime: new Date().toISOString()
    };
    
    // Save session
    saveToStorage('currentUser', session);
    saveToStorage('isAuthenticated', true);
    
    // Update user info in storage (for dashboard)
    saveToStorage('userInfo', {
        name: user.name,
        email: user.email,
        registeredEvents: user.registeredEvents || []
    });
    
    // Show success message
    showAuthSuccess('Login successful! Redirecting...');
    
    // Redirect to home page
    setTimeout(() => {
        redirectToHome();
    }, 1000);
}

/**
 * Handle registration form submission
 * @param {Event} e - Form submit event
 */
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Remove any existing error messages
    removeAuthMessages();
    
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        showAuthError('Please fill in all fields');
        return;
    }
    
    if (!validateName(name)) {
        showAuthError('Please enter a valid name (2-50 characters, letters only)');
        return;
    }
    
    if (!validateEmail(email)) {
        showAuthError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showAuthError('Password must be at least 6 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthError('Passwords do not match');
        return;
    }
    
    // Get users from localStorage
    const users = getFromStorage('users') || [];
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        showAuthError('An account with this email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password, // In real app, this would be hashed
        registeredEvents: [],
        createdAt: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    saveToStorage('users', users);
    
    // Auto-login after registration
    const session = {
        email: newUser.email,
        name: newUser.name,
        loginTime: new Date().toISOString()
    };
    
    saveToStorage('currentUser', session);
    saveToStorage('isAuthenticated', true);
    saveToStorage('userInfo', {
        name: newUser.name,
        email: newUser.email,
        registeredEvents: []
    });
    
    // Show success message
    showAuthSuccess('Registration successful! Redirecting...');
    
    // Redirect to home page
    setTimeout(() => {
        redirectToHome();
    }, 1000);
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
function isAuthenticated() {
    return getFromStorage('isAuthenticated') === true;
}

/**
 * Get current user session
 * @returns {Object|null} User session object or null
 */
function getCurrentUser() {
    return getFromStorage('currentUser');
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userInfo');
    redirectToLogin();
}

/**
 * Redirect to home page
 */
function redirectToHome() {
    window.location.href = 'home.html';
}

/**
 * Redirect to login page
 */
function redirectToLogin() {
    window.location.href = 'index.html';
}

/**
 * Check authentication and redirect if not logged in
 */
function requireAuth() {
    if (!isAuthenticated()) {
        redirectToLogin();
        return false;
    }
    return true;
}

/**
 * Show authentication error message
 * @param {string} message - Error message
 */
function showAuthError(message) {
    removeAuthMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error';
    errorDiv.textContent = message;
    
    const form = document.querySelector('.auth-form');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
    }
}

/**
 * Show authentication success message
 * @param {string} message - Success message
 */
function showAuthSuccess(message) {
    removeAuthMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'auth-success';
    successDiv.textContent = message;
    
    const form = document.querySelector('.auth-form');
    if (form) {
        form.insertBefore(successDiv, form.firstChild);
    }
}

/**
 * Remove authentication messages
 */
function removeAuthMessages() {
    const messages = document.querySelectorAll('.auth-error, .auth-success');
    messages.forEach(msg => msg.remove());
}

/**
 * Validate password match
 * @param {HTMLElement} passwordField - Password input field
 * @param {HTMLElement} confirmField - Confirm password input field
 */
function validatePasswordMatch(passwordField, confirmField) {
    if (confirmField.value && passwordField.value !== confirmField.value) {
        showFieldError(confirmField, 'Passwords do not match');
    } else {
        removeFieldError(confirmField);
    }
}

// Make functions globally available
window.logout = logout;
window.isAuthenticated = isAuthenticated;
window.getCurrentUser = getCurrentUser;
window.requireAuth = requireAuth;

