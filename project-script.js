// Sample project data with additional details and YouTube links
const projects = [
    {
        title: "Project 1",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "#",
        imagePath: "mg.webp",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        category: "technology" // Added category
    },
    {
        title: "Project 2",
        description: "Description of project 2.",
        link: "#",
        imagePath: "img.avif",
        details: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category: "other" // Added category
    },
    {
        title: "Project 3",
        description: "Description of project 3.",
        link: "#",
        imagePath: "",
        details: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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

    const image = document.createElement('img');
    image.classList.add('object-cover', 'rounded-t-lg', 'h-96', 'md:h-auto', 'md:w-48');
    image.src = project.imagePath; // You may need to update the image source based on your project data
    image.alt = project.title; // Set alt text for the image
    projectCard.appendChild(image);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('flex', 'flex-col', 'p-4', 'leading-normal');

    const title = document.createElement('h5');
    title.classList.add('mb-2', 'text-2xl', 'font-bold', 'text-white');
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
        openModal(project.title, project.description, project.details);
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






// Function to open the modal with project details
function openModal(title, description, details) {
    const modalContent = `
        <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            ${title}
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5 space-y-4">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            ${description}
                        </p>
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            ${details}
                        </p>
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
    closeModalButton.addEventListener('click', function() {
        closeModal();
    });
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
