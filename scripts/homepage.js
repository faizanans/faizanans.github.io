// homepage.js - Homepage specific functionality

// Dynamic text animation for hero section
function startDynamicText() {
    const words = [
        "Software Engineer", 
        "Programmer", 
        "Software Architect", 
        "Application Developer", 
        "Coder", 
        "Builder", 
        "Technologist", 
        "Full Stack Developer"
    ];
    
    let currentIndex = 0;
    const dynamicWord = document.querySelector('.dynamic-word');
    
    if (!dynamicWord) return;
    
    function changeWord() {
        // Fade out
        dynamicWord.style.opacity = '0';
        dynamicWord.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            // Change text
            dynamicWord.textContent = words[currentIndex];
            currentIndex = (currentIndex + 1) % words.length;
            
            // Fade in
            dynamicWord.style.opacity = '1';
            dynamicWord.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Start the animation
    setInterval(changeWord, 3000);
}

// Intersection Observer for experience cards animations
function initExperienceCardsAnimation() {
    const experienceCards = document.querySelectorAll('.experience-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    experienceCards.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// About cards animation
function initAboutCardsAnimation() {
    const aboutCards = document.querySelectorAll('.about-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });
    
    aboutCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Typing effect for subtitle
function initTypingEffect() {
    const subtitle = document.querySelector('.hero .subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    subtitle.style.borderRight = '2px solid #a78bfa';
    
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Skills progress animation
function initSkillsAnimation() {
    const skills = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-fill');
                const percentage = progressBar.dataset.percentage;
                
                progressBar.style.width = percentage + '%';
            }
        });
    });
    
    skills.forEach(skill => observer.observe(skill));
}

// Initialize all homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    // Start dynamic text animation
    startDynamicText();
    
    // Initialize animations
    initExperienceCardsAnimation();
    initAboutCardsAnimation();
    initParallaxEffect();
    
    // Add subtle animation delay to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Initialize typing effect for subtitle
    setTimeout(initTypingEffect, 1500);
});

// Add smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
}

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize reveal animation
document.addEventListener('DOMContentLoaded', revealOnScroll);