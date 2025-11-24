// analytics.js - Tracking y analíticas para la web

// Configuración de Google Analytics (reemplazar con tu ID de seguimiento)
const GA_TRACKING_ID = 'TU-ID-DE-SEGUIMIENTO';

// Inicializar Google Analytics
function initGoogleAnalytics() {
    if (typeof gtag === 'undefined') {
        // Cargar el script de Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_TRACKING_ID);
    }
}

// Trackear eventos personalizados
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Trackear páginas vistas
function trackPageView(pageTitle) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': pageTitle,
            'page_location': window.location.href
        });
    }
}

// Trackear clicks en enlaces externos
function trackOutboundLinks() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        if (link && link.href && link.hostname !== window.location.hostname) {
            trackEvent('Outbound Link', 'click', link.href);
        }
    });
}

// Trackear tiempo en la página
function trackTimeOnPage() {
    let startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('Engagement', 'time_spent', `${timeSpent} seconds`);
    });
}

// Inicializar todo el tracking
document.addEventListener('DOMContentLoaded', function() {
    initGoogleAnalytics();
    trackOutboundLinks();
    trackTimeOnPage();
    trackPageView(document.title);
});

// Exportar funciones para uso global
window.Analytics = {
    trackEvent,
    trackPageView
};