// Hero Slider Functionality
const slides = document.querySelectorAll('#hero .slide');
let currentSlide = 0;

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Testimonial Slider Functionality
const testimonials = document.querySelectorAll('#testimonials .testimonial');
let currentTestimonial = 0;

function showTestimonial(n) {
    testimonials[currentTestimonial].style.display = 'none';
    currentTestimonial = (n + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].style.display = 'block';
}

function nextTestimonial() {
    showTestimonial(currentTestimonial + 1);
}

// Change testimonial every 7 seconds
setInterval(nextTestimonial, 7000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add('active');
        } else {
            revealElements[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', reveal);

// To check the scroll position on page load
reveal();