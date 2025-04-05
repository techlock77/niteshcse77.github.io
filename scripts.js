// Email protection script
function revealEmail(event) {
    event.preventDefault();
    
    const visitorEmail = document.getElementById('visitor-email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(visitorEmail)) {
        // Valid email format
        const myEncodedEmail = "niteshcse77@gmail.com"; // Replace with your actual email
        
        // Show the contact info section
        document.getElementById('email-protection-form').style.display = 'none';
        document.getElementById('contact-info').style.display = 'block';
        
        // Set the email address
        const emailLink = document.getElementById('my-email');
        emailLink.href = "mailto:" + myEncodedEmail;
        emailLink.textContent = myEncodedEmail;
        
        console.log("Email verification successful");
        return false;
    } else {
        alert("Please enter a valid email address");
        return false;
    }
}

// Add animation effects when scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the section is visible
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });
    
    // Apply initial styles and observe all sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add subtle movement to data particles on mouse move
    const container = document.querySelector('.container');
    const dataParticles = document.querySelectorAll('.data-particle');
    
    if (container && dataParticles.length) {
        container.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            dataParticles.forEach((particle, index) => {
                // Calculate offset based on particle position and mouse position
                const offsetX = (mouseX - 0.5) * 10;
                const offsetY = (mouseY - 0.5) * 10;
                const delay = index * 0.05;
                
                // Apply subtle transform with a delay based on index
                particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                particle.style.transition = `transform 1s ease ${delay}s`;
            });
        });
    }
    
    // Create and insert the dark mode toggle button
    const toggleButton = document.createElement('div');
    toggleButton.id = 'dark-mode-toggle';
    toggleButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C10.8065 3 9.62323 3.23279 8.52792 3.68508C7.43261 4.13738 6.44322 4.80031 5.62218 5.62132C4.80115 6.44234 4.13823 7.43173 3.68594 8.52704C3.23365 9.62235 3.00086 10.8056 3.00086 11.9991C3.00086 13.1926 3.23365 14.3758 3.68594 15.4711C4.13823 16.5664 4.80115 17.5558 5.62218 18.3768C6.44322 19.1979 7.43261 19.8608 8.52792 20.3131C9.62323 20.7654 10.8065 20.9982 12 20.9982C14.3869 20.9982 16.6761 20.0501 18.3784 18.3478C20.0807 16.6455 21.0289 14.3563 21.0289 11.9694C21.0289 9.58248 20.0807 7.29324 18.3784 5.59096C16.6761 3.88868 14.3869 2.94049 12 2.94049V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="toggle-text">Dark Mode</span>
    `;
    toggleButton.classList.add('theme-toggle');
    
    // Insert it into the header
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(toggleButton);
    }
    
    // Set up the click event
    toggleButton.addEventListener('click', toggleDarkMode);
    
    // Add accessibility attributes
    toggleButton.setAttribute('role', 'button');
    toggleButton.setAttribute('tabindex', '0');
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    
    // Allow keyboard activation
    toggleButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDarkMode();
        }
    });
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateDataTheme(true);
        
        // Update toggle button text if dark mode is active
        const toggleText = document.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = 'Light Mode';
        }
    }
});

// Function to toggle dark mode
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
    
    // Update data theme visuals
    updateDataTheme(document.body.classList.contains('dark-mode'));
    
    // Animate data particles during transition
    animateDataParticlesTransition();
}

// Function to update theme colors
function updateDataTheme(isDark) {
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
    
    // Update theme-color meta tag for browser UI
    const themeColorMeta = document.getElementById('theme-color-meta');
    if (themeColorMeta) {
        themeColorMeta.setAttribute('content', isDark ? newColors.dark : newColors.primary);
    }
    
    // Update data visualization elements if they exist
    updateDataVisualizations(isDark, newColors);
}

// Function to animate data particles during theme switch
function animateDataParticlesTransition() {
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
    
    // Add 10 temporary data burst particles
    addTemporaryDataBursts();
}

// Function to update data visualizations when theme changes
function updateDataVisualizations(isDark, colors) {
    // This function can be expanded when data visualizations are added
    // For now, it handles basic SVG elements if they exist
    
    // Example: Update SVG paths with new colors
    const svgPaths = document.querySelectorAll('svg path');
    if (svgPaths.length) {
        svgPaths.forEach(path => {
            // Only update paths that use theme colors
            if (path.getAttribute('stroke') === 'currentColor') {
                path.setAttribute('stroke', isDark ? colors.light : colors.dark);
            }
            if (path.getAttribute('fill') === 'currentColor') {
                path.setAttribute('fill', isDark ? colors.light : colors.dark);
            }
        });
    }
    
    // If you add charts or other visualizations in the future,
    // you can update their themes here
}

// Function to add temporary data burst particles
function addTemporaryDataBursts() {
    const container = document.querySelector('.container');
    const dataTerms = ['SQL', 'ETL', 'API', 'CSV', 'JSON', 'AWS', 'ML', 'AI', 'Spark', 'Data'];
    
    for (let i = 0; i < 10; i++) {
        const burstParticle = document.createElement('span');
        burstParticle.className = 'data-particle data-burst';
        burstParticle.textContent = dataTerms[Math.floor(Math.random() * dataTerms.length)];
        
        // Random position around the center
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        
        burstParticle.style.left = `${centerX}px`;
        burstParticle.style.top = `${centerY}px`;
        
        // Set random variables for the animation
        burstParticle.style.setProperty('--random-x', Math.random());
        burstParticle.style.setProperty('--random-y', Math.random());
        
        container.appendChild(burstParticle);
        
        // Start animation in next frame
        requestAnimationFrame(() => {
            burstParticle.style.animation = `dataBurst 2s ease-out forwards`;
            
            // Remove after animation completes
            setTimeout(() => {
                burstParticle.remove();
            }, 2000);
        });
    }
}