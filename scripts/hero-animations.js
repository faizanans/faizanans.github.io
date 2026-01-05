// hero-animations.js - Modern minimalist hero animations

// Animate elements on page load
document.addEventListener('DOMContentLoaded', function() {
    animateHeroElements();
    initTagHoverEffects();
    animateStats();
});

// Animate hero elements with stagger effect
function animateHeroElements() {
    const elements = [
        { selector: '.hero-name', delay: 200 },
        { selector: '.hero-role', delay: 400 },
        { selector: '.expertise-tags', delay: 600 },
        { selector: '.hero-stats', delay: 800 },
        { selector: '.hero-actions', delay: 1000 },
        { selector: '.scroll-indicator', delay: 1200 }
    ];

    elements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
    });

    // Animate individual expertise tags
    const tags = document.querySelectorAll('.expertise-tag');
    tags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, 700 + (index * 100));
    });
}

// Add interactive hover effects to expertise tags
function initTagHoverEffects() {
    const tags = document.querySelectorAll('.expertise-tag');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Slight tilt effect
            const randomTilt = (Math.random() - 0.5) * 4;
            this.style.transform = `translateY(-3px) rotate(${randomTilt}deg)`;
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Animate stats with counting effect
function animateStats() {
    const stats = [
        { selector: '.hero-stats .stat:nth-child(1) .stat-number', target: 5, suffix: '+', duration: 1500 },
        { selector: '.hero-stats .stat:nth-child(2) .stat-number', target: 50, suffix: '+', duration: 2000 },
        { selector: '.hero-stats .stat:nth-child(3) .stat-number', target: 10, suffix: '+', duration: 1800 }
    ];

    // Intersection observer for stats
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(({ selector, target, suffix, duration }) => {
                    const element = document.querySelector(selector);
                    if (element && !element.dataset.animated) {
                        element.dataset.animated = 'true';
                        animateNumber(element, 0, target, suffix, duration);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

// Animate number counting
function animateNumber(element, start, end, suffix, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Parallax effect for hero section on scroll
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            applyParallax();
            ticking = false;
        });
        ticking = true;
    }
});

function applyParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContainer = document.querySelector('.hero-container');
    const accents = document.querySelectorAll('.hero-accent');
    
    if (hero && scrolled < hero.offsetHeight) {
        // Move hero container slightly slower
        if (heroContainer) {
            heroContainer.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContainer.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
        }
        
        // Move accent elements
        accents.forEach((accent, index) => {
            const speed = index === 0 ? 0.2 : 0.15;
            accent.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
        });
    }
}

// Add ripple effect to buttons
document.querySelectorAll('.hero-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('button-ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .hero-btn {
        position: relative;
        overflow: hidden;
    }
    .button-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: button-ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes button-ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Smooth scroll for hero buttons
document.querySelectorAll('.hero-btn[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mouse move parallax effect for accent elements
document.addEventListener('mousemove', (e) => {
    const accents = document.querySelectorAll('.hero-accent');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    accents.forEach((accent, index) => {
        const speed = index === 0 ? 20 : -20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        accent.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add glowing effect on expertise tags
function addGlowEffect() {
    const tags = document.querySelectorAll('.expertise-tag');
    
    setInterval(() => {
        const randomTag = tags[Math.floor(Math.random() * tags.length)];
        randomTag.style.boxShadow = '0 0 20px rgba(79, 172, 254, 0.4)';
        
        setTimeout(() => {
            randomTag.style.boxShadow = '';
        }, 2000);
    }, 3000);
}

// Initialize glow effect after page load
setTimeout(addGlowEffect, 2000);