// homepage.js - Homepage specific functionality with animated skills

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
        dynamicWord.style.opacity = '0';
        dynamicWord.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            dynamicWord.textContent = words[currentIndex];
            currentIndex = (currentIndex + 1) % words.length;
            
            dynamicWord.style.opacity = '1';
            dynamicWord.style.transform = 'translateY(0)';
        }, 500);
    }
    
    setInterval(changeWord, 3000);
}

// Skill card animations - specific to each technology
function initSkillAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const animationContainer = document.createElement('div');
        animationContainer.className = 'skill-animation';
        card.appendChild(animationContainer);
        
        // Add specific animations based on technology
        switch(true) {
            case title.includes('redis'):
                createRedisAnimation(animationContainer);
                break;
            case title.includes('kafka'):
                createKafkaAnimation(animationContainer);
                break;
            case title.includes('mysql') || title.includes('postgres'):
                createDatabaseAnimation(animationContainer);
                break;
            case title.includes('spring'):
                createSpringAnimation(animationContainer);
                break;
            case title.includes('java'):
                createJavaAnimation(animationContainer);
                break;
            case title.includes('python'):
                createPythonAnimation(animationContainer);
                break;
            case title.includes('go'):
                createGoAnimation(animationContainer);
                break;
        }
        
        // Trigger animation on hover
        card.addEventListener('mouseenter', () => {
            animationContainer.classList.add('active');
        });
        
        card.addEventListener('mouseleave', () => {
            animationContainer.classList.remove('active');
        });
    });
}

// Redis - Caching animation
function createRedisAnimation(container) {
    container.innerHTML = `
        <div class="redis-anim">
            <div class="cache-block">
                <div class="data-item">key: user_123</div>
                <div class="data-item">value: cached</div>
            </div>
            <div class="speed-indicator">⚡ Fast Retrieval</div>
        </div>
    `;
}

// Kafka - Message streaming animation
function createKafkaAnimation(container) {
    container.innerHTML = `
        <div class="kafka-anim">
            <div class="producer">Producer</div>
            <div class="message-stream">
                <div class="message">MSG</div>
                <div class="message">MSG</div>
                <div class="message">MSG</div>
            </div>
            <div class="consumer">Consumer</div>
        </div>
    `;
}

// Database - Query animation
function createDatabaseAnimation(container) {
    container.innerHTML = `
        <div class="database-anim">
            <div class="db-icon">🗄️</div>
            <div class="query-line">SELECT * FROM users...</div>
            <div class="result-rows">
                <div class="row">■ ■ ■ ■</div>
                <div class="row">■ ■ ■ ■</div>
                <div class="row">■ ■ ■ ■</div>
            </div>
        </div>
    `;
}

// Spring Framework - Beans/DI animation
function createSpringAnimation(container) {
    container.innerHTML = `
        <div class="spring-anim">
            <div class="spring-container">
                <div class="bean">@Bean</div>
                <div class="arrow">→</div>
                <div class="bean">@Component</div>
                <div class="arrow">→</div>
                <div class="bean">@Service</div>
            </div>
            <div class="di-label">Dependency Injection</div>
        </div>
    `;
}

// Java - Compilation animation
function createJavaAnimation(container) {
    container.innerHTML = `
        <div class="java-anim">
            <div class="code-file">.java</div>
            <div class="compile-arrow">⟹</div>
            <div class="bytecode">.class</div>
            <div class="jvm-label">JVM</div>
        </div>
    `;
}

// Python - Script execution animation
function createPythonAnimation(container) {
    container.innerHTML = `
        <div class="python-anim">
            <div class="code-lines">
                <div class="code-line">import sys</div>
                <div class="code-line">def main():</div>
                <div class="code-line">  print("Hello")</div>
            </div>
            <div class="output">▶ Output: Hello</div>
        </div>
    `;
}

// Go - Goroutines animation
function createGoAnimation(container) {
    container.innerHTML = `
        <div class="go-anim">
            <div class="goroutine">
                <div class="go-label">go routine 1</div>
                <div class="concurrent-bar"></div>
            </div>
            <div class="goroutine">
                <div class="go-label">go routine 2</div>
                <div class="concurrent-bar"></div>
            </div>
            <div class="parallel-label">⚡ Concurrent</div>
        </div>
    `;
}

// Skill bar animation on scroll
function initSkillBarsAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                const skillBar = entry.target.querySelector('.skill-bar');
                if (skillBar) {
                    const level = skillBar.getAttribute('data-level');
                    skillBar.style.setProperty('--level', level + '%');
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    skillCards.forEach(card => observer.observe(card));
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
        const rate = scrolled * -0.3;
        
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
    
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Floating badges animation
function initFloatingBadges() {
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.2}s`;
    });
}

// Initialize all homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    startDynamicText();
    initSkillAnimations();
    initSkillBarsAnimation();
    initAboutCardsAnimation();
    initParallaxEffect();
    initFloatingBadges();
    
    // Hero content fade in
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    setTimeout(initTypingEffect, 1500);
});

// Smooth scroll for CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});