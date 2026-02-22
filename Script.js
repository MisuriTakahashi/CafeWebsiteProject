// Get all the sections and nav items on the page
var sections = document.querySelectorAll("section");
var navItems = document.querySelectorAll(".nav-item");

// This function runs every time the user scrolls
window.addEventListener("scroll", function () {

    // Loop through each section
    for (var i = 0; i < sections.length; i++) {

        var section = sections[i];

        // Check if the section is currently visible on screen
        var sectionTop = section.offsetTop;
        var sectionHeight = section.offsetHeight;
        var scrollPosition = window.scrollY + window.innerHeight / 2;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {

            // Remove "active" from all nav items first
            for (var j = 0; j < navItems.length; j++) {
                navItems[j].classList.remove("active");
            }

            // Find the nav item that matches this section and make it active
            var sectionId = section.id; // e.g. "home", "about", "menu", "contact"
            var matchingNav = document.getElementById("nav-" + sectionId);
            if (matchingNav) {
                matchingNav.classList.add("active");
            }

        }
    }

});