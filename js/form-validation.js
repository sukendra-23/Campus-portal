/**
 * Form Validation Functions
 * Handles validation for contact form and other forms
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate name (letters and spaces only, 2-50 characters)
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
}

/**
 * Validate message (minimum 10 characters)
 * @param {string} message - Message to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateMessage(message) {
    return message.trim().length >= 10;
}

/**
 * Show field error message
 * @param {HTMLElement} field - Input field element
 * @param {string} message - Error message to display
 */
function showFieldError(field, message) {
    // Remove existing error
    removeFieldError(field);
    
    // Add error class
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Insert after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

/**
 * Remove field error message
 * @param {HTMLElement} field - Input field element
 */
function removeFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Validate contact form
 * @param {HTMLFormElement} form - Form element to validate
 * @returns {boolean} True if form is valid, false otherwise
 */
function validateContactForm(form) {
    let isValid = true;
    
    // Get form fields
    const nameField = form.querySelector('#name');
    const emailField = form.querySelector('#email');
    const messageField = form.querySelector('#message');
    
    // Validate name
    if (!nameField || !validateName(nameField.value)) {
        if (nameField) {
            showFieldError(nameField, 'Please enter a valid name (2-50 characters, letters only)');
        }
        isValid = false;
    } else if (nameField) {
        removeFieldError(nameField);
    }
    
    // Validate email
    if (!emailField || !validateEmail(emailField.value)) {
        if (emailField) {
            showFieldError(emailField, 'Please enter a valid email address');
        }
        isValid = false;
    } else if (emailField) {
        removeFieldError(emailField);
    }
    
    // Validate message
    if (!messageField || !validateMessage(messageField.value)) {
        if (messageField) {
            showFieldError(messageField, 'Message must be at least 10 characters long');
        }
        isValid = false;
    } else if (messageField) {
        removeFieldError(messageField);
    }
    
    return isValid;
}

/**
 * Initialize form validation
 * @param {string} formId - ID of the form to initialize
 */
function initFormValidation(formId) {
    const form = document.getElementById(formId);
    
    if (!form) {
        return;
    }
    
    // Add real-time validation on blur
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        field.addEventListener('blur', () => {
            validateField(field);
        });
        
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateContactForm(form)) {
            // Form is valid - handle submission
            handleFormSubmission(form);
        } else {
            showNotification('Please fix the errors in the form', 'error');
        }
    });
}

/**
 * Validate individual field
 * @param {HTMLElement} field - Field element to validate
 */
function validateField(field) {
    const fieldName = field.name || field.id;
    const fieldValue = field.value.trim();
    
    switch (fieldName) {
        case 'name':
            if (!validateName(fieldValue)) {
                showFieldError(field, 'Please enter a valid name (2-50 characters, letters only)');
            } else {
                removeFieldError(field);
            }
            break;
            
        case 'email':
            if (!validateEmail(fieldValue)) {
                showFieldError(field, 'Please enter a valid email address');
            } else {
                removeFieldError(field);
            }
            break;
            
        case 'message':
            if (!validateMessage(fieldValue)) {
                showFieldError(field, 'Message must be at least 10 characters long');
            } else {
                removeFieldError(field);
            }
            break;
    }
}

/**
 * Handle form submission (mock - no backend)
 * @param {HTMLFormElement} form - Form element
 */
function handleFormSubmission(form) {
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        message: form.querySelector('#message').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (mock storage)
    const submissions = getFromStorage('contactSubmissions') || [];
    submissions.push(formData);
    saveToStorage('contactSubmissions', submissions);
    
    // Show success message
    showNotification('Thank you! Your message has been sent successfully.', 'success');
    
    // Reset form
    form.reset();
}

