class CountryList {
    constructor(countryService) {
        this.countryService = countryService;
        this.countries = [];
        this.filteredCountries = [];
        
        // DOM Elements
        this.countriesGrid = document.getElementById('countries-grid');
        this.searchInput = document.getElementById('search');
        this.regionFilter = document.getElementById('region-filter');
        
        // Bind event listeners
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.regionFilter.addEventListener('change', this.handleRegionFilter.bind(this));
        this.countriesGrid.addEventListener('click', this.handleCountryClick.bind(this));
        
        // Initialize
        this.init();
    }
    
    async init() {
        try {
            this.countries = await this.countryService.getAllCountries();
            this.filteredCountries = [...this.countries];
            this.render();
        } catch (error) {
            console.error('Error initializing country list:', error);
            this.showError('Failed to load countries. Please try again later.');
        }
    }
    
    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        this.filterCountries(searchTerm, this.regionFilter.value);
    }
    
    handleRegionFilter(event) {
        const region = event.target.value;
        this.filterCountries(this.searchInput.value.toLowerCase(), region);
    }
    
    filterCountries(searchTerm, region) {
        this.filteredCountries = this.countries.filter(country => {
            const matchesSearch = country.name.toLowerCase().includes(searchTerm);
            const matchesRegion = !region || country.region === region;
            return matchesSearch && matchesRegion;
        });
        
        this.render();
    }
    
    handleCountryClick(event) {
        const countryCard = event.target.closest('.country-card');
        if (!countryCard) return;
        
        const countryName = countryCard.dataset.name;
        this.showCountryDetail(countryName);
    }
    
    async showCountryDetail(countryName) {
        try {
            const country = await this.countryService.getCountryByName(countryName);
            if (!country) {
                throw new Error('Country not found');
            }
            
            const detailElement = document.getElementById('country-detail');
            detailElement.innerHTML = country.toDetailHTML();
            detailElement.classList.remove('hidden');
            
            // Add back button listener
            const backButton = detailElement.querySelector('.back-button');
            backButton.addEventListener('click', () => {
                detailElement.classList.add('hidden');
            });
            
            // Add border country listeners
            const borderButtons = detailElement.querySelectorAll('.border-button');
            borderButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const countryCode = button.dataset.code;
                    const borderCountry = await this.countryService.getCountryByCode(countryCode);
                    if (borderCountry) {
                        this.showCountryDetail(borderCountry.name);
                    }
                });
            });
        } catch (error) {
            console.error('Error showing country detail:', error);
            this.showError('Failed to load country details. Please try again later.');
        }
    }
    
    render() {
        if (this.filteredCountries.length === 0) {
            this.countriesGrid.innerHTML = '<p class="no-results">No countries found matching your criteria.</p>';
            return;
        }
        
        this.countriesGrid.innerHTML = this.filteredCountries
            .map(country => country.toCardHTML())
            .join('');
    }
    
    showError(message) {
        this.countriesGrid.innerHTML = `<p class="error-message">${message}</p>`;
    }
} 