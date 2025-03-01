class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeKey = 'preferred-theme';
        
        // Bind event listeners
        this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        
        // Initialize theme
        this.init();
    }
    
    init() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem(this.themeKey);
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Check for system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
                if (!localStorage.getItem(this.themeKey)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
    }
    
    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        // Update body class
        document.body.classList.toggle('dark-theme', theme === 'dark');
        
        // Update button text
        const iconSpan = this.themeToggle.querySelector('.theme-toggle__icon');
        const textSpan = this.themeToggle.querySelector('.theme-toggle__text');
        
        if (theme === 'dark') {
            iconSpan.textContent = '☀️';
            textSpan.textContent = 'Light Mode';
        } else {
            iconSpan.textContent = '🌙';
            textSpan.textContent = 'Dark Mode';
        }
        
        // Save preference
        localStorage.setItem(this.themeKey, theme);
    }
} 