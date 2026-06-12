// navigation.js — mobile menu toggle and current-page highlighting

document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('site-nav');
    const toggle = nav.querySelector('.nav-toggle');

    if (toggle) {
        toggle.addEventListener('click', function () {
            const open = nav.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', String(open));
        });
    }

    function closeMenu() {
        nav.classList.remove('nav-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    nav.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    // Mark the current page in the nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('.nav-links a').forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.setAttribute('aria-current', 'page');
        }
    });
});
