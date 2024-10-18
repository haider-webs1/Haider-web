// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
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
        'HealthTech App UI': {
            description: 'User interface design for a health tracking mobile application. The design focuses on ease of use, clear data visualization, and motivational elements to encourage healthy habits.',
            image: 'img/project2-large.jpg',
            tech: ['Figma', 'Adobe Illustrator', 'Sketch'],
            link: '#'
        },
        'Tech Startup Branding': {
            description: 'Complete brand identity design for a tech startup, including logo design, color palette selection, typography, and brand guidelines document.',
            image: 'img/project3-large.jpg',
            tech: ['Adobe Illustrator', 'Adobe InDesign', 'Brand Strategy'],
            link: '#'
        },
        'Photographer Portfolio': {
            description: 'A minimalist portfolio website designed and developed for a professional photographer, featuring a responsive image gallery and smooth transitions.',
            image: 'img/project4-large.jpg',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Lightbox.js'],
            link: '#'
        },
        'Analytics Dashboard': {
            description: 'User-friendly dashboard design for a data analytics platform, featuring interactive charts, customizable widgets, and real-time data updates.',
            image: 'img/project5-large.jpg',
            tech: ['React.js', 'D3.js', 'Firebase', 'Material-UI'],
            link: '#'
        },
        'Eco-Friendly Logo': {
            description: 'Logo design for an environmentally conscious brand, incorporating natural elements and sustainable concepts into a modern, versatile logo.',
            image: 'img/project6-large.jpg',
            tech: ['Adobe Illustrator', 'Logo Design', 'Branding'],
            link: '#'
        }
    };

    // Open modal with project details
    document.querySelectorAll('.btn-view-project').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectTitle = e.target.closest('.gallery-item').querySelector('h3').textContent;
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

    // Animate gallery items on scroll
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

    galleryItems.forEach(item => {
        observer.observe(item);
    });

    // Lazy loading for gallery images
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('.gallery-item img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();

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