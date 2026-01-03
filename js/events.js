/**
 * Events Page JavaScript
 * Handles events listing and filtering
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
    
    // Load all events
    loadAllEvents();
    
    // Initialize event filters
    initEventFilters();
});

/**
 * Load all events from JSON and display them
 */
async function loadAllEvents() {
    try {
        const response = await fetch('data/events.json');
        const events = await response.json();
        
        const eventsContainer = document.getElementById('events-container');
        if (!eventsContainer) return;
        
        // Clear existing content
        eventsContainer.innerHTML = '';
        
        // Display all events
        events.forEach(event => {
            const eventCard = createEventCardDetailed(event);
            eventsContainer.appendChild(eventCard);
        });
        
        // Store events for filtering
        window.allEvents = events;
        
    } catch (error) {
        console.error('Error loading events:', error);
        const eventsContainer = document.getElementById('events-container');
        if (eventsContainer) {
            eventsContainer.innerHTML = '<p class="error-message">Unable to load events. Please try again later.</p>';
        }
    }
}

/**
 * Create a detailed event card for events page
 * @param {Object} event - Event object from JSON
 * @returns {HTMLElement} Event card element
 */
function createEventCardDetailed(event) {
    const card = document.createElement('div');
    card.className = 'event-card-detailed';
    card.dataset.category = event.category.toLowerCase();
    
    card.innerHTML = `
        <div class="event-image-detailed">
            <img src="assets/images/${event.image}" alt="${event.title}" onerror="this.src='assets/images/placeholder.jpg'">
            <span class="event-category-badge">${event.category}</span>
        </div>
        <div class="event-info-detailed">
            <h2>${event.title}</h2>
            <p class="event-description">${event.description}</p>
            <div class="event-meta">
                <div class="meta-item">
                    <span class="meta-icon">📅</span>
                    <span class="meta-text">${formatDate(event.date)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-icon">🕐</span>
                    <span class="meta-text">${event.time}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-icon">📍</span>
                    <span class="meta-text">${event.venue}</span>
                </div>
            </div>
            <button class="btn btn-register" onclick="handleEventRegistration(${event.id})">Register Now</button>
        </div>
    `;
    
    return card;
}

/**
 * Initialize event category filters
 */
function initEventFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category
            const category = button.dataset.category;
            
            // Filter events
            filterEvents(category);
        });
    });
}

/**
 * Filter events by category
 * @param {string} category - Category to filter by ('all' for all events)
 */
function filterEvents(category) {
    const eventCards = document.querySelectorAll('.event-card-detailed');
    
    eventCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category.toLowerCase()) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Handle event registration (Mock/Demo only)
 * @param {number} eventId - ID of the event to register for
 */
function handleEventRegistration(eventId) {
    // Mock registration - no real backend
    const events = window.allEvents || [];
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        showNotification('Event not found', 'error');
        return;
    }
    
    // Get user info from localStorage (if available)
    const userInfo = getFromStorage('userInfo');
    
    if (!userInfo) {
        // Prompt for user info (mock)
        const userName = prompt('Enter your name (Mock Registration):');
        if (!userName) return;
        
        const userEmail = prompt('Enter your email (Mock Registration):');
        if (!userEmail) return;
        
        const userData = {
            name: userName,
            email: userEmail,
            registeredEvents: []
        };
        saveToStorage('userInfo', userData);
    }
    
    // Register for event
    const userData = getFromStorage('userInfo');
    if (!userData.registeredEvents) {
        userData.registeredEvents = [];
    }
    
    // Check if already registered
    if (userData.registeredEvents.includes(eventId)) {
        showNotification('You are already registered for this event', 'error');
        return;
    }
    
    // Add event to registered events
    userData.registeredEvents.push(eventId);
    saveToStorage('userInfo', userData);
    
    // Show success message
    showNotification(`Successfully registered for ${event.title}! (Mock Registration)`, 'success');
    
    // Redirect to dashboard after a delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

