// Skills Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animate skill proficiency bars
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const value = progressBar.getAttribute('data-value');
                progressBar.style.width = `${value}%`;
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        observer.observe(bar);
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

    // Add hover effect to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'scale(1.05)';
            category.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        category.addEventListener('mouseleave', () => {
            category.style.transform = 'scale(1)';
            category.style.boxShadow = 'none';
        });
    });

    // Animate skill items on scroll
    const skillItems = document.querySelectorAll('.skill-category, .proficiency-item, .project-item');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(item);
    });

    // Toggle project details
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        const description = item.querySelector('p');
        const button = item.querySelector('.btn');
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (description.style.maxHeight) {
                description.style.maxHeight = null;
                button.textContent = 'View Details';
            } else {
                description.style.maxHeight = description.scrollHeight + 'px';
                button.textContent = 'Hide Details';
            }
        });
    });
});