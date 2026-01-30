const navItems = document.querySelectorAll('.nav-item');

// Function to set active class based on current hash URL
function setActiveWindow() {
    const currentHash = window.location.hash || '#home';
    
    navItems.forEach(item => {
        // Remove active from all first (safety) or handle in else
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentHash) {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        }
    });
}

navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

window.addEventListener('load', setActiveWindow);
window.addEventListener('hashchange', setActiveWindow);