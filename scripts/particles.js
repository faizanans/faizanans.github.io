// particles.js - Animated background particles system

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create 50 floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay for staggered effect
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // Random animation duration for varied speeds
        particle.style.animationDuration = (20 + Math.random() * 10) + 's';
        
        // Random opacity for depth effect
        particle.style.opacity = 0.3 + Math.random() * 0.7;
        
        // Random size variation
        const size = 1 + Math.random() * 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // Recreate particles every 30 seconds for fresh animation
    setInterval(createParticles, 30000);
});

// Resize handler to maintain particles on window resize
window.addEventListener('resize', function() {
    // Debounce resize events
    clearTimeout(window.particleResizeTimeout);
    window.particleResizeTimeout = setTimeout(createParticles, 250);
});