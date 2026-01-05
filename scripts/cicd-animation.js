// Git Branching Animation Script

// Commit messages for different branches
const mainCommits = [
    'feat: add API endpoint',
    'docs: update README',
    'chore: bump deps',
    'release: v2.0.0',
    'fix: type error',
    'perf: optimize query'
];

const featureCommits = [
    'feat: login UI',
    'feat: auth logic',
    'test: login tests',
    'style: format code',
    'refactor: clean up'
];

const hotfixCommits = [
    'fix: XSS vulnerability',
    'test: security tests',
    'docs: security notes',
    'fix: SQL injection'
];

let currentMainIndex = 0;
let currentFeatureIndex = 0;
let currentHotfixIndex = 0;

// Update commit messages
function updateCommitMessages() {
    // Update main branch commits
    const mainCommitElements = document.querySelectorAll('.commit-main:not(.commit-traveling)');
    mainCommitElements.forEach((commit, index) => {
        const messageIndex = (currentMainIndex + index) % mainCommits.length;
        commit.setAttribute('data-message', mainCommits[messageIndex]);
    });
    currentMainIndex = (currentMainIndex + 1) % mainCommits.length;
    
    // Update feature branch commits
    const featureCommitElements = document.querySelectorAll('.commit-feature');
    featureCommitElements.forEach((commit, index) => {
        const messageIndex = (currentFeatureIndex + index) % featureCommits.length;
        commit.setAttribute('data-message', featureCommits[messageIndex]);
    });
    currentFeatureIndex = (currentFeatureIndex + 1) % featureCommits.length;
    
    // Update hotfix branch commits
    const hotfixCommitElements = document.querySelectorAll('.commit-hotfix');
    hotfixCommitElements.forEach((commit, index) => {
        const messageIndex = (currentHotfixIndex + index) % hotfixCommits.length;
        commit.setAttribute('data-message', hotfixCommits[messageIndex]);
    });
    currentHotfixIndex = (currentHotfixIndex + 1) % hotfixCommits.length;
}

// Animate merge points
function animateMergePoints() {
    const mergePoints = document.querySelectorAll('.merge-point');
    mergePoints.forEach((point, index) => {
        setTimeout(() => {
            point.style.animation = 'none';
            setTimeout(() => {
                point.style.animation = 'mergePulse 3s ease-in-out infinite';
            }, 10);
        }, index * 1000);
    });
}

// Update Git stats with random variations
function updateGitStats() {
    const stats = [
        { selector: '.stat-item:nth-child(1) .stat-value', base: 127, variance: 5 },
        { selector: '.stat-item:nth-child(2) .stat-value', base: 12, variance: 2 },
        { selector: '.stat-item:nth-child(3) .stat-value', base: 24, variance: 3 }
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(stat.selector);
        if (element) {
            const randomValue = stat.base + Math.floor(Math.random() * stat.variance);
            
            // Animate the number change
            const currentValue = parseInt(element.textContent);
            const diff = randomValue - currentValue;
            
            if (diff !== 0) {
                let step = 0;
                const steps = 10;
                const interval = setInterval(() => {
                    step++;
                    const newValue = currentValue + Math.floor((diff * step) / steps);
                    element.textContent = newValue;
                    
                    if (step >= steps) {
                        clearInterval(interval);
                        element.textContent = randomValue;
                    }
                }, 50);
            }
        }
    });
}

// Animate branch connectors
function pulseConnectors() {
    const connectors = document.querySelectorAll('.branch-connector');
    connectors.forEach((connector, index) => {
        setTimeout(() => {
            connector.style.transition = 'opacity 0.5s ease';
            connector.style.opacity = '1';
            setTimeout(() => {
                connector.style.opacity = '0.6';
            }, 500);
        }, index * 300);
    });
}

// Add interactive hover effects
function addInteractiveEffects() {
    const commits = document.querySelectorAll('.commit');
    
    commits.forEach(commit => {
        commit.addEventListener('click', function() {
            // Create ripple effect
            this.style.transform = 'translate(-50%, -50%) scale(1.3)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
        });
    });
    
    // Make branches interactive
    const branches = document.querySelectorAll('.branch-line');
    branches.forEach(branch => {
        branch.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.5)';
        });
        
        branch.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Interactive merge points
    const mergePoints = document.querySelectorAll('.merge-point');
    mergePoints.forEach(point => {
        point.addEventListener('click', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.4)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 400);
        });
    });
}

// Simulate branch activity
function simulateBranchActivity() {
    const branches = document.querySelectorAll('.branch-line');
    const randomBranch = branches[Math.floor(Math.random() * branches.length)];
    
    // Pulse effect
    randomBranch.style.transition = 'all 0.5s ease';
    randomBranch.style.filter = 'brightness(1.8) drop-shadow(0 0 10px currentColor)';
    
    setTimeout(() => {
        randomBranch.style.filter = 'brightness(1)';
    }, 500);
}

// Initialize Git visualization
document.addEventListener('DOMContentLoaded', function() {
    // Initial setup
    updateCommitMessages();
    addInteractiveEffects();
    
    // Update commit messages periodically
    setInterval(updateCommitMessages, 8000);
    
    // Animate merge points
    setInterval(animateMergePoints, 6000);
    
    // Update stats occasionally
    setInterval(updateGitStats, 10000);
    
    // Pulse connectors
    setInterval(pulseConnectors, 5000);
    
    // Random branch activity
    setInterval(simulateBranchActivity, 4000);
    
    // Add hover effect to visualization container
    const gitViz = document.querySelector('.git-visualization');
    if (gitViz) {
        gitViz.addEventListener('mouseenter', () => {
            gitViz.style.borderColor = 'rgba(79, 172, 254, 0.4)';
        });
        
        gitViz.addEventListener('mouseleave', () => {
            gitViz.style.borderColor = 'rgba(79, 172, 254, 0.2)';
        });
    }
    
    // Initialize branch info tags with animation
    const branchTags = document.querySelectorAll('.branch-tag');
    branchTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            tag.style.transition = 'all 0.5s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
    
    // Animate branch labels on load
    const branchLabels = document.querySelectorAll('.branch-label');
    branchLabels.forEach((label, index) => {
        label.style.opacity = '0';
        label.style.transform = 'scale(0.8)';
        setTimeout(() => {
            label.style.transition = 'all 0.5s ease';
            label.style.opacity = '1';
            label.style.transform = 'scale(1)';
        }, 800 + (index * 300));
    });
    
    console.log('🌿 Git visualization initialized!');
});