// script.js - Funcionalidades principales para la web de Navalmoralejo

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMapInteractions();
    initSocialMediaTracking();
    initScrollEffects();
    initContactForm();
    initResponsiveMenu();
});

/* ============================================================
   NAVEGACIÓN SUAVE PARA ENLACES INTERNOS
============================================================ */

function initNavigation() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================================
   MAPA - LOADER Y ACTIVACIÓN SUAVE
============================================================ */

function initMapInteractions() {
    const iframe = document.querySelector('iframe');
    
    if (iframe) {
        const mapContainer = iframe.parentElement;
        const loader = document.createElement('div');

        loader.className = 'map-loader';
        loader.innerHTML = 'Cargando mapa...';
        loader.style.cssText = `
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            background:rgba(255,255,255,0.9);
            padding:15px 25px;
            border-radius:10px;
            font-weight:bold;
            z-index:10;
        `;

        mapContainer.style.position = 'relative';
        mapContainer.appendChild(loader);

        iframe.addEventListener('load', () => loader.remove());
    }
}

/* ============================================================
   TRACKING SOCIAL
============================================================ */

function initSocialMediaTracking() {
    const socialLinks = document.querySelectorAll('.social-icon');

    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.getAttribute('aria-label');
            console.log(`Red social clickeada: ${platform}`);
        });
    });
}

/* ============================================================
   EFECTOS DE SCROLL
============================================================ */

function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 120) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
        animateOnScroll();
    });

    const animatedElements = document.querySelectorAll('.footer-section, .social-section');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    function animateOnScroll() {
        const elements = document.querySelectorAll('.footer-section, .social-section');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 60) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
}

/* ============================================================
   FORMULARIO DE CONTACTO
============================================================ */

function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(this));
        console.log("Formulario enviado:", formData);
        showNotification("Mensaje enviado correctamente", "success");
    });
}

/* ============================================================
   MENÚ RESPONSIVE (HAMBURGUESA)
============================================================ */

function initResponsiveMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    // Crear botón hamburguesa
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.textContent = '☰';
    document.querySelector('.header-container').appendChild(menuToggle);

    // Abrir / cerrar menú
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Cerrar menú al pulsar un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });

    // Ajuste al cambiar tamaño de pantalla
    function handleResize() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    }

    window.addEventListener('resize', handleResize);
}

/* ============================================================
   UTILIDADES
============================================================ */

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    notification.style.cssText = `
        position:fixed;
        top:20px;
        right:20px;
        background:${type === 'success' ? '#4CAF50' : '#2196F3'};
        color:white;
        padding:12px 18px;
        border-radius:6px;
        z-index:2000;
        font-weight:bold;
        box-shadow:0 4px 8px rgba(0,0,0,0.2);
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}
