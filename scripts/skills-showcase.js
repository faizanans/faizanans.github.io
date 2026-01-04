// skills-showcase.js - Enhanced interactive skill demonstrations

let cacheHits = 0;
let cacheTotal = 0;
let kafkaMessageCount = 0;
let totalOps = 0;

// ===== REDIS CACHE DEMO =====
function addToCache() {
    const container = document.getElementById('redis-items');
    const keys = [
        'user:123', 'session:abc', 'config:prod', 'token:xyz', 
        'data:456', 'cache:789', 'auth:def', 'profile:ghi'
    ];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    
    // Check if key already exists
    const existingItems = Array.from(container.children);
    if (existingItems.some(item => item.textContent === randomKey)) {
        // Flash existing item
        const existingItem = existingItems.find(item => item.textContent === randomKey);
        existingItem.style.background = 'rgba(0, 242, 254, 0.5)';
        existingItem.style.color = '#0a0b0f';
        setTimeout(() => {
            existingItem.style.background = '';
            existingItem.style.color = '';
        }, 500);
        return;
    }
    
    const item = document.createElement('div');
    item.className = 'cache-item';
    item.textContent = randomKey;
    container.appendChild(item);
    
    updateCacheCount();
    incrementOps();
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0) rotate(-10deg)';
        setTimeout(() => {
            item.remove();
            updateCacheCount();
        }, 300);
    }, 8000);
}

function retrieveFromCache() {
    const items = document.querySelectorAll('.cache-item');
    cacheTotal++;
    incrementOps();
    
    if (items.length > 0) {
        cacheHits++;
        // Highlight a random cached item
        const randomItem = items[Math.floor(Math.random() * items.length)];
        randomItem.style.background = 'rgba(0, 242, 254, 0.5)';
        randomItem.style.color = '#0a0b0f';
        randomItem.style.transform = 'scale(1.15) rotate(2deg)';
        randomItem.style.zIndex = '10';
        
        setTimeout(() => {
            randomItem.style.background = '';
            randomItem.style.color = '';
            randomItem.style.transform = '';
            randomItem.style.zIndex = '';
        }, 600);
    } else {
        // Show miss animation
        flashElement(document.querySelector('.cache-layer'), 'rgba(220, 56, 45, 0.2)');
    }
    
    const hitRate = cacheTotal > 0 ? Math.round((cacheHits / cacheTotal) * 100) : 0;
    document.getElementById('redis-hitrate').textContent = hitRate + '%';
}

function clearCache() {
    const container = document.getElementById('redis-items');
    const items = container.querySelectorAll('.cache-item');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0) rotate(-180deg)';
            setTimeout(() => item.remove(), 300);
        }, index * 50);
    });
    
    setTimeout(() => {
        cacheHits = 0;
        cacheTotal = 0;
        document.getElementById('redis-hitrate').textContent = '0%';
        updateCacheCount();
    }, items.length * 50 + 300);
}

function updateCacheCount() {
    const count = document.querySelectorAll('.cache-item').length;
    document.getElementById('cache-count').textContent = `${count} item${count !== 1 ? 's' : ''}`;
}

function incrementOps() {
    totalOps++;
    document.getElementById('redis-ops').textContent = totalOps;
}

function flashElement(element, color) {
    const originalBg = element.style.background;
    element.style.background = color;
    setTimeout(() => {
        element.style.background = originalBg;
    }, 300);
}

// ===== KAFKA MESSAGE STREAMING DEMO =====
function sendKafkaMessage() {
    const container = document.getElementById('kafka-messages');
    const emptyMsg = container.querySelector('.queue-empty');
    if (emptyMsg) emptyMsg.remove();
    
    kafkaMessageCount++;
    
    const message = document.createElement('div');
    message.className = 'kafka-message';
    message.textContent = `Event #${kafkaMessageCount}`;
    message.style.top = `${Math.random() * 60 + 20}%`;
    container.appendChild(message);
    
    // Update metrics
    updateKafkaMetrics();
    
    // Remove message after animation
    setTimeout(() => message.remove(), 2500);
}

function burstKafkaMessages() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => sendKafkaMessage(), i * 150);
    }
}

function updateKafkaMetrics() {
    const throughputEl = document.getElementById('kafka-throughput');
    const totalEl = document.getElementById('kafka-total');
    
    // Simulate throughput spike
    const currentThroughput = parseInt(throughputEl.textContent) || 0;
    throughputEl.textContent = Math.min(currentThroughput + 5, 50);
    
    // Decay throughput over time
    setTimeout(() => {
        const newThroughput = Math.max(parseInt(throughputEl.textContent) - 1, 0);
        throughputEl.textContent = newThroughput;
    }, 1000);
    
    // Update total
    totalEl.textContent = kafkaMessageCount;
}

// ===== DATABASE QUERY DEMO =====
function executeQuery(type) {
    const queryElement = document.getElementById('db-query');
    const resultsElement = document.getElementById('db-results');
    const resultCount = document.getElementById('result-count');
    
    let query = '';
    let results = '';
    let rowCount = 0;
    
    resultCount.textContent = 'Executing...';
    resultsElement.innerHTML = '<div class="results-placeholder">Executing query...</div>';
    
    switch(type) {
        case 'SELECT':
            query = 'SELECT id, name, email, status FROM users WHERE active = true ORDER BY created_at DESC;';
            rowCount = 3;
            results = `
                <table class="result-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>john@example.com</td>
                            <td>verified</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jane Smith</td>
                            <td>jane@example.com</td>
                            <td>active</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Bob Wilson</td>
                            <td>bob@example.com</td>
                            <td>verified</td>
                        </tr>
                    </tbody>
                </table>
                <div class="query-status">
                    ✓ Query OK, 3 rows returned (0.023 sec)
                </div>
            `;
            break;
            
        case 'INSERT':
            query = 'INSERT INTO users (name, email, status) VALUES ("Alice Brown", "alice@example.com", "pending");';
            results = `
                <div class="query-status">
                    ✓ Query OK, 1 row affected (0.015 sec)<br>
                    Last insert ID: 4<br>
                    Rows matched: 1  Changed: 1
                </div>
            `;
            break;
            
        case 'UPDATE':
            query = 'UPDATE users SET status = "verified" WHERE id = 1 AND email IS NOT NULL;';
            results = `
                <div class="query-status">
                    ✓ Query OK, 1 row affected (0.018 sec)<br>
                    Rows matched: 1  Changed: 1  Warnings: 0
                </div>
            `;
            break;
    }
    
    // Animate query typing
    queryElement.textContent = '';
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (charIndex < query.length) {
            queryElement.textContent += query[charIndex];
            charIndex++;
        } else {
            clearInterval(typeInterval);
            // Show results after query completes
            setTimeout(() => {
                resultsElement.innerHTML = results;
                if (rowCount > 0) {
                    resultCount.textContent = `${rowCount} rows`;
                } else {
                    resultCount.textContent = 'Success';
                }
            }, 400);
        }
    }, 20);
}

// ===== SPRING DEPENDENCY INJECTION DEMO =====
let springAnimationInProgress = false;

function showDependencyInjection() {
    if (springAnimationInProgress) return;
    springAnimationInProgress = true;
    
    const beans = document.querySelectorAll('.bean-node');
    const arrows = document.querySelectorAll('.arrow-line');
    const status = document.getElementById('spring-status');
    
    // Reset state
    beans.forEach(bean => {
        bean.style.transform = '';
        bean.style.boxShadow = '';
    });
    
    // Animation sequence
    const sequence = [
        { text: 'Scanning components...', delay: 0 },
        { text: 'Creating @RestController bean...', delay: 800, beanIndex: 0 },
        { text: 'Injecting @Service dependency...', delay: 1600, beanIndex: 1 },
        { text: 'Injecting @Repository dependency...', delay: 2400, beanIndex: 2 },
        { text: 'All dependencies wired successfully ✓', delay: 3200 }
    ];
    
    sequence.forEach(({ text, delay, beanIndex }) => {
        setTimeout(() => {
            status.textContent = text;
            
            if (beanIndex !== undefined) {
                const bean = beans[beanIndex];
                bean.style.transform = 'scale(1.15) translateY(-8px)';
                bean.style.boxShadow = '0 10px 40px rgba(109, 179, 63, 0.6)';
                
                // Pulse the corresponding arrow
                if (beanIndex < arrows.length) {
                    const arrow = arrows[beanIndex];
                    arrow.style.animation = 'none';
                    setTimeout(() => {
                        arrow.style.animation = 'flowPulse 0.5s ease-in-out 3';
                    }, 10);
                }
                
                setTimeout(() => {
                    bean.style.transform = '';
                    bean.style.boxShadow = '';
                }, 600);
            }
        }, delay);
    });
    
    setTimeout(() => {
        springAnimationInProgress = false;
    }, 3500);
}

function resetSpringDemo() {
    const beans = document.querySelectorAll('.bean-node');
    const status = document.getElementById('spring-status');
    
    beans.forEach(bean => {
        bean.style.transform = '';
        bean.style.boxShadow = '';
    });
    
    status.textContent = 'Container initialized';
}

// ===== AUTO-DEMONSTRATIONS =====
function startAutoDemos() {
    // Auto-add cache items periodically
    setInterval(() => {
        const cacheItems = document.querySelectorAll('.cache-item').length;
        if (Math.random() > 0.6 && cacheItems < 6) {
            addToCache();
        }
    }, 4000);
    
    // Auto-send Kafka messages occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            sendKafkaMessage();
        }
    }, 5000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger specific animations
                if (entry.target.classList.contains('language-card')) {
                    const fills = entry.target.querySelectorAll('.proficiency-fill');
                    fills.forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 200);
                    });
                }
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe skill demos
    document.querySelectorAll('.skill-demo').forEach(demo => {
        demo.style.opacity = '0';
        demo.style.transform = 'translateY(50px)';
        demo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(demo);
    });
    
    // Observe language cards
    document.querySelectorAll('.language-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe tech categories
    document.querySelectorAll('.tech-category').forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(category);
    });
}

// ===== ENHANCED INTERACTIONS =====
function addInteractiveEffects() {
    // Add ripple effect to buttons
    document.querySelectorAll('.demo-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .demo-btn {
        position: relative;
        overflow: hidden;
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
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    // Initial cache setup
    setTimeout(() => {
        addToCache();
        setTimeout(() => addToCache(), 500);
        setTimeout(() => addToCache(), 1000);
    }, 500);
    
    // Initial database query
    setTimeout(() => executeQuery('SELECT'), 1500);
    
    // Start auto demonstrations
    setTimeout(startAutoDemos, 3000);
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add interactive effects
    addInteractiveEffects();
    
    // Update cache count initially
    updateCacheCount();
    
    console.log('🚀 Skills showcase initialized!');
});