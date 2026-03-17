/* filepath: js/core.js */
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbar();
});

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function initNavbar() {
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });
}

// Utility to format server counters
const formatServerStatus = (current, max) => {
    const percentage = (current / max) * 100;
    return {
        text: `${current}/${max}`,
        color: percentage > 80 ? 'red' : percentage > 50 ? 'orange' : 'green'
    };
};
