function initializeHeader() {
    var menuToggle = document.getElementById('personalSiteMenuToggle');
    var nav = document.getElementById('personalSiteNav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            var isClickInside = nav.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Highlight current page in navigation
        var currentPage = window.location.pathname.split("/").pop();
        var navLinks = document.querySelectorAll('#personalSiteNav a');
        navLinks.forEach(function(link) {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Check if the header has been loaded, if not, wait for it
if (document.getElementById('personalSiteHeader')) {
    initializeHeader();
} else {
    document.addEventListener('DOMContentLoaded', initializeHeader);
}