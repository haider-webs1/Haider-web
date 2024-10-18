// Portfolio Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
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
        'E-commerce Website': {
            description: 'A fully responsive online store built with React.js and integrated with a headless CMS. Features include product listings, shopping cart, user authentication, and payment gateway integration.',
            image: 'img/project1-large.jpg',
            tech: ['React.js', 'Node.js', 'MongoDB', 'Stripe API'],
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
    document.querySelectorAll('.btn-view-project').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectTitle = e.target.closest('.portfolio-item').querySelector('h3').textContent;
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

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }

    // Change testimonial every 5 seconds
    setInterval(showNextTestimonial, 5000);

    // Animate portfolio items on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });

    portfolioItems.forEach(item => {
        observer.observe(item);
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