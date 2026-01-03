/**
 * Main JavaScript File
 * Handles initialization and main page interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load navbar and footer components
    loadComponent('navbar', 'navbar-container');
    loadComponent('footer', 'footer-container');
    
    // Update auth link after navbar loads (with small delay)
    setTimeout(() => {
        if (typeof updateAuthNavLink === 'function') {
            updateAuthNavLink();
        }
    }, 100);
    
    // Initialize FAQ toggle functionality
    initFAQ();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Load events gallery on index page
    if (document.getElementById('events-gallery')) {
        loadEventsGallery();
    }
    
    // Initialize navbar scroll effect
    initNavbarScroll();
});

/**
 * Initialize FAQ section with show/hide functionality
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal anchor links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                smoothScroll(targetId);
            }
        });
    });
}

/**
 * Load events gallery dynamically from JSON
 */
async function loadEventsGallery() {
    try {
        const response = await fetch('data/events.json');
        const events = await response.json();
        
        const galleryContainer = document.getElementById('events-gallery');
        if (!galleryContainer) return;
        
        // Clear existing content
        galleryContainer.innerHTML = '';
        
        // Display first 6 events
        const displayEvents = events.slice(0, 6);
        
        displayEvents.forEach(event => {
            const eventCard = createEventCard(event);
            galleryContainer.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Error loading events:', error);
        galleryContainer.innerHTML = '<p>Unable to load events. Please try again later.</p>';
    }
}

/**
 * Create an event card element
 * @param {Object} event - Event object from JSON
 * @returns {HTMLElement} Event card element
 */
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <div class="event-image">
            <img src="assets/images/${event.image}" alt="${event.title}" onerror="this.src='assets/images/placeholder.jpg'">
            <span class="event-category">${event.category}</span>
        </div>
        <div class="event-content">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <div class="event-details">
                <span class="event-date">📅 ${formatDate(event.date)}</span>
                <span class="event-time">🕐 ${event.time}</span>
                <span class="event-venue">📍 ${event.venue}</span>
            </div>
            <a href="events.html" class="btn btn-primary">Learn More</a>
        </div>
    `;
    
    return card;
}

/**
 * Initialize navbar scroll effect (sticky navbar)
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

