// Resume Page JavaScript

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

    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Skill bar animation
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.bar');
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Toggle work experience details
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Show More';
        toggleBtn.classList.add('toggle-btn');
        const content = item.querySelector('ul');
        content.style.display = 'none';
        
        item.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggleBtn.textContent = 'Show Less';
            } else {
                content.style.display = 'none';
                toggleBtn.textContent = 'Show More';
            }
        });
    });

    // Download resume button animation
    const downloadBtn = document.querySelector('.btn-download');
    downloadBtn.addEventListener('mouseenter', () => {
        downloadBtn.innerHTML = 'Download PDF <i class="fas fa-download fa-bounce"></i>';
    });
    downloadBtn.addEventListener('mouseleave', () => {
        downloadBtn.innerHTML = 'Download PDF <i class="fas fa-download"></i>';
    });

    // Print resume functionality
    const printBtn = document.createElement('button');
    printBtn.textContent = 'Print Resume';
    printBtn.classList.add('btn-print');
    document.querySelector('#download-resume .container').appendChild(printBtn);

    printBtn.addEventListener('click', () => {
        window.print();
    });
});