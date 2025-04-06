/**
 * Nitesh's Data Mastery Website
 * Data metrics functionality
 */

// ==========================================================================
// Data Metrics Functions
// ==========================================================================

// Keep track of whether metrics are currently animating
let metricsAnimating = false;

/**
 * Initialize the data metrics display
 */
function initDataMetrics() {
    console.log("Initializing data metrics...");
    
    // If metrics are currently animating, don't restart
    if (metricsAnimating) {
        console.log("Metrics animation already in progress");
        return;
    }
    
    // Define metrics data with descriptions for tooltips
    const metrics = [
        { 
            value: '8', 
            label: 'Data Migration Projects', 
            description: 'High availability across all data systems, ensuring near-continuous access to critical information.'
        },
        { 
            value: '5000TB+', 
            label: 'Data Processed', 
            description: 'Total volume of data transformed and analyzed across all enterprise projects.'
        },
        { 
            value: '45ms', 
            label: 'Avg. Query Time', 
            description: 'Optimized query performance enables near real-time data access and analysis.'
        },
        { 
            value: '40% Reduction', 
            label: 'Data Processing Time', 
            description: 'Custom data integration workflows designed and implemented for various business needs.'
        },
        { 
            value: 'BIG5', 
            label: 'Consulting Experience', 
            description: 'Custom data integration workflows designed and implemented for various business needs.'
        }
    ];
    
    // Get the metrics container
    const metricsContainer = document.getElementById('data-metrics');
    
    if (!metricsContainer) {
        console.error("Data metrics container not found!");
        return;
    }
    
    // Clear any existing content
    metricsContainer.innerHTML = '';
    
    // Set animation in progress flag
    metricsAnimating = true;
    
    // Generate metric elements with a slight delay between each for a nice effect
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            const metricElement = document.createElement('div');
            metricElement.className = 'metric';
            
            const valueElement = document.createElement('div');
            valueElement.className = 'metric-value';
            valueElement.textContent = '0'; // Start at 0
            
            const labelElement = document.createElement('div');
            labelElement.className = 'metric-label';
            labelElement.textContent = metric.label;
            
            // Add tooltip functionality
            metricElement.setAttribute('title', metric.description);
            
            metricElement.appendChild(valueElement);
            metricElement.appendChild(labelElement);
            
            // Add hover effect
            metricElement.addEventListener('mouseenter', function() {
                valueElement.style.animation = 'pulse 1s infinite';
            });
            
            metricElement.addEventListener('mouseleave', function() {
                valueElement.style.animation = 'none';
            });
            
            // Add to container with fade-in effect
            metricElement.style.opacity = '0';
            metricElement.style.transform = 'translateY(10px)';
            metricElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            metricsContainer.appendChild(metricElement);
            
            // Trigger fade-in
            setTimeout(() => {
                metricElement.style.opacity = '1';
                metricElement.style.transform = 'translateY(0)';
            }, 50);
            
            // Add animated counter effect for numeric values
            if (metric.value.match(/[\d.]+/)) {
                animateMetricValue(valueElement, metric.value);
            }
            
            // If this is the last metric, clear the animation flag when done
            if (index === metrics.length - 1) {
                setTimeout(() => {
                    metricsAnimating = false;
                }, 2000); // After animation completes
            }
        }, index * 150); // Stagger the appearance of each metric
    });
    
    console.log("Data metrics initialization started");
}

/**
 * Creates an animated counting effect for metric values
 * @param {HTMLElement} element - The element to animate
 * @param {string} finalValue - The final value to display
 */
function animateMetricValue(element, finalValue) {
    // Extract numeric portion
    const matches = finalValue.match(/[\d.]+/);
    if (!matches || !matches[0]) return;
    
    const numericPart = parseFloat(matches[0]);
    const suffix = finalValue.replace(/[\d.]+/, '');
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            // Use easeOutQuart easing function for a nice effect
            const easing = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easing * numericPart);
            
            // Format based on the metric type
            element.textContent = `${currentValue}${suffix}`;
            
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is exactly as specified
            element.textContent = finalValue;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize metrics when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initial metrics population will be handled by the scroll observer
    // but we'll set a fallback timer just in case
    setTimeout(() => {
        // Only initialize if not already done by scroll observer
        if (!metricsAnimating && document.getElementById('data-metrics').children.length === 0) {
            initDataMetrics();
        }
    }, 1000);
});

// Make function globally accessible
window.initDataMetrics = initDataMetrics;