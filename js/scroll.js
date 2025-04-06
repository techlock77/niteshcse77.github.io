/**
 * Nitesh's Data Mastery Website
 * Scroll indicator functionality
 */

// ==========================================================================
// Scroll Indicator Functions
// ==========================================================================

/**
 * Updates the scroll indicator based on current scroll position
 */
function updateScrollIndicator() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight - windowHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;
    
    // Update progress bar
    const progressBar = document.querySelector('.scroll-indicator-progress');
    if (progressBar) {
        progressBar.style.height = `${scrollPercentage}%`;
    }
    
    // Find the current section in view
    const sections = ['home', 'about-me', 'clients', 'contact'];
    let currentSection = sections[0];
    
    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if we're in this section (with some buffer for better UX)
            if (scrollPosition >= sectionTop - 100 && 
                scrollPosition < sectionTop + sectionHeight - 100) {
                currentSection = sectionId;
                break;
            }
        }
    }
    
    // Update active section in scroll indicator
    const sectionIndicators = document.querySelectorAll('.scroll-section');
    sectionIndicators.forEach(indicator => {
        if (indicator.getAttribute('data-section') === currentSection) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

/**
 * Initializes scroll indicator functionality
 */
function initScrollIndicator() {
    // Set up click handlers for section indicators
    const sectionIndicators = document.querySelectorAll('.scroll-section');
    sectionIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const sectionId = indicator.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set up scroll event listener
    window.addEventListener('scroll', updateScrollIndicator);
    
    // Initial update
    updateScrollIndicator();
    
    // Initialize intersection observer for metrics
    initMetricsObserver();
}

/**
 * Sets up an IntersectionObserver to refresh metrics when scrolled into view
 */
function initMetricsObserver() {
    const metricsSection = document.getElementById('data-metrics');
    
    if (metricsSection && typeof window.initDataMetrics === 'function') {
        // Create observer options
        const options = {
            root: null, // use viewport
            rootMargin: '0px',
            threshold: 0.3 // trigger when 30% visible
        };
        
        // Create observer instance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Metrics section in view, refreshing metrics...');
                    // Refresh metrics when in view
                    window.initDataMetrics();
                    
                    // Optional: Disconnect after first view to prevent multiple refreshes
                    // observer.disconnect();
                }
            });
        }, options);
        
        // Start observing the metrics section
        observer.observe(metricsSection);
    } else {
        console.warn('Could not initialize metrics observer: section not found or function not available');
    }
}