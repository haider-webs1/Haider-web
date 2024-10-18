// Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchForm = document.querySelector('.search-widget form');
    const searchInput = document.querySelector('.search-widget input[type="text"]');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        // Implement search logic here (e.g., filter posts, redirect to search results page)
        console.log('Searching for:', searchTerm);
        // For demonstration, alert the search term
        alert('Searching for: ' + searchTerm);
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value;
        // Implement newsletter subscription logic here (e.g., send to server, show confirmation)
        console.log('Subscribing email:', email);
        // For demonstration, show a thank you message
        alert('Thank you for subscribing with: ' + email);
        emailInput.value = ''; // Clear the input
    });

    // Lazy loading for blog post images
    const blogImages = document.querySelectorAll('.blog-post img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                img.setAttribute('src', src);
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    blogImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Animate blog posts on scroll
    const blogPosts = document.querySelectorAll('.blog-post');
    const postObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    blogPosts.forEach(post => {
        postObserver.observe(post);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Toggle category dropdown on mobile
    const categoriesWidget = document.querySelector('.categories-widget');
    const categoriesList = categoriesWidget.querySelector('ul');

    categoriesWidget.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            categoriesList.style.display = categoriesList.style.display === 'none' ? 'block' : 'none';
        }
    });

    // Resize handler for categories
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            categoriesList.style.display = 'block';
        }
    });
});