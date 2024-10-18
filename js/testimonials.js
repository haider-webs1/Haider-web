// Testimonials Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider functionality
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function showSlide(n) {
        sliderItems[currentSlide].classList.remove('active');
        currentSlide = (n + sliderItems.length) % sliderItems.length;
        sliderItems[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Initialize the first slide
    showSlide(0);

    // Auto-advance slider every 5 seconds
    setInterval(() => showSlide(currentSlide + 1), 5000);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements on scroll
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

    document.querySelectorAll('.testimonial-item, .video-item, .featured-testimonial-content').forEach(item => {
        observer.observe(item);
    });

    // Lazy load video iframes
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        const iframe = item.querySelector('iframe');
        const src = iframe.getAttribute('data-src');
        
        const lazyLoad = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    iframe.src = src;
                    observer.unobserve(entry.target);
                }
            });
        };

        const videoObserver = new IntersectionObserver(lazyLoad, {
            root: null,
            threshold: 0.1
        });

        videoObserver.observe(item);
    });

    // Add hover effect to client logos
    const clientLogos = document.querySelectorAll('.logo-grid img');
    clientLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.1)';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    });

    // Add click-to-expand functionality for testimonials
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    testimonialItems.forEach(item => {
        const content = item.querySelector('p');
        const originalText = content.textContent;
        const shortText = originalText.slice(0, 100) + '...';
        
        if (originalText.length > 100) {
            content.textContent = shortText;
            const readMoreBtn = document.createElement('button');
            readMoreBtn.textContent = 'Read More';
            readMoreBtn.classList.add('read-more-btn');
            item.appendChild(readMoreBtn);

            readMoreBtn.addEventListener('click', () => {
                if (content.textContent === shortText) {
                    content.textContent = originalText;
                    readMoreBtn.textContent = 'Read Less';
                } else {
                    content.textContent = shortText;
                    readMoreBtn.textContent = 'Read More';
                }
            });
        }
    });

    // Add a simple filter for testimonials
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            testimonialItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});