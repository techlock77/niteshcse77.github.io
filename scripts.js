/**
 * Nitesh's Data Mastery Website
 * Main JavaScript functionality for animations, interactions, and captcha verification
 */

// ==========================================================================
// Math Captcha Functions
// ==========================================================================

/**
 * Generates a random captcha challenge with two numbers to add
 */
function generateCaptcha() {
    // Generate two random numbers between 1 and 10
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    
    // Update the captcha display
    document.getElementById('captcha-num1').textContent = num1;
    document.getElementById('captcha-num2').textContent = num2;
    
    // Store the correct answer in a data attribute
    document.getElementById('captcha-form').setAttribute('data-answer', (num1 + num2).toString());
}

/**
 * Verifies the entered captcha answer and reveals contact info if correct
 * @param {Event} event - The form submission event
 * @returns {boolean} - Always returns false to prevent form submission
 */
function verifyCaptcha(event) {
    event.preventDefault();
    
    const userAnswer = document.getElementById('captcha-answer').value;
    const correctAnswer = document.getElementById('captcha-form').getAttribute('data-answer');
    
    if (userAnswer === correctAnswer) {
        // Correct answer - Show the contact info section
        document.getElementById('captcha-form').style.display = 'none';
        document.getElementById('contact-info').style.display = 'block';
        
        // Set the email address
        const myEmail = "niteshcse77@gmail.com"; // Replace with your actual email
        const emailLink = document.getElementById('my-email');
        emailLink.href = "mailto:" + myEmail;
        emailLink.textContent = myEmail;
        
        console.log("Captcha verification successful");
    } else {
        // Wrong answer - Apply shake animation and reset
        const captchaContainer = document.querySelector('.captcha-container');
        
        // Add shake animation
        captchaContainer.classList.add('shake');
        
        // Remove the shake class after animation completes
        setTimeout(() => {
            captchaContainer.classList.remove('shake');
        }, 500);
        
        // Generate a new captcha
        generateCaptcha();
        
        // Clear the input field
        document.getElementById('captcha-answer').value = '';
        
        // Show error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Incorrect answer, please try again';
        errorMsg.style.color = 'red';
        errorMsg.style.fontSize = '0.9rem';
        errorMsg.style.marginTop = '5px';
        errorMsg.style.textAlign = 'center';
        
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add the error message
        document.querySelector('.captcha-container').after(errorMsg);
        
        // Focus on the input
        document.getElementById('captcha-answer').focus();
    }
    
    return false;
}

// ==========================================================================
// Page Animation & Interaction Functions
// ==========================================================================

/**
 * Initializes page animations and interactions on DOM load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the captcha if form exists
    if (document.getElementById('captcha-form')) {
        generateCaptcha();
    }
    
    // Set up section reveal animations
    initSectionAnimations();
    
    // Add particle movement on mouse move
    initParticleMovement();
    
    // Create and insert dark mode toggle
    createDarkModeToggle();
    
    // Initialize data visualizations
    initDataVisualizations();
});

/**
 * Sets up fade-in animations for page sections
 */
function initSectionAnimations() {
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
}

/**
 * Initializes subtle movement for data particles on mouse move
 */
function initParticleMovement() {
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
}

// ==========================================================================
// Dark Mode Toggle Functions
// ==========================================================================

/**
 * Creates and appends the dark mode toggle button
 */
function createDarkModeToggle() {
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
    
    // Update data theme visuals
    updateDataTheme(document.body.classList.contains('dark-mode'));
    
    // Animate data particles during transition
    animateDataParticlesTransition();
}

/**
 * Updates theme colors for data visualizations
 * @param {boolean} isDark - Whether dark mode is active
 */
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
    
    // Update data visualization elements
    updateDataVisualizations(isDark, newColors);
}

/**
 * Animates data particles during theme transition
 */
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
    
    // Add temporary data burst particles
    addTemporaryDataBursts();
}

/**
 * Updates data visualizations when theme changes
 * @param {boolean} isDark - Whether dark mode is active
 * @param {Object} colors - The color scheme to use
 */
function updateDataVisualizations(isDark, colors) {
    // Update SVG paths with new colors
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
}

/**
 * Adds temporary data burst particles for transition animation
 */
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

// ==========================================================================
// Data Visualization Enhancement Functions
// ==========================================================================

/**
 * Initializes all data-related visualizations and interactions
 */
function initDataVisualizations() {
    console.log("Initializing data visualizations");
    
    // Setup interactive elements for the data visualization
    setupDataNodeInteractions();
    
    // Add data metrics to the page
    addDataMetrics();
    
    // Create animated data flow effects
    createDataFlowEffects();
}

/**
 * Sets up interactive behavior for data visualization nodes
 */
function setupDataNodeInteractions() {
    // Get all nodes in the data visualization SVG
    const dataNodes = document.querySelectorAll('.data-icon svg circle[cx][cy][r="10"]');
    
    if (dataNodes.length) {
        dataNodes.forEach(node => {
            // Add hover effect
            node.addEventListener('mouseover', (e) => {
                // Get the node's position
                const cx = node.getAttribute('cx');
                const cy = node.getAttribute('cy');
                
                // Highlight the node
                node.setAttribute('r', '12');
                node.style.filter = 'brightness(1.2)';
                
                // Highlight related paths
                highlightRelatedPaths(cx, cy);
                
                // Show data tooltip near the node
                showDataTooltip(e, node.nextElementSibling.textContent);
            });
            
            // Remove hover effect
            node.addEventListener('mouseout', () => {
                node.setAttribute('r', '10');
                node.style.filter = 'none';
                
                // Remove highlights from paths
                resetRelatedPaths();
                
                // Hide tooltip
                hideDataTooltip();
            });
        });
    }
}

/**
 * Highlights SVG paths related to a specific node
 * @param {string} cx - The x coordinate of the node
 * @param {string} cy - The y coordinate of the node
 */
function highlightRelatedPaths(cx, cy) {
    const paths = document.querySelectorAll('.data-icon svg path');
    
    paths.forEach(path => {
        const d = path.getAttribute('d');
        
        // Check if the path contains the coordinates of the node
        if (d.includes(`${cx},${cy}`) || d.includes(`${cx} ${cy}`)) {
            path.style.strokeWidth = '3';
            path.style.filter = 'brightness(1.2)';
            
            // Speed up animation
            const animate = path.querySelector('animate');
            if (animate) {
                animate.setAttribute('dur', '2s');
            }
        }
    });
}

/**
 * Resets highlighted paths to their default state
 */
function resetRelatedPaths() {
    const paths = document.querySelectorAll('.data-icon svg path');
    
    paths.forEach(path => {
        path.style.strokeWidth = '2';
        path.style.filter = 'none';
        
        // Reset animation speed
        const animate = path.querySelector('animate');
        if (animate) {
            animate.setAttribute('dur', '3s');
        }
    });
}

/**
 * Displays a tooltip with information about a data node
 * @param {Event} event - The mouseover event
 * @param {string} text - The text content of the node
 */
function showDataTooltip(event, text) {
    // Create or get tooltip element
    let tooltip = document.getElementById('data-tooltip');
    
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'data-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.padding = '8px 12px';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = 'white';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '0.9rem';
        tooltip.style.zIndex = '1000';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.transition = 'opacity 0.2s ease';
        document.body.appendChild(tooltip);
    }
    
    // Set tooltip content based on node type
    switch(text) {
        case 'SQL':
            tooltip.innerHTML = 'SQL Database: Source of raw data';
            break;
        case 'API':
            tooltip.innerHTML = 'API Endpoints: Data integration interfaces';
            break;
        case 'ETL':
            tooltip.innerHTML = 'ETL Processes: Transforming data for analysis';
            break;
        case 'ML':
            tooltip.innerHTML = 'Machine Learning: Predictive analytics';
            break;
        default:
            tooltip.innerHTML = text;
    }
    
    // Position tooltip near cursor
    const rect = event.target.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    
    tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
    tooltip.style.top = `${rect.top + scrollY - 40}px`;
    tooltip.style.opacity = '1';
}

/**
 * Hides the data tooltip
 */
function hideDataTooltip() {
    const tooltip = document.getElementById('data-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
    }
}

/**
 * Adds data metrics section to the page
 */
function addDataMetrics() {
    // Check if the data metrics section already exists
    if (document.querySelector('.data-metrics')) {
        return;
    }
    
    // Create metrics container
    const metricsContainer = document.createElement('div');
    metricsContainer.className = 'data-metrics';
    
    // Define metrics data
    const metrics = [
        { value: '99.9%', label: 'Data Uptime' },
        { value: '500TB+', label: 'Data Processed' },
        { value: '45ms', label: 'Avg. Query Time' },
        { value: '150+', label: 'ETL Pipelines' }
    ];
    
    // Create each metric element
    metrics.forEach(metric => {
        const metricElement = document.createElement('div');
        metricElement.className = 'metric';
        
        const valueElement = document.createElement('div');
        valueElement.className = 'metric-value';
        valueElement.textContent = metric.value;
        
        const labelElement = document.createElement('div');
        labelElement.className = 'metric-label';
        labelElement.textContent = metric.label;
        
        metricElement.appendChild(valueElement);
        metricElement.appendChild(labelElement);
        metricsContainer.appendChild(metricElement);
        
        // Add counter animation to numbers
        animateCounterValue(valueElement);
    });
    
    // Find where to insert the metrics
    const aboutSection = document.getElementById('about-me');
    if (aboutSection) {
        const skillsSection = aboutSection.querySelector('.skills');
        if (skillsSection) {
            aboutSection.insertBefore(metricsContainer, skillsSection);
        } else {
            aboutSection.appendChild(metricsContainer);
        }
    }
}

/**
 * Animates counter values with a counting effect
 * @param {HTMLElement} element - The element containing the value to animate
 */
function animateCounterValue(element) {
    // Only animate number portions of the text
    const originalText = element.textContent;
    const numericPart = originalText.match(/[\d.]+/);
    
    if (numericPart) {
        // Extract the numeric value and unit
        const numValue = parseFloat(numericPart[0]);
        const unit = originalText.replace(numericPart[0], '');
        
        // Start from a lower value
        let startValue = 0;
        if (numValue > 100) {
            startValue = Math.floor(numValue * 0.7);
        } else if (numValue > 10) {
            startValue = Math.floor(numValue * 0.5);
        }
        
        // Setup Intersection Observer to start animation when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the number
                    let current = startValue;
                    const increment = (numValue - startValue) / 40; // 40 steps for the animation
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numValue) {
                            clearInterval(timer);
                            current = numValue;
                            element.textContent = numValue.toLocaleString() + unit;
                        } else {
                            element.textContent = Math.round(current).toLocaleString() + unit;
                        }
                    }, 30);
                    
                    // Stop observing after animation starts
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(element);
    }
}

/**
 * Creates data flow effects between page sections
 */
function createDataFlowEffects() {
    // Add data flow animation between sections
    animateSectionConnections();
    
    // Create a data burst effect on the central hub
    setupDataBurstEffect();
}

/**
 * Animates connections between page sections
 */
function animateSectionConnections() {
    const sections = document.querySelectorAll('section');
    
    // Check if we already have connection elements
    if (document.querySelector('.section-connection')) {
        return;
    }
    
    // Create connections between adjacent sections
    for (let i = 0; i < sections.length - 1; i++) {
        const currentSection = sections[i];
        const nextSection = sections[i + 1];
        
        // Get section positions
        const currentRect = currentSection.getBoundingClientRect();
        const nextRect = nextSection.getBoundingClientRect();
        
        // Create connection element
        const connection = document.createElement('div');
        connection.className = 'section-connection';
        connection.style.position = 'absolute';
        connection.style.width = '2px';
        connection.style.height = `${nextRect.top - (currentRect.top + currentRect.height)}px`;
        connection.style.backgroundColor = 'var(--primary-color)';
        connection.style.left = '50%';
        connection.style.top = `${currentRect.top + currentRect.height}px`;
        connection.style.transform = 'translateX(-50%)';
        connection.style.opacity = '0.3';
        connection.style.zIndex = '1';
        
        // Add flowing data particle effect
        const particle = document.createElement('div');
        particle.className = 'flow-particle';
        particle.style.position = 'absolute';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'var(--primary-color)';
        particle.style.left = '50%';
        particle.style.transform = 'translateX(-50%)';
        particle.style.animation = `flowDown 3s ease-in infinite`;
        
        // Add animation keyframe for the flowing particle
        if (!document.getElementById('flow-animation')) {
            const style = document.createElement('style');
            style.id = 'flow-animation';
            style.innerHTML = `
                @keyframes flowDown {
                    0% { top: 0; opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        connection.appendChild(particle);
        document.body.appendChild(connection);
    }
}

/**
 * Sets up the data burst effect on the central hub
 */
function setupDataBurstEffect() {
    const centralHub = document.querySelector('.data-icon svg circle[cx="100"][cy="100"][r="25"]');
    
    if (centralHub) {
        centralHub.addEventListener('click', createDataBurst);
    }
}

/**
 * Creates a burst effect of data-related terms
 */
function createDataBurst() {
    // Create data terms to burst out
    const dataTerms = ['SQL', 'ETL', 'API', 'JSON', 'CSV', 'ML', 'AI', 'Spark'];
    const container = document.querySelector('.data-icon');
    
    if (!container) return;
    
    // Get center position
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Create bursting particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('span');
        particle.className = 'data-burst';
        particle.textContent = dataTerms[i];
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        // Add random direction
        const angle = (i * 45) + (Math.random() * 20 - 10);
        const distance = 50 + Math.random() * 30;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        // Set animation
        particle.style.animation = `dataBurst 1.5s forwards`;
        particle.style.setProperty('--random-x', x);
        particle.style.setProperty('--random-y', y);
        
        container.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// Initialize data visualizations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize on page load
    initDataVisualizations();
    
    // Re-initialize on theme toggle to update colors
    const themeToggle = document.getElementById('dark-mode-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Short delay to let theme change complete
            setTimeout(initDataVisualizations, 300);
        });
    }
});