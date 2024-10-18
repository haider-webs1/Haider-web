// Certifications Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animate certification items on scroll
    const certificationItems = document.querySelectorAll('.certification-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    certificationItems.forEach(item => {
        observer.observe(item);
    });

    // Modal for viewing certificates
    const modal = document.createElement('div');
    modal.id = 'certificateModal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img id="certificateImage" src="" alt="Certificate">
        </div>
    `;
    document.body.appendChild(modal);

    const viewButtons = document.querySelectorAll('.btn-view');
    const modalImg = document.getElementById('certificateImage');
    const closeBtn = modal.querySelector('.close');

    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.closest('.certification-item').querySelector('img').src;
            modalImg.src = imgSrc;
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
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