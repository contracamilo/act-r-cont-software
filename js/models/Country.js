/**
 * Clase que representa un país y maneja su información
 */
class Country {
    /**
     * Constructor que inicializa un país con los datos de la API
     * @param {Object} data - Datos del país desde la API
     */
    constructor(data) {
        this.name = data.name.common;
        this.nativeName = this.getNativeName(data.name.nativeName);
        this.population = data.population;
        this.region = data.region;
        this.subregion = data.subregion;
        this.capital = data.capital?.[0] || 'N/A';
        this.tld = data.tld?.[0] || 'N/A';
        this.currencies = this.getCurrencies(data.currencies);
        this.languages = this.getLanguages(data.languages);
        this.borders = data.borders || [];
        this.flag = data.flags.svg;
    }

    /**
     * Obtiene el nombre nativo del país
     * @param {Object} nativeName - Objeto con nombres nativos
     * @returns {string} Primer nombre nativo disponible
     */
    getNativeName(nativeName) {
        if (!nativeName) return 'N/A';
        // Obtener el primer nombre nativo disponible
        const firstNativeName = Object.values(nativeName)[0];
        return firstNativeName?.common || 'N/A';
    }

    /**
     * Obtiene las monedas del país en formato legible
     * @param {Object} currencies - Objeto con monedas
     * @returns {string} Lista de monedas separadas por coma
     */
    getCurrencies(currencies) {
        if (!currencies) return 'N/A';
        return Object.values(currencies)
            .map(currency => currency.name)
            .join(', ');
    }

    /**
     * Obtiene los idiomas del país en formato legible
     * @param {Object} languages - Objeto con idiomas
     * @returns {string} Lista de idiomas separados por coma
     */
    getLanguages(languages) {
        if (!languages) return 'N/A';
        return Object.values(languages).join(', ');
    }

    /**
     * Formatea el número de población con separadores de miles
     * @returns {string} Población formateada
     */
    formatPopulation() {
        return this.population.toLocaleString();
    }

    /**
     * Genera el HTML para la tarjeta de vista previa del país
     * @returns {string} HTML de la tarjeta
     */
    toCardHTML() {
        return `
            <div class="country-card" data-name="${this.name}">
                <img class="country-card__flag" src="${this.flag}" alt="${this.name} flag">
                <div class="country-card__content">
                    <h2 class="country-card__name">${this.name}</h2>
                    <p class="country-card__info">
                        <span class="country-card__label">Población:</span> ${this.formatPopulation()}
                    </p>
                    <p class="country-card__info">
                        <span class="country-card__label">Región:</span> ${this.region}
                    </p>
                    <p class="country-card__info">
                        <span class="country-card__label">Capital:</span> ${this.capital}
                    </p>
                </div>
            </div>
        `;
    }

    /**
     * Genera el HTML para la vista detallada del país
     * @returns {string} HTML de la vista detallada
     */
    toDetailHTML() {
        return `
            <div class="country-detail__content">
                <button class="back-button">
                    ←
                    Volver
                </button>
                <div class="country-detail__grid">
                    <img class="country-detail__flag" src="${this.flag}" alt="${this.name} flag">
                    <div class="country-detail__info">
                        <h2 class="country-detail__name">${this.name}</h2>
                        <div class="country-detail__data">
                            <p><span class="country-detail__label">Nombre Nativo:</span> ${this.nativeName}</p>
                            <p><span class="country-detail__label">Población:</span> ${this.formatPopulation()}</p>
                            <p><span class="country-detail__label">Región:</span> ${this.region}</p>
                            <p><span class="country-detail__label">Sub Región:</span> ${this.subregion || 'N/A'}</p>
                            <p><span class="country-detail__label">Capital:</span> ${this.capital}</p>
                            <p><span class="country-detail__label">Dominio de Nivel Superior:</span> ${this.tld}</p>
                            <p><span class="country-detail__label">Monedas:</span> ${this.currencies}</p>
                            <p><span class="country-detail__label">Idiomas:</span> ${this.languages}</p>
                        </div>
                        ${this.borders.length ? `
                            <div class="country-detail__borders">
                                <h3>Países Fronterizos:</h3>
                                <div class="border-buttons">
                                    ${this.borders.map(border => `
                                        <button class="border-button" data-code="${border}">${border}</button>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }
} 