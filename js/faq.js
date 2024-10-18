// FAQ Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // FAQ Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const faqContainer = document.querySelector('.faq-container');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Filter FAQ items
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // FAQ Search functionality
    const searchInput = document.getElementById('faqSearch');
    const searchBtn = document.getElementById('searchBtn');

    function searchFAQ() {
        const searchTerm = searchInput.value.toLowerCase();
        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    searchBtn.addEventListener('click', searchFAQ);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchFAQ();
        }
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
});