document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("nav-toggle");
    const navContent = document.getElementById("nav-content");

    // Add event listener to toggle the visibility of the navigation menu
    navToggle.addEventListener("click", function () {
        navContent.classList.toggle("hidden");
    });
});


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
