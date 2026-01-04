// CI/CD Pipeline Animation Script

// Version labels that cycle through
const versions = ['v1.0.0', 'v1.0.1', 'v1.1.0', 'v2.0.0', 'v2.1.0', 'v3.0.0'];
let currentVersionIndex = 0;

// Feature names that cycle
const features = ['Login', 'Payment', 'Dashboard', 'API', 'Search', 'Chat', 'Reports', 'Analytics'];
let currentFeatureIndex = 0;

// Pipeline stages
const stages = ['code', 'build', 'test', 'deploy', 'monitor'];
let currentStageIndex = 0;

// Animate pipeline stages
function animatePipelineStages() {
    const stageElements = document.querySelectorAll('.pipeline-stage');
    
    // Remove all active classes
    stageElements.forEach(stage => stage.classList.remove('active'));
    
    // Add active class to current stage
    if (stageElements[currentStageIndex]) {
        stageElements[currentStageIndex].classList.add('active');
    }
    
    // Move to next stage
    currentStageIndex = (currentStageIndex + 1) % stages.length;
}

// Update code box content
function updateCodeBox() {
    const codeBox = document.getElementById('code-box');
    if (!codeBox) return;
    
    // Alternate between version and feature
    const showVersion = Math.random() > 0.5;
    
    if (showVersion) {
        codeBox.textContent = versions[currentVersionIndex];
        currentVersionIndex = (currentVersionIndex + 1) % versions.length;
    } else {
        codeBox.textContent = features[currentFeatureIndex];
        currentFeatureIndex = (currentFeatureIndex + 1) % features.length;
    }
}

// Sync code box animation with stage animation
function syncAnimations() {
    // Update code box content
    updateCodeBox();
    
    // Start stage animation slightly after box appears
    setTimeout(() => {
        animatePipelineStages();
    }, 800);
}

// Initialize CI/CD animation
document.addEventListener('DOMContentLoaded', function() {
    // Initial sync
    syncAnimations();
    
    // Repeat animation every 8 seconds (matching CSS animation duration)
    setInterval(syncAnimations, 8000);
    
    // Cycle through stages faster (every 1.6 seconds = 8s / 5 stages)
    setInterval(() => {
        // Only animate if we're not at the beginning of a full cycle
        if (currentStageIndex !== 0) {
            animatePipelineStages();
        }
    }, 1600);
    
    // Add click handlers to pipeline stages for interaction
    const stageElements = document.querySelectorAll('.pipeline-stage');
    stageElements.forEach((stage, index) => {
        stage.addEventListener('click', () => {
            // Remove all active classes
            stageElements.forEach(s => s.classList.remove('active'));
            // Activate clicked stage
            stage.classList.add('active');
            // Update current index
            currentStageIndex = index;
        });
    });
    
    // Make factory interactive on hover
    const factory = document.querySelector('.cicd-factory');
    if (factory) {
        factory.addEventListener('mouseenter', () => {
            factory.style.borderColor = 'rgba(79, 172, 254, 0.4)';
        });
        
        factory.addEventListener('mouseleave', () => {
            factory.style.borderColor = 'rgba(79, 172, 254, 0.2)';
        });
    }
});