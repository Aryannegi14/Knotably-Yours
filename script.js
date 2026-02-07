/* ============================================
   KNOTABLY YOURS - INTERACTIVE FEATURES
   JavaScript for smooth interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initObserverAnimations();
    initHoverEffects();
});

/* ============================================
   MOBILE MENU FUNCTIONALITY
   ============================================ */

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu?.contains(event.target) || hamburger?.contains(event.target);
        if (!isClickInside && navMenu?.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ============================================
   SMOOTH SCROLL ENHANCEMENT
   ============================================ */

function initSmoothScroll() {
    // Smooth scroll on anchor clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   FORM VALIDATION & SUBMISSION
   ============================================ */

function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            date: document.getElementById('date').value,
            message: document.getElementById('message').value.trim()
        };

        // Validate required fields
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email format
        if (!isValidEmail(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Show success message
        showNotification('Thank you! We\'ve received your inquiry and will be in touch within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // In a real application, you would send this data to a server
        console.log('Form submitted with data:', formData);
    });
}

/* Email validation helper */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* Show notification toast */
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        }, { once: true });
    }, 4000);
}

/* ============================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */

function initObserverAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards, testimonial cards, and gallery items
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .gallery-item, .testimonial-card, .contact-form, .contact-info'
    );

    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

/* ============================================
   HOVER EFFECTS
   ============================================ */

function initHoverEffects() {
    // Service cards - add interactive hover state
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Gallery items - enhanced click interaction
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Add a subtle ripple effect on click
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/* ============================================
   NAVBAR STYLING ON SCROLL
   ============================================ */

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(61, 61, 61, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 15px rgba(61, 61, 61, 0.08)';
    }
});

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce function for scroll and resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle viewport changes efficiently
const handleResize = debounce(function() {
    // Recalculate any layout-dependent values here if needed
}, 250);

window.addEventListener('resize', handleResize);

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

// Ensure keyboard navigation works smoothly
document.addEventListener('keydown', function(event) {
    // Close mobile menu with Escape key
    if (event.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu?.classList.contains('active')) {
            hamburger?.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

/* ============================================
   LAZY LOADING SUPPORT
   ============================================ */

// Support for native lazy loading
if ('IntersectionObserver' in window) {
    const imageElements = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    imageElements.forEach(img => imageObserver.observe(img));
}

/* ============================================
   NOTIFICATION STYLES
   ============================================ */

// Add CSS for notifications dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        max-width: 300px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 8px 25px rgba(61, 61, 61, 0.15);
    }

    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }

    .notification-success {
        background: linear-gradient(135deg, #B8D4B8, #B8D4C8);
        color: white;
    }

    .notification-error {
        background: linear-gradient(135deg, #E8B4C8, #D4A8A8);
        color: white;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* Scrollbar styling for better aesthetics */
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f5f5f5;
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #E8B4C8, #D4A574);
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #D4A574, #B8D4B8);
    }
`;

document.head.appendChild(style);

/* ============================================
   LOADING OPTIMIZATION
   ============================================ */

// Preload critical fonts
const link = document.createElement('link');
link.rel = 'preload';
link.as = 'style';
link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap';
document.head.appendChild(link);

console.log('Knotably Yours - Initialized successfully');
