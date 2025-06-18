// projects.js - Projects page functionality

// Sample project data
const projects = [
    {
        title: "QuickMsg: Real-Time Messaging Platform",
        description: "QuickMsg is a cutting-edge platform designed to facilitate instant communication across various channels, leveraging the power of Spring Boot 3 and React.js to offer a seamless chatting experience. This comprehensive solution consists of a Spring Boot 3 backend application for efficient message handling and a React.js frontend application for a user-friendly interface.",
        tileIcon: ["fa-solid", "fa-message", "text-teal-400"],
        technologies: [
            { icon: "<i class='fa-solid fa-arrows-left-right-to-line mr-1'></i>", name: "WebSocket" },
            { icon: "<i class='fa-brands fa-java mr-1'></i>", name: "Spring Boot 3" },
            { icon: "<i class='fa-brands fa-react mr-1'></i>", name: "React.js" },
            { icon: "<i class='fa-brands fa-java mr-1'></i>", name: "Lombok" }
        ],
        features: [
            "Real-Time Communication: Utilizes WebSocket for live messaging, ensuring instant data transmission and reception",
            "Simplified Socket Connection Management: Manages multiple socket connections seamlessly",
            "Code Simplification with Lombok: Reduces boilerplate code for a cleaner and more maintainable codebase",
            "Scalable Architecture: Designed for easy expansion as the application grows",
            "Real-time messaging for instant communication",
            "Options to create and join multiple chat channels"
        ],
        videoPath: "projects/quickmsg/video/demo.mov",
        imagePath: "",
        category: "technology"
    }
    // Add more projects here as needed
];

// Filter projects based on category
function filterProjects(category) {
    const projectContainer = document.getElementById('project-container');
    if (!projectContainer) return;
    
    // Clear existing projects
    projectContainer.innerHTML = '';

    // Update active filter button
    document.querySelectorAll('.filter-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[data-category="${category}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Filter and display projects
    const filteredProjects = category === 'all' ? projects : projects.filter(p => p.category === category);
    
    filteredProjects.forEach((project, index) => {
        setTimeout(() => {
            addProjectCard(project);
        }, index * 100); // Stagger the animation
    });
    
    // Show no projects message if empty
    if (filteredProjects.length === 0) {
        projectContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; color: #b0b0b0; padding: 2rem;">
                <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No projects found in this category.</p>
            </div>
        `;
    }
}

// Add project card to the grid
function addProjectCard(project) {
    const projectContainer = document.getElementById('project-container');
    if (!projectContainer) return;

    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    // Initially hidden for animation
    projectCard.style.opacity = '0';
    projectCard.style.transform = 'translateY(50px)';

    const iconClasses = project.tileIcon.join(' ');
    const truncatedDescription = truncateText(project.description, 150);

    projectCard.innerHTML = `
        <i class="${iconClasses} project-icon"></i>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${truncatedDescription}</p>
        <button class="read-more-btn" onclick="openModal(${JSON.stringify(project).replace(/"/g, '&quot;')})">
            Read More <i class="fa-solid fa-arrow-right" style="margin-left: 0.5rem;"></i>
        </button>
    `;

    projectContainer.appendChild(projectCard);
    
    // Animate in
    setTimeout(() => {
        projectCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectCard.style.opacity = '1';
        projectCard.style.transform = 'translateY(0)';
    }, 50);
}

// Truncate text to specified length
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Open project details modal
function openModal(project) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'project-modal';

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${project.title}</h3>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p style="color: #d0d0d0; line-height: 1.6; margin-bottom: 2rem;">${project.description}</p>
                
                <div class="tech-tags">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag">${tech.icon}${tech.name}</span>`
                    ).join('')}
                </div>
                
                <div class="features-list">
                    <h4>Key Features</h4>
                    ${project.features.map(feature => 
                        `<div class="feature-item">${feature}</div>`
                    ).join('')}
                </div>
                
                ${project.videoPath ? `
                    <div style="margin-top: 2rem;">
                        <h4 style="color: #4facfe; margin-bottom: 1rem;">Demo Video</h4>
                        <video class="project-video" autoplay loop muted playsinline controls>
                            <source src="${project.videoPath}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ` : ''}
                
                ${project.imagePath ? `
                    <div style="margin-top: 2rem;">
                        <img src="${project.imagePath}" alt="${project.title}" style="width: 100%; border-radius: 15px;">
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate modal in
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

// Close project details modal
function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Initialize projects page
function initProjectsPage() {
    // Load all projects by default
    filterProjects('all');
    
    // Add intersection observer for project cards animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe future project cards
    const projectContainer = document.getElementById('project-container');
    if (projectContainer) {
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList.contains('project-card')) {
                        observer.observe(node);
                    }
                });
            });
        });
        
        mutationObserver.observe(projectContainer, { childList: true });
    }
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Filter shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                filterProjects('all');
                break;
            case '2':
                e.preventDefault();
                filterProjects('technology');
                break;
        }
    }
});

// Search functionality (if you want to add it later)
function searchProjects(query) {
    const filteredProjects = projects.filter(project => 
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.technologies.some(tech => tech.name.toLowerCase().includes(query.toLowerCase()))
    );
    
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = '';
    
    filteredProjects.forEach((project, index) => {
        setTimeout(() => {
            addProjectCard(project);
        }, index * 100);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProjectsPage();
    
    // Add smooth fade-in for the projects hero section
    const projectsHero = document.querySelector('.projects-hero');
    if (projectsHero) {
        projectsHero.style.opacity = '0';
        projectsHero.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            projectsHero.style.transition = 'opacity 1s ease, transform 1s ease';
            projectsHero.style.opacity = '1';
            projectsHero.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Export functions for external use
window.filterProjects = filterProjects;
window.openModal = openModal;
window.closeModal = closeModal;