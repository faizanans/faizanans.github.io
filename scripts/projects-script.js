document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("nav-toggle");
    const navContent = document.getElementById("nav-content");

    // Add event listener to toggle the visibility of the navigation menu
    navToggle.addEventListener("click", function () {
        navContent.classList.toggle("hidden");
    });
});

// Sample project data with additional details and YouTube links
const projects = [
    {
        title: "QuickMsg: Real-Time Messaging Platform",
        description: "QuickMsg is a cutting-edge platform designed to facilitate instant communication across various channels, leveraging the power of Spring Boot 3 and React.js to offer a seamless chatting experience. This comprehensive solution consists of a Spring Boot 3 backend application for efficient message handling and a React.js frontend application for a user-friendly interface.",
        tileIcon:["fa-solid","fa-message","text-teal-400"],
        technologies:[
            { icon: "<i class='fa-solid fa-arrows-left-right-to-line mr-1'></i>", name: "WebSocket" },
            { icon: "<i class='fa-brands fa-java  mr-1'></i>", name: "Spring Boot 3" },
            { icon: "<i class='fa-brands fa-react mr-1'></i>", name: "React.js" },
            { icon: "<i class='fa-brands fa-java  mr-1'></i>", name: "Lombok" }
        ],
        features:  [
            "Real-Time Communication: Utilizes WebSocket for live messaging, ensuring instant data transmission and reception",
            "Simplified Socket Connection Management: Manages multiple socket connections seamlessly",
            "Code Simplification with Lombok: Reduces boilerplate code for a cleaner and more maintainable codebase",
            "Scalable Architecture: Designed for easy expansion as the application grows",
            "Real-time messaging for instant communication",
            "Options to create and join multiple chat channels",
        ],
        videoPath: "projects/quickmsg/video/demo.mov",
        imagePath: "",
        category: "technology" // Added category
    }
    
];

// Function to filter projects based on category
function filterProjects(category) {
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = ''; // Clear existing project cards

    // Remove active class from all filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });

    if (category === 'all') {
        // If 'All' category is selected, populate all projects
        projects.forEach(project => {
            addProjectCard(project);
        });
    } else {
        // Filter projects based on category
        const filteredProjects = projects.filter(project => project.category === category);
        filteredProjects.forEach(project => {
            addProjectCard(project);
        });
    }

    // Add active class to the clicked filter button
    const clickedButton = document.querySelector(`.filter-button[data-category="${category}"]`);
    clickedButton.classList.add('active');
}

function addProjectCard(project) {
    const projectContainer = document.getElementById('project-container');

    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card', 'flex', 'flex-col', 'items-center','shadow', 'md:flex-row', 'md:max-w-xl', 'rounded-lg');

    const icon = document.createElement('i');
    icon.classList.add('text-8xl');
    for (let i = 0; i < project.tileIcon.length; i++) {
        icon.classList.add(project.tileIcon[i]);
    }
    icon.alt = project.title; // Set alt text for the image
    projectCard.appendChild(icon);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('flex', 'flex-col', 'p-4', 'leading-normal');

    const title = document.createElement('h5');
    title.classList.add('mb-2', 'text-l', 'font-bold', 'text-white');
    title.textContent = project.title;
    contentWrapper.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('mb-3', 'text-base', 'text-gray-300');
    description.textContent = truncateText(project.description, 35); // Limiting to 100 characters
    contentWrapper.appendChild(description);

    const readMoreButton = document.createElement('button');
    readMoreButton.classList.add('text-white', 'hover:text-teal-400', 'focus:outline-none');
    readMoreButton.textContent = 'Read more';
    readMoreButton.addEventListener('click', function() {
        openModal(project.title, project.description, project.technologies,project.features,project.videoPath);
    });
    contentWrapper.appendChild(readMoreButton);

    projectCard.appendChild(contentWrapper);

    projectContainer.appendChild(projectCard);
}

// Function to truncate text if it exceeds a certain length
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
}

function openModal(title, description, technologies, features, videoPath) {
    const modalContent = `
    <div id="static-modal" class="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] max-w-11xl max-h-11xl relative">
            <!-- Modal content -->
            <div class="relative z-10 flex flex-col h-full">
                <!-- Modal header -->
                <div class="flex items-center justify-between px-6 py-4 border-b bg-gray-900 bg-opacity-75 rounded-t-lg">
                    <h3 class="text-lg font-semibold text-white">${title}</h3>
                    <button type="button" class="text-gray-300 hover:text-white focus:outline-none" data-modal-hide="static-modal">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 text-gray-800 overflow-y-auto">
                    <p class="text-base leading-relaxed mb-6">
                        ${description}
                    </p>

                    <!-- Technologies used -->
                    <div class="flex flex-wrap mb-6">
                        ${technologies.map(tech => 
                            `<span class="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${tech.icon}${tech.name}</span>`
                            ).join('')}
                    </div>
                    <!-- Features -->
                    <div class="flex flex-wrap mb-6">
                        <h4 class="text-lg font-semibold text-gray-900 mb-2">Features</h4>
                        <ul class="list-disc pl-6">
                            ${features.map(feature => 
                                `<div><i class="fas fa-star text-green-500 mr-1"></i>${feature}</div>`
                                ).join('')}
                        </ul>
                    </div>
                    <!-- Loop video -->
                    <div class="flex justify-center">
                        <video class="object-cover w-full h-full rounded-lg z-0" autoplay loop muted playsinline>
                            <source src="${videoPath}" type="video/mp4">
                        </video>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    // Append modal content to body
    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Show the modal
    const modal = document.getElementById('static-modal');
    modal.classList.remove('hidden');

    // Add event listener to close the modal
    const closeModalButton = modal.querySelector('[data-modal-hide="static-modal"]');
    closeModalButton.addEventListener('click', closeModal);
}

function closeModal() {
    const modal = document.getElementById('static-modal');
    modal.classList.add('hidden');
    modal.remove();
}


// Function to close the modal
function closeModal() {
    const modal = document.getElementById('static-modal');
    modal.classList.add('hidden');
    // Remove the modal from the DOM
    modal.remove();
}


// Function to close the modal
function closeModal() {
    const modal = document.getElementById('static-modal');
    modal.classList.add('hidden');

    // Remove the modal from the DOM
    modal.parentNode.removeChild(modal);
}


// Call the function to populate all projects when the page loads
window.onload = function() {
    filterProjects('all');
};
