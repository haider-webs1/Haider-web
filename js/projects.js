// Projects Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Modal functionality
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-tech');
    const modalLink = document.getElementById('modal-link');
    const closeModal = document.querySelector('.close-modal');

    // Project details (you can expand this with more projects)
    const projectDetails = {
        'E-commerce Platform Redesign': {
            description: 'A complete overhaul of an existing e-commerce platform, focusing on improving user experience, mobile responsiveness, and conversion rates. This project showcases my ability to handle large-scale web applications and implement modern design principles.',
            image: 'img/featured-project-large.jpg',
            tech: ['React.js', 'Node.js', 'MongoDB', 'Redux', 'Stripe API'],
            link: '#'
        },
        'Dashboard UI Design': {
            description: 'A modern and intuitive dashboard design for a data analytics platform. The design focuses on data visualization and user-friendly navigation.',
            image: 'img/project2-large.jpg',
            tech: ['Figma', 'Adobe Illustrator', 'Sketch'],
            link: '#'
        },
        'Fitness Tracking App': {
            description: 'A mobile app designed and developed to help users track their fitness goals. Features include workout logging, progress tracking, and social sharing.',
            image: 'img/project3-large.jpg',
            tech: ['React Native', 'Firebase', 'Google Fit API'],
            link: '#'
        },
        // Add more project details as needed
    };

    // Open modal with project details
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectTitle = e.target.closest('.project-item').querySelector('h3').textContent;
            const project = projectDetails[projectTitle];
            
            if (project) {
                modalTitle.textContent = projectTitle;
                modalImage.src = project.image;
                modalDescription.textContent = project.description;
                modalTech.innerHTML = project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
                modalLink.href = project.link;
                modal.style.display = 'block';
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.display = 'block';
    }

    // Change testimonial every 5 seconds
    setInterval(showNextTestimonial, 5000);

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-item h3');
    const statsSection = document.getElementById('project-stats');

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const count = parseInt(stat.innerText);
            const increment = target / 200; // Adjust speed of count animation

            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 1);
            } else {
                stat.innerText = target;
            }
        });
    }

    // Check if stats section is in viewport and start animation
    function checkStatsVisibility() {
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (statsPosition < screenPosition) {
            animateStats();
            window.removeEventListener('scroll', checkStatsVisibility);
        }
    }

    window.addEventListener('scroll', checkStatsVisibility);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to project approach steps
    const approachSteps = document.querySelectorAll('.approach-step');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    approachSteps.forEach(step => {
        observer.observe(step);
    });
});