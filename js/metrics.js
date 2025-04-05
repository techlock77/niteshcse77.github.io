/**
 * Nitesh's Data Mastery Website
 * Data metrics functionality
 */

// ==========================================================================
// Data Metrics Functions
// ==========================================================================

/**
 * Initialize the data metrics display
 */
function initDataMetrics() {
    console.log("Initializing data metrics...");
    
    // Define metrics data with descriptions for tooltips
    const metrics = [
        { 
            value: '99.9%', 
            label: 'Data Uptime', 
            description: 'High availability across all data systems, ensuring near-continuous access to critical information.'
        },
        { 
            value: '500TB+', 
            label: 'Data Processed', 
            description: 'Total volume of data transformed and analyzed across all enterprise projects.'
        },
        { 
            value: '45ms', 
            label: 'Avg. Query Time', 
            description: 'Optimized query performance enables near real-time data access and analysis.'
        },
        { 
            value: '150+', 
            label: 'ETL Pipelines', 
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
    
    // Generate metric elements
    metrics.forEach(metric => {
        const metricElement = document.createElement('div');
        metricElement.className = 'metric';
        
        const valueElement = document.createElement('div');
        valueElement.className = 'metric-value';
        valueElement.textContent = metric.value;
        
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
        
        metricsContainer.appendChild(metricElement);
        
        // Add animated counter effect for numeric values
        if (metric.value.match(/[\d.]+/)) {
            animateMetricValue(valueElement, metric.value);
        }
    });
    
    console.log("Data metrics initialized successfully");
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
    // Wait a short time to ensure other elements are initialized
    setTimeout(initDataMetrics, 100);
});

// Make function globally accessible
window.initDataMetrics = initDataMetrics;