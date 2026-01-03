/**
 * Dashboard Page JavaScript
 * Handles user dashboard functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load navbar and footer
    loadComponent('navbar', 'navbar-container');
    loadComponent('footer', 'footer-container');
    
    // Update auth link after navbar loads (with small delay)
    setTimeout(() => {
        if (typeof updateAuthNavLink === 'function') {
            updateAuthNavLink();
        }
    }, 100);
    
    // Load user dashboard data
    loadDashboardData();
    
    // Initialize mock payment button
    initMockPayment();
});

/**
 * Load and display user dashboard data
 */
async function loadDashboardData() {
    // Get user info from localStorage
    const userInfo = getFromStorage('userInfo');
    
    if (!userInfo) {
        // No user data - show registration prompt
        showRegistrationPrompt();
        return;
    }
    
    // Display user info
    displayUserInfo(userInfo);
    
    // Load registered events
    if (userInfo.registeredEvents && userInfo.registeredEvents.length > 0) {
        await loadRegisteredEvents(userInfo.registeredEvents);
    } else {
        showNoEventsMessage();
    }
}

/**
 * Display user information
 * @param {Object} userInfo - User information object
 */
function displayUserInfo(userInfo) {
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');
    
    if (userNameElement) {
        userNameElement.textContent = userInfo.name || 'User';
    }
    
    if (userEmailElement) {
        userEmailElement.textContent = userInfo.email || 'No email';
    }
}

/**
 * Load and display registered events
 * @param {Array} eventIds - Array of event IDs
 */
async function loadRegisteredEvents(eventIds) {
    try {
        const response = await fetch('data/events.json');
        const allEvents = await response.json();
        
        // Filter registered events
        const registeredEvents = allEvents.filter(event => 
            eventIds.includes(event.id)
        );
        
        const eventsContainer = document.getElementById('registered-events');
        if (!eventsContainer) return;
        
        // Clear existing content
        eventsContainer.innerHTML = '';
        
        if (registeredEvents.length === 0) {
            showNoEventsMessage();
            return;
        }
        
        // Display registered events
        registeredEvents.forEach(event => {
            const eventCard = createDashboardEventCard(event);
            eventsContainer.appendChild(eventCard);
        });
        
    } catch (error) {
        console.error('Error loading registered events:', error);
        const eventsContainer = document.getElementById('registered-events');
        if (eventsContainer) {
            eventsContainer.innerHTML = '<p class="error-message">Unable to load events.</p>';
        }
    }
}

/**
 * Create event card for dashboard
 * @param {Object} event - Event object
 * @returns {HTMLElement} Event card element
 */
function createDashboardEventCard(event) {
    const card = document.createElement('div');
    card.className = 'dashboard-event-card';
    
    card.innerHTML = `
        <div class="dashboard-event-image">
            <img src="assets/images/${event.image}" alt="${event.title}" onerror="this.src='assets/images/placeholder.jpg'">
        </div>
        <div class="dashboard-event-info">
            <h3>${event.title}</h3>
            <p class="event-category">${event.category}</p>
            <div class="event-details-mini">
                <span>📅 ${formatDate(event.date)}</span>
                <span>🕐 ${event.time}</span>
                <span>📍 ${event.venue}</span>
            </div>
            <div class="event-status">
                <span class="status-badge registered">Registered</span>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Show message when no events are registered
 */
function showNoEventsMessage() {
    const eventsContainer = document.getElementById('registered-events');
    if (eventsContainer) {
        eventsContainer.innerHTML = `
            <div class="no-events-message">
                <p>You haven't registered for any events yet.</p>
                <a href="events.html" class="btn btn-primary">Browse Events</a>
            </div>
        `;
    }
}

/**
 * Show registration prompt for new users
 */
function showRegistrationPrompt() {
    const dashboardContent = document.getElementById('dashboard-content');
    if (dashboardContent) {
        dashboardContent.innerHTML = `
            <div class="registration-prompt">
                <h2>Welcome to Campus Events Portal</h2>
                <p>Register for events to see them in your dashboard.</p>
                <a href="events.html" class="btn btn-primary">Browse Events</a>
            </div>
        `;
    }
}

/**
 * Initialize mock payment functionality
 */
function initMockPayment() {
    const paymentButton = document.getElementById('mock-payment-btn');
    
    if (paymentButton) {
        paymentButton.addEventListener('click', () => {
            showMockPaymentModal();
        });
    }
}

/**
 * Show mock payment modal (Demo only - no real payment)
 */
function showMockPaymentModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Mock Payment (Demo Only)</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>⚠️ This is a demonstration only. No real payment will be processed.</strong></p>
                <div class="mock-payment-form">
                    <div class="form-group">
                        <label>Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" maxlength="5">
                    </div>
                    <div class="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" maxlength="3">
                    </div>
                    <div class="form-group">
                        <label>Amount</label>
                        <input type="text" value="$0.00 (Free Event)" readonly>
                    </div>
                    <button class="btn btn-primary" onclick="processMockPayment(this)">Complete Payment (Mock)</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Process mock payment (Demo only)
 * @param {HTMLElement} button - Button element
 */
function processMockPayment(button) {
    button.textContent = 'Processing...';
    button.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        const modal = button.closest('.modal-overlay');
        modal.remove();
        showNotification('Payment processed successfully! (Mock Transaction - No Real Money Charged)', 'success');
    }, 2000);
}

// Make function globally available
window.processMockPayment = processMockPayment;

