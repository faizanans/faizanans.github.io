// JavaScript for toggling the mobile navigation menu
document.getElementById('nav-toggle').onclick = function () {
    document.getElementById("nav-content").classList.toggle("hidden");
}



// Sample project data
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

// Function to dynamically populate project cards
function populateProjects() {
  const projectContainer = document.getElementById('project-container');
  projects.forEach(project => {
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
  });
}

// Function to truncate text if it exceeds a certain length
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
}


// Call the function to populate projects when the page loads
window.onload = populateProjects;


document.addEventListener("DOMContentLoaded", function() {
  const words = ["Programmer", "Software Architect","Application Developer","Coder", "Builder", "Technologist","Coding Scripter",];
  let i = 0;
  const dynamicWord = document.querySelector('.dynamic-word');
  
  setInterval(() => {
      // Fade out, change the word, then fade in
      dynamicWord.style.opacity = 0;
      setTimeout(() => {
          dynamicWord.textContent = words[i];
          dynamicWord.style.opacity = 1;
          i = (i + 1) % words.length;
      }, 500); // Half the interval time to allow for fade out and in
  }, 1000); // Change word every second
});
