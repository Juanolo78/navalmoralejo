// fiestas.js - Funcionalidades específicas para la página de fiestas

document.addEventListener('DOMContentLoaded', function() {
    initFiestasInteractions();
    initImageFallbacks();
});

function initFiestasInteractions() {
    // Añadir efecto de carga suave para las imágenes
    const fiestaImages = document.querySelectorAll('.fiesta-image img');
    
    fiestaImages.forEach(img => {
        // Si la imagen no carga, mostrar una imagen por defecto
        img.addEventListener('error', function() {
            this.src = 'Imagenes/fiesta-default.jpg';
            this.alt = 'Imagen de fiesta no disponible';
        });
        
        // Añadir carga lazy
        img.loading = 'lazy';
    });

    // Trackear clicks en los álbumes de fotos
    const fiestaLinks = document.querySelectorAll('.fiesta-link');
    
    fiestaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const fiestaName = this.querySelector('h3').textContent;
            console.log(`Accediendo al álbum de: ${fiestaName}`);
            
            // Trackear en analytics si está disponible
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_album', {
                    'event_category': 'Fiestas',
                    'event_label': fiestaName
                });
            }
        });
    });

    // Animación de aparición de las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const fiestaCards = document.querySelectorAll('.fiesta-card');
    fiestaCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function initImageFallbacks() {
    // Imágenes por defecto para cada fiesta (en caso de que no existan las específicas)
    const defaultImages = {
        'san-anton.jpg': 'Imagenes/fiesta-religiosa.jpg',
        'cruz-mayo.jpg': 'Imagenes/fiesta-flores.jpg',
        'san-pedro.jpg': 'Imagenes/fiesta-patronal.jpg',
        'fraternidad.jpg': 'Imagenes/fiesta-verano.jpg'
    };

    // Verificar y reemplazar imágenes que no existan
    const images = document.querySelectorAll('.fiesta-image img');
    
    images.forEach(img => {
        const imageUrl = img.getAttribute('src');
        const fileName = imageUrl.split('/').pop();
        
        // Crear una imagen temporal para verificar si existe
        const tempImage = new Image();
        tempImage.onerror = function() {
            // Si la imagen no existe, usar la por defecto
            if (defaultImages[fileName]) {
                img.src = defaultImages[fileName];
            } else {
                img.src = 'Imagenes/fiesta-default.jpg';
            }
        };
        tempImage.src = imageUrl;
    });
}

// Función para compartir información de fiestas
function shareFiesta(fiestaName) {
    if (navigator.share) {
        navigator.share({
            title: `Fiesta: ${fiestaName}`,
            text: `Descubre más sobre ${fiestaName} en Navalmoralejo`,
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        alert(`Comparte información sobre ${fiestaName}`);
    }
}