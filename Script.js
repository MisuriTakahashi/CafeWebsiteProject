// Section 1
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-item");

// Section 2
window.addEventListener("scroll", function () {

    // Section 3
    for (let i = 0; i < sections.length; i++) {

        const section = sections[i];

        // Section 4 
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {

            // Section 5 
            for (let j = 0; j < navItems.length; j++) {
                navItems[j].classList.remove("active");
            }

            // Section 6 
            const sectionId = section.id; // e.g. "home", "about", "menu", "contact"
            const matchingNav = document.getElementById("nav-" + sectionId);
            if (matchingNav) {
                matchingNav.classList.add("active");
            }

        }
    }

});
// Section 1 - Get all the sections and nav items on the page
// Section 2 - This function runs every time the user scrolls
// Section 3 - Loop through each section
// Section 4 - Check if the section is currently visible on screen
// Section 5 - Remove "active" from all nav items first
// Section 6 - Find the nav item that matches this section and make it active

// Login Session Handling
document.addEventListener("DOMContentLoaded", function() {
    updateAuthUI();
});

function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authContainer = document.getElementById('nav-auth-container');
    const authLink = document.getElementById('auth-link');

    if (currentUser && authContainer) {
        // User is logged in
        authContainer.innerHTML = `
            <a href="#" id="logout-btn" style="color: #ff6b6b;">Logout</a>
        `;

        document.getElementById('logout-btn').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            alert('Logged out successfully!');
            location.reload();
        });
    } else if (authLink) {
        // User is not logged in
        authLink.href = "Login.html";
        authLink.textContent = "Login";
    }
}