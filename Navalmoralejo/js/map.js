// map.js - Funcionalidades específicas para el mapa

class MapManager {
    constructor(iframeElement) {
        this.iframe = iframeElement;
        this.isLoaded = false;
        
        this.init();
    }
    
    init() {
        this.iframe.addEventListener('load', () => {
            this.isLoaded = true;
            this.onMapLoad();
        });
    }
    
    onMapLoad() {
        console.log('Mapa cargado correctamente');
        
        // Aquí se pueden añadir más funcionalidades cuando el mapa esté listo
        this.addMapControls();
    }
    
    addMapControls() {
        // Ejemplo: Añadir controles personalizados al mapa
        // Nota: Esto requiere que el iframe permita la manipulación desde el padre
        // y que tengamos acceso al contexto del mapa
    }
    
    // Método para centrar el mapa en una ubicación específica
    centerMap(lat, lng) {
        if (this.isLoaded) {
            // Esta funcionalidad requiere una integración más avanzada con Google Maps API
            console.log(`Centrando mapa en: ${lat}, ${lng}`);
        }
    }
    
    // Método para añadir marcadores
    addMarker(lat, lng, title) {
        if (this.isLoaded) {
            console.log(`Añadiendo marcador: ${title} en ${lat}, ${lng}`);
        }
    }
}

// Inicializar el gestor del mapa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const mapIframe = document.querySelector('iframe[src*="google.com/maps"]');
    
    if (mapIframe) {
        window.mapManager = new MapManager(mapIframe);
    }
});