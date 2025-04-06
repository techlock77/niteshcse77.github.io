/**
 * Nitesh's Data Mastery Website
 * Visitor Counter functionality
 */

// ==========================================================================
// Visitor Counter Functions
// ========================================================================== 
// This uses localStorage for demo purposes only.
// In a real application, visitor count should be stored on a server.

/**
 * Initialize visitor counter functionality
 */
function initVisitorCounter() {
    console.log("Initializing visitor counter...");
    
    // For demonstration, we'll use localStorage to persist the count
    // In a real application, this would use a server-side solution
    let visitorCount = localStorage.getItem('visitorCount');
    
    // If no count exists yet or if this is a new session
    if (!visitorCount || !sessionStorage.getItem('counted')) {
        // Get current count or start at a baseline number for new sites
        visitorCount = visitorCount ? parseInt(visitorCount) + 1 : 1;
        
        // Save the updated count
        localStorage.setItem('visitorCount', visitorCount);
        
        // Mark this session as counted
        sessionStorage.setItem('counted', 'true');
        
        // Trigger the animation for a new count
        animateCounterIncrement();
    }
    
    // Display the count with thousand separators
    document.getElementById('visitor-count').textContent = visitorCount.toLocaleString();
}

/**
 * Creates an animation effect when the counter increments
 */
function animateCounterIncrement() {
    const counterElement = document.getElementById('visitor-counter');
    
    // Add the pulse animation class
    counterElement.classList.add('counter-pulse');
    
    // Generate data particles around the counter
    createCounterParticles();
    
    // Remove the animation class after it completes
    setTimeout(() => {
        counterElement.classList.remove('counter-pulse');
    }, 1000);
}

/**
 * Creates data particles effect around the counter
 */
function createCounterParticles() {
    const counterElement = document.getElementById('visitor-counter');
    const rect = counterElement.getBoundingClientRect();
    
    // Create 5 particles
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'counter-particle';
        
        // Use same styling as data particles but customize
        particle.style.position = 'absolute';
        particle.style.display = 'block';
        particle.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        particle.style.color = 'white';
        particle.style.fontFamily = 'monospace';
        particle.style.fontSize = '0.7rem';
        particle.style.fontWeight = 'bold';
        particle.style.padding = '2px 5px';
        particle.style.borderRadius = '3px';
        particle.style.opacity = '0';
        particle.style.zIndex = '1';
        particle.style.boxShadow = '0 0 5px rgba(0, 121, 255, 0.2)';
        
        // Set text to binary or +1
        particle.textContent = Math.random() > 0.5 ? '+1' : (Math.random() > 0.5 ? '01' : '10');
        
        // Position around the counter
        particle.style.left = `${rect.left + (rect.width/2) + (Math.random() * 40 - 20)}px`;
        particle.style.top = `${rect.top + (Math.random() * 40 - 20)}px`;
        
        // Add to body
        document.body.appendChild(particle);
        
        // Animate
        setTimeout(() => {
            particle.style.transition = 'all 1s ease-out';
            particle.style.opacity = '1';
            particle.style.transform = `translate(
                ${Math.random() * 60 - 30}px,
                ${-30 - Math.random() * 30}px
            )`;
            
            // Remove after animation
            setTimeout(() => {
                particle.style.opacity = '0';
                setTimeout(() => {
                    particle.remove();
                }, 500);
            }, 800);
        }, i * 100);
    }
}

// Initialize the counter when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if counter element exists
    if (document.getElementById('visitor-counter')) {
        initVisitorCounter();
    }
});