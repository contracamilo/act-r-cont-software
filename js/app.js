/**
 * Inicialización de la aplicación
 * Este archivo es el punto de entrada principal que configura todos los componentes
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar servicios y gestores
    const countryService = new CountryService(); // Servicio para interactuar con la API de países
    const themeManager = new ThemeManager();     // Gestor del tema claro/oscuro
    
    // Inicializar vistas
    const countryList = new CountryList(countryService); // Vista principal de la lista de países
    
    // Agregar estado de carga inicial
    const countriesGrid = document.getElementById('countries-grid');
    countriesGrid.innerHTML = '<p class="loading">Cargando países...</p>';
}); 