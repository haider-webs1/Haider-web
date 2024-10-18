// Events Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
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

    lazyImages.forEach(img => imageObserver.observe(img));

    // Animate elements on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const animationObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });

    document.querySelectorAll('.event-item, .past-event-item').forEach(item => {
        animationObserver.observe(item);
    });

    // Countdown timer for featured event
    const featuredEventDate = new Date("2023-09-15T09:00:00").getTime();
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    document.querySelector('.event-details').appendChild(countdownElement);

    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = featuredEventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <span>${days}d</span>
            <span>${hours}h</span>
            <span>${minutes}m</span>
            <span>${seconds}s</span>
        `;

        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.innerHTML = "Event has started!";
        }
    }, 1000);

    // Past events slider
    const slider = document.querySelector('.past-events-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Register button functionality
    const registerButtons = document.querySelectorAll('.btn-register, .btn-details');
    registerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const eventName = e.target.closest('.event-item, .featured-event-content').querySelector('h3').textContent;
            alert(`Thank you for your interest in "${eventName}". Registration details will be sent to your email.`);
        });
    });

    // Add to calendar functionality
    function addToCalendar(eventName, eventDate, eventLocation) {
        const encodedEvent = encodeURIComponent(`${eventName} on ${eventDate} at ${eventLocation}`);
        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedEvent}`;
        window.open(googleCalendarUrl, '_blank');
    }

    document.querySelectorAll('.event-item, .featured-event-content').forEach(eventElement => {
        const addToCalendarBtn = document.createElement('button');
        addToCalendarBtn.textContent = 'Add to Calendar';
        addToCalendarBtn.className = 'btn-calendar';
        addToCalendarBtn.addEventListener('click', () => {
            const eventName = eventElement.querySelector('h3').textContent;
            const eventDate = eventElement.querySelector('.event-date').textContent;
            const eventLocation = eventElement.querySelector('.event-location').textContent;
            addToCalendar(eventName, eventDate, eventLocation);
        });
        eventElement.querySelector('.event-info, .event-details').appendChild(addToCalendarBtn);
    });
});