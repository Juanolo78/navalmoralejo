// script.js - Funcionalidades principales para la web de Navalmoralejo

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initMapInteractions();
    initSocialMediaTracking();
    initScrollEffects();
    initContactForm();
    initResponsiveMenu();
});

// Navegación suave para enlaces internos
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

// Interacciones con el mapa
function initMapInteractions() {
    const iframe = document.querySelector('iframe');
    
    if (iframe) {
        // Añadir loader mientras carga el mapa
        const mapContainer = iframe.parentElement;
        const loader = document.createElement('div');
        loader.className = 'map-loader';
        loader.innerHTML = 'Cargando mapa...';
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255,255,255,0.9);
            padding: 20px;
            border-radius: 10px;
            z-index: 10;
        `;
        
        mapContainer.style.position = 'relative';
        mapContainer.appendChild(loader);
        
        iframe.addEventListener('load', function() {
            loader.style.display = 'none';
        });
    }
}

// Tracking de clicks en redes sociales
function initSocialMediaTracking() {
    const socialLinks = document.querySelectorAll('.social-icon');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label');
            console.log(`Red social clickeada: ${platform}`);
            
            // Aquí se puede integrar con Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'event_category': 'Social Media',
                    'event_label': platform
                });
            }
        });
    });
}

// Efectos de scroll
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de header que se oculta al hacer scroll hacia abajo
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Efecto de aparición de elementos
        animateOnScroll();
    });
    
    function animateOnScroll() {
        const elements = document.querySelectorAll('.footer-section, .social-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estilos para la animación
    const animatedElements = document.querySelectorAll('.footer-section, .social-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Manejo del formulario de contacto (si se añade en el futuro)
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            if (validateForm(data)) {
                submitForm(data);
            }
        });
    }
    
    function validateForm(data) {
        // Implementar validación según los campos del formulario
        return true;
    }
    
    function submitForm(data) {
        // Simular envío del formulario
        console.log('Datos del formulario:', data);
        
        // Aquí iría la lógica para enviar los datos al servidor
        showNotification('Mensaje enviado correctamente', 'success');
    }
}

// Menú responsive para móviles
function initResponsiveMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    // Crear botón de menú hamburguesa para móviles
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        display: none;
        background: none;
        border: 2px solid white;
        color: white;
        font-size: 1.5em;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px 0;
    `;
    
    document.querySelector('.header-container').appendChild(menuToggle);
    
    // Toggle del menú en móviles
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Cerrar menú al hacer click en un enlace (móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    });
    
    // Media query para mostrar/ocultar el botón del menú
    function handleResize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            nav.style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            nav.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecutar al cargar
}

// Utilidades
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Cargar datos dinámicos (ejemplo para noticias o eventos)
async function loadDynamicContent() {
    try {
        // Ejemplo de carga de datos desde una API
        const response = await fetch('/api/noticias');
        const data = await response.json();
        
        // Procesar y mostrar los datos
        displayNews(data);
    } catch (error) {
        console.error('Error cargando contenido:', error);
    }
}

function displayNews(news) {
    // Implementar la lógica para mostrar noticias
    console.log('Noticias cargadas:', news);
}

// Exportar funciones para uso global (si es necesario)
window.NavalmoralejoApp = {
    showNotification,
    loadDynamicContent
};