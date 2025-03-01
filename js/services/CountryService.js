/**
 * Servicio para manejar las interacciones con la API de países
 */
class CountryService {
    constructor() {
        this.baseUrl = 'https://restcountries.com/v3.1';
        this.allCountries = []; // Cache de países
    }

    /**
     * Obtiene todos los países de la API
     * @returns {Promise<Array>} Lista de países
     */
    async getAllCountries() {
        try {
            // Retorna el caché si existe
            if (this.allCountries.length) {
                return this.allCountries;
            }

            const response = await fetch(`${this.baseUrl}/all`);
            if (!response.ok) {
                throw new Error('Error al obtener los países');
            }

            const data = await response.json();
            this.allCountries = data.map(country => new Country(country));
            return this.allCountries;
        } catch (error) {
            console.error('Error al obtener países:', error);
            // Si falla la API, usar datos locales como respaldo
            return this.getLocalData();
        }
    }

    /**
     * Busca un país por su nombre exacto
     * @param {string} name - Nombre del país
     * @returns {Promise<Country|null>} País encontrado o null
     */
    async getCountryByName(name) {
        try {
            const response = await fetch(`${this.baseUrl}/name/${name}?fullText=true`);
            if (!response.ok) {
                throw new Error('País no encontrado');
            }

            const [data] = await response.json();
            return new Country(data);
        } catch (error) {
            console.error('Error al buscar país:', error);
            return null;
        }
    }

    /**
     * Obtiene países por región
     * @param {string} region - Nombre de la región
     * @returns {Promise<Array>} Lista de países en la región
     */
    async getCountriesByRegion(region) {
        try {
            const response = await fetch(`${this.baseUrl}/region/${region}`);
            if (!response.ok) {
                throw new Error('Error al obtener países por región');
            }

            const data = await response.json();
            return data.map(country => new Country(country));
        } catch (error) {
            console.error('Error al obtener países por región:', error);
            return [];
        }
    }

    /**
     * Busca un país por su código
     * @param {string} code - Código del país
     * @returns {Promise<Country|null>} País encontrado o null
     */
    async getCountryByCode(code) {
        try {
            const response = await fetch(`${this.baseUrl}/alpha/${code}`);
            if (!response.ok) {
                throw new Error('País no encontrado');
            }

            const [data] = await response.json();
            return new Country(data);
        } catch (error) {
            console.error('Error al buscar país por código:', error);
            return null;
        }
    }

    /**
     * Obtiene datos locales como respaldo si falla la API
     * @returns {Promise<Array>} Lista de países desde datos locales
     */
    async getLocalData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error('Error al obtener datos locales');
            }

            const data = await response.json();
            return data.map(country => new Country(country));
        } catch (error) {
            console.error('Error al obtener datos locales:', error);
            return [];
        }
    }
} 