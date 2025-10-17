// ============================================
// DRIFTBOYZ GARAGE - Main JavaScript
// ============================================

// DOM Elements
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav__link');

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
if (navToggle) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call on page load
setActiveNavLink();

// ============================================
// INTERSECTION OBSERVER - FADE IN ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and sections
document.querySelectorAll('.service-card, .stat-card, .section__header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// PHONE NUMBER TRACKING (for analytics)
// ============================================
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', () => {
        // Google Analytics event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'phone_click', {
                'event_category': 'Contact',
                'event_label': phoneLink.getAttribute('href')
            });
        }
        console.log('Phone link clicked:', phoneLink.getAttribute('href'));
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// BACK TO TOP BUTTON (optional)
// ============================================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-gold);
        border: none;
        border-radius: 50%;
        color: var(--black);
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow-gold);
    `;

    document.body.appendChild(button);

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 6px 25px rgba(255, 181, 46, 0.6)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'var(--shadow-gold)';
    });
}

// Initialize back to top button
createBackToTopButton();

// ============================================
// CONSOLE BRANDING
// ============================================
console.log(
    '%c🏁 DriftBoyz Garage',
    'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #FFB52E 0%, #FF8C00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
);
console.log(
    '%cDRIFT. CUSTOM. PERFORMANCE.',
    'font-size: 14px; color: #FFB52E; font-weight: bold;'
);
console.log(
    '%cZainteresowany pracą? kontakt@driftboyzgarage.pl',
    'font-size: 12px; color: #1E90FF;'
);
