/**
 * Utility Functions
 * Common helper functions used across the application
 */

/**
 * Load a component (navbar or footer) into a page
 * @param {string} componentName - Name of the component ('navbar' or 'footer')
 * @param {string} targetId - ID of the target element where component will be inserted
 */
function loadComponent(componentName, targetId) {
    fetch(`components/${componentName}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById(targetId).innerHTML = html;
            
            // Initialize navbar functionality after loading
            if (componentName === 'navbar') {
                initNavbar();
            }
        })
        .catch(error => {
            console.error(`Error loading ${componentName}:`, error);
        });
}

/**
 * Initialize navbar toggle functionality for mobile
 */
function initNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Update authentication link in navbar
    updateAuthNavLink();
}

/**
 * Update authentication link in navbar (Login/Logout)
 */
function updateAuthNavLink() {
    const authNavItem = document.getElementById('auth-nav-item');
    if (!authNavItem) return;
    
    // Check if auth.js is loaded
    if (typeof isAuthenticated === 'function' && isAuthenticated()) {
        const currentUser = getCurrentUser();
        authNavItem.innerHTML = `
            <a href="#" class="nav-link" onclick="logout(); return false;">Logout (${currentUser ? currentUser.name : 'User'})</a>
        `;
    } else {
        authNavItem.innerHTML = `
            <a href="index.html" class="nav-link">Login</a>
        `;
    }
}

/**
 * Smooth scroll to a section
 * @param {string} targetId - ID of the target section
 */
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Format date string to readable format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @returns {any} Parsed data or null
 */
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification ('success' or 'error')
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

