/**
 * Nitesh's Data Mastery Website
 * Dark mode theme toggle functionality
 */

// ==========================================================================
// Dark Mode Toggle Functions
// ==========================================================================

/**
 * Creates and appends the dark mode toggle button
 */
function createDarkModeToggle() {
    // Check if toggle already exists to prevent duplicates
    if (document.getElementById('dark-mode-toggle')) {
        return;
    }
    
    const toggleButton = document.createElement('button');
    toggleButton.id = 'dark-mode-toggle';
    toggleButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C10.8065 3 9.62323 3.23279 8.52792 3.68508C7.43261 4.13738 6.44322 4.80031 5.62218 5.62132C4.80115 6.44234 4.13823 7.43173 3.68594 8.52704C3.23365 9.62235 3.00086 10.8056 3.00086 11.9991C3.00086 13.1926 3.23365 14.3758 3.68594 15.4711C4.13823 16.5664 4.80115 17.5558 5.62218 18.3768C6.44322 19.1979 7.43261 19.8608 8.52792 20.3131C9.62323 20.7654 10.8065 20.9982 12 20.9982C14.3869 20.9982 16.6761 20.0501 18.3784 18.3478C20.0807 16.6455 21.0289 14.3563 21.0289 11.9694C21.0289 9.58248 20.0807 7.29324 18.3784 5.59096C16.6761 3.88868 14.3869 2.94049 12 2.94049V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="toggle-text">Dark Mode</span>
    `;
    toggleButton.classList.add('theme-toggle');
    
    // Append to body first to ensure it exists
    document.body.appendChild(toggleButton);
    
    // Set up the click event
    toggleButton.addEventListener('click', toggleDarkMode);
    
    // Add accessibility attributes
    toggleButton.setAttribute('role', 'button');
    toggleButton.setAttribute('tabindex', '0');
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeColors(true);
        
        // Update toggle button text
        const toggleText = document.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = 'Light Mode';
        }
    }
}

/**
 * Toggles between light and dark mode
 */
function toggleDarkMode() {
    // Toggle the class
    document.body.classList.toggle('dark-mode');
    
    // Update toggle button text
    const toggleText = document.querySelector('.toggle-text');
    if (toggleText) {
        toggleText.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    }
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    
    // Update theme colors
    updateThemeColors(document.body.classList.contains('dark-mode'));
    
    // Animate elements during transition
    animateTransition();
}

/**
 * Updates theme colors
 * @param {boolean} isDark - Whether dark mode is active
 */
function updateThemeColors(isDark) {
    // Set new theme colors
    const newColors = isDark ? 
        {
            primary: '#38bdf8',      // Light blue
            secondary: '#4ade80',    // Light green
            accent: '#fb923c',       // Light orange
            dark: '#0f172a',         // Very dark blue
            light: '#e2e8f0'         // Light gray
        } : 
        {
            primary: '#2563eb',      // Standard blue
            secondary: '#10b981',    // Standard green
            accent: '#f97316',       // Standard orange
            dark: '#1e293b',         // Standard dark
            light: '#f8fafc'         // Standard light
        };
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', newColors.primary);
    document.documentElement.style.setProperty('--secondary-color', newColors.secondary);
    document.documentElement.style.setProperty('--accent-color', newColors.accent);
    document.documentElement.style.setProperty('--dark-color', newColors.dark);
    document.documentElement.style.setProperty('--light-color', newColors.light);
    
    // Update gradient backgrounds
    document.documentElement.style.setProperty(
        '--gradient-bg', 
        `linear-gradient(135deg, ${newColors.primary} 0%, ${newColors.secondary} 100%)`
    );
}

/**
 * Animates elements during theme transition
 */
function animateTransition() {
    // Animate data particles
    const particles = document.querySelectorAll('.data-particle');
    particles.forEach((particle, index) => {
        // Reset any existing animations
        particle.style.animation = 'none';
        particle.offsetHeight; // Trigger reflow
        
        // Create a burst effect
        particle.style.animation = `particleBurst 1.5s ease-out ${index * 0.05}s`;
        
        // Return to normal floating animation after burst
        setTimeout(() => {
            particle.style.animation = `floatParticle ${15 + index}s linear infinite ${index * 0.5}s`;
        }, 1500 + (index * 50));
    });
    
    // Animate section elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        section.style.opacity = '0.8';
        section.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300);
    });
    
    // Smooth transition for client logos
    const clientLogos = document.querySelectorAll('.logo-img');
    clientLogos.forEach(logo => {
        logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        logo.style.opacity = '0.7';
        logo.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 300);
    });
}

// Initialize dark mode toggle on page load
document.addEventListener('DOMContentLoaded', function() {
    createDarkModeToggle();
});

// Make functions accessible globally
window.toggleDarkMode = toggleDarkMode;
window.createDarkModeToggle = createDarkModeToggle;