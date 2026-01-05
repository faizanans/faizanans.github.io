// skills-showcase.js - Minimalist interactive skill demonstrations

// State management
let state = {
    redis: {
        hits: 0,
        total: 0,
        operations: 0,
        items: []
    },
    kafka: {
        messageCount: 0,
        throughput: 0
    }
};

// ===== REDIS CACHE DEMO =====
const CACHE_KEYS = [
    'user:123', 'session:abc', 'config:prod', 'token:xyz', 
    'data:456', 'cache:789', 'auth:def', 'profile:ghi',
    'order:321', 'payment:999'
];

function addToCache() {
    const container = document.getElementById('redis-items');
    if (!container) return;
    
    const randomKey = CACHE_KEYS[Math.floor(Math.random() * CACHE_KEYS.length)];
    
    // Check if key already exists
    if (state.redis.items.includes(randomKey)) {
        highlightExistingItem(randomKey);
        return;
    }
    
    // Add to state
    state.redis.items.push(randomKey);
    
    // Create and add item
    const item = document.createElement('div');
    item.className = 'cache-item';
    item.textContent = randomKey;
    item.dataset.key = randomKey;
    container.appendChild(item);
    
    updateCacheCount();
    incrementOps();
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        removeFromCache(randomKey);
    }, 10000);
}

function highlightExistingItem(key) {
    const item = document.querySelector(`[data-key="${key}"]`);
    if (item) {
        item.style.background = 'linear-gradient(135deg, rgba(0, 242, 254, 0.4), rgba(79, 172, 254, 0.3))';
        item.style.transform = 'scale(1.1)';
        setTimeout(() => {
            item.style.background = '';
            item.style.transform = '';
        }, 500);
    }
}

function removeFromCache(key) {
    const item = document.querySelector(`[data-key="${key}"]`);
    if (item) {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.5) translateY(-20px)';
        setTimeout(() => {
            item.remove();
            state.redis.items = state.redis.items.filter(k => k !== key);
            updateCacheCount();
        }, 400);
    }
}

function retrieveFromCache() {
    state.redis.total++;
    incrementOps();
    
    if (state.redis.items.length > 0) {
        state.redis.hits++;
        const randomKey = state.redis.items[Math.floor(Math.random() * state.redis.items.length)];
        highlightExistingItem(randomKey);
    }
    
    updateHitRate();
}

function clearCache() {
    const container = document.getElementById('redis-items');
    if (!container) return;
    
    const items = container.querySelectorAll('.cache-item');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0) rotate(180deg)';
        }, index * 50);
    });
    
    setTimeout(() => {
        container.innerHTML = '';
        state.redis.items = [];
        state.redis.hits = 0;
        state.redis.total = 0;
        updateCacheCount();
        updateHitRate();
    }, items.length * 50 + 400);
}

function updateCacheCount() {
    const countElement = document.getElementById('cache-count');
    if (countElement) {
        const count = state.redis.items.length;
        countElement.textContent = `${count} item${count !== 1 ? 's' : ''}`;
    }
}

function updateHitRate() {
    const hitRateElement = document.getElementById('redis-hitrate');
    if (hitRateElement) {
        const hitRate = state.redis.total > 0 
            ? Math.round((state.redis.hits / state.redis.total) * 100) 
            : 0;
        hitRateElement.textContent = hitRate + '%';
    }
}

function incrementOps() {
    state.redis.operations++;
    const opsElement = document.getElementById('redis-ops');
    if (opsElement) {
        opsElement.textContent = state.redis.operations;
    }
}

// ===== KAFKA MESSAGE STREAMING DEMO =====
function sendKafkaMessage() {
    const container = document.getElementById('kafka-stream');
    if (!container) return;
    
    state.kafka.messageCount++;
    
    const message = document.createElement('div');
    message.className = 'kafka-message';
    message.textContent = `Event #${state.kafka.messageCount}`;
    message.style.top = '50%';
    message.style.transform = 'translateY(-50%)';
    container.appendChild(message);
    
    updateKafkaMetrics();
    
    // Remove message after animation completes
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function burstKafkaMessages() {
    const burstCount = 5;
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            sendKafkaMessage();
        }, i * 200);
    }
}

function updateKafkaMetrics() {
    const throughputEl = document.getElementById('kafka-throughput');
    const totalEl = document.getElementById('kafka-total');
    
    if (throughputEl) {
        // Increase throughput
        state.kafka.throughput = Math.min(state.kafka.throughput + 5, 50);
        throughputEl.textContent = state.kafka.throughput;
        
        // Decay throughput
        setTimeout(() => {
            state.kafka.throughput = Math.max(state.kafka.throughput - 1, 0);
            if (throughputEl) {
                throughputEl.textContent = state.kafka.throughput;
            }
        }, 1500);
    }
    
    if (totalEl) {
        totalEl.textContent = state.kafka.messageCount;
    }
}

// ===== DATABASE QUERY DEMO =====
const QUERIES = {
    SELECT: {
        query: 'SELECT id, name, email, status FROM users WHERE active = true ORDER BY created_at DESC;',
        results: `
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
        `,
        status: '3 rows'
    },
    INSERT: {
        query: 'INSERT INTO users (name, email, status) VALUES ("Alice Brown", "alice@example.com", "pending");',
        results: `
            <div class="query-status">
                ✓ Query OK, 1 row affected (0.015 sec)<br>
                Last insert ID: 4<br>
                Rows matched: 1  Changed: 1
            </div>
        `,
        status: 'Success'
    },
    UPDATE: {
        query: 'UPDATE users SET status = "verified" WHERE id = 1 AND email IS NOT NULL;',
        results: `
            <div class="query-status">
                ✓ Query OK, 1 row affected (0.018 sec)<br>
                Rows matched: 1  Changed: 1  Warnings: 0
            </div>
        `,
        status: 'Success'
    }
};

function executeQuery(type) {
    const queryElement = document.getElementById('db-query');
    const resultsElement = document.getElementById('db-results');
    const statusElement = document.getElementById('result-status');
    
    if (!queryElement || !resultsElement) return;
    
    const queryData = QUERIES[type];
    if (!queryData) return;
    
    // Show executing state
    if (statusElement) {
        statusElement.textContent = 'Executing...';
    }
    resultsElement.innerHTML = '<div class="results-placeholder">Executing query...</div>';
    
    // Animate query typing
    typeQuery(queryElement, queryData.query, () => {
        // Show results after query completes
        setTimeout(() => {
            resultsElement.innerHTML = queryData.results;
            if (statusElement) {
                statusElement.textContent = queryData.status;
            }
        }, 500);
    });
}

function typeQuery(element, text, callback) {
    element.textContent = '';
    let index = 0;
    
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 15);
}

// ===== SPRING DEPENDENCY INJECTION DEMO =====
let springAnimationActive = false;

function showDependencyInjection() {
    if (springAnimationActive) return;
    springAnimationActive = true;
    
    const beans = document.querySelectorAll('.bean-box');
    const status = document.getElementById('spring-status');
    
    if (!status) {
        springAnimationActive = false;
        return;
    }
    
    const sequence = [
        { text: '🔍 Scanning components...', delay: 0 },
        { text: '📦 Creating @RestController bean...', delay: 800, beanIndex: 0 },
        { text: '💉 Injecting @Service dependency...', delay: 1600, beanIndex: 1 },
        { text: '💉 Injecting @Repository dependency...', delay: 2400, beanIndex: 2 },
        { text: '✅ All dependencies wired successfully', delay: 3200 }
    ];
    
    sequence.forEach(({ text, delay, beanIndex }) => {
        setTimeout(() => {
            status.textContent = text;
            
            if (beanIndex !== undefined && beans[beanIndex]) {
                const bean = beans[beanIndex];
                bean.style.transform = 'translateY(-8px) scale(1.08)';
                bean.style.boxShadow = '0 12px 30px rgba(109, 179, 63, 0.5)';
                bean.style.borderColor = 'rgba(109, 179, 63, 0.7)';
                
                setTimeout(() => {
                    bean.style.transform = '';
                    bean.style.boxShadow = '';
                    bean.style.borderColor = '';
                }, 600);
            }
        }, delay);
    });
    
    setTimeout(() => {
        springAnimationActive = false;
    }, 3500);
}

function resetSpringDemo() {
    const beans = document.querySelectorAll('.bean-box');
    const status = document.getElementById('spring-status');
    
    beans.forEach(bean => {
        bean.style.transform = '';
        bean.style.boxShadow = '';
        bean.style.borderColor = '';
    });
    
    if (status) {
        status.textContent = '🌱 Container initialized';
    }
}

// ===== AUTO-DEMONSTRATIONS =====
function startAutoDemos() {
    // Auto-add cache items
    setInterval(() => {
        if (Math.random() > 0.6 && state.redis.items.length < 8) {
            addToCache();
        }
    }, 5000);
    
    // Auto-send Kafka messages
    setInterval(() => {
        if (Math.random() > 0.7) {
            sendKafkaMessage();
        }
    }, 6000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.skill-demo, .language-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// ===== RIPPLE EFFECT =====
function addRippleEffect() {
    document.querySelectorAll('.demo-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation to document
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Skills showcase initialized');
    
    // Initial setup - add a few cache items
    setTimeout(() => {
        addToCache();
        setTimeout(() => addToCache(), 500);
        setTimeout(() => addToCache(), 1000);
    }, 500);
    
    // Initial database query
    setTimeout(() => {
        const queryElement = document.getElementById('db-query');
        if (queryElement) {
            executeQuery('SELECT');
        }
    }, 1500);
    
    // Start auto demonstrations after initial setup
    setTimeout(startAutoDemos, 3000);
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add ripple effects to buttons
    addRippleEffect();
    
    // Initialize Spring demo status
    const springStatus = document.getElementById('spring-status');
    if (springStatus) {
        springStatus.textContent = '🌱 Container initialized';
    }
});