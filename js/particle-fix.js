/**
 * Fix for Floating Particles
 * Add this at the end of your core.js file or in a separate script
 */

// Function to ensure floating particles are animated
function fixFloatingParticles() {
    console.log("Checking and fixing floating particles...");
    
    // Find all particle elements
    const particles = document.querySelectorAll('.data-particle');
    
    if (particles.length === 0) {
        console.warn("No floating particles found in the DOM");
        return;
    }
    
    console.log(`Found ${particles.length} floating particles`);
    
    // Check if particles have animation applied
    particles.forEach((particle, index) => {
        // Get computed style to check if animation is applied
        const style = window.getComputedStyle(particle);
        const hasAnimation = style.animation || style.webkitAnimation;
        
        // If no animation is found or animation is set to 'none'
        if (!hasAnimation || hasAnimation === 'none') {
            console.log(`Fixing animation for particle ${index}`);
            
            // Reset any existing animation
            particle.style.animation = 'none';
            
            // Trigger reflow
            particle.offsetHeight;
            
            // Apply the animation with a random duration between 13-20 seconds
            const duration = 13 + Math.floor(Math.random() * 7);
            const delay = Math.random() * 10;
            
            // Set animation with individual properties to ensure it works
            particle.style.animationName = 'floatParticle';
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationTimingFunction = 'linear';
            particle.style.animationIterationCount = 'infinite';
            
            // Add a small random movement offset to make it look more natural
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        } else {
            console.log(`Particle ${index} already has animation: ${hasAnimation}`);
        }
    });
}

// Check the keyframes exist for the floatParticle animation
function ensureKeyframesExist() {
    // Check if the keyframes already exist in a stylesheet
    let keyframesExist = false;
    const styleSheets = document.styleSheets;
    
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const cssRules = styleSheets[i].cssRules || styleSheets[i].rules;
            for (let j = 0; j < cssRules.length; j++) {
                if (cssRules[j].type === CSSRule.KEYFRAMES_RULE && 
                    cssRules[j].name === 'floatParticle') {
                    keyframesExist = true;
                    break;
                }
            }
        } catch (e) {
            // Security error when accessing cross-origin stylesheets
            console.log("Could not read stylesheet", e);
        }
    }
    
    // If keyframes don't exist, add them
    if (!keyframesExist) {
        console.log("Adding floatParticle keyframes");
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.15;
                }
                90% {
                    opacity: 0.15;
                }
                100% {
                    transform: translate(calc(-50vw + 50%), calc(-50vh + 50%)) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleEl);
    }
}

// Run the fix function after DOM is fully loaded and again after a delay
document.addEventListener('DOMContentLoaded', function() {
    // First run - immediate
    ensureKeyframesExist();
    fixFloatingParticles();
    
    // Second run - after a short delay (ensures it runs after any other scripts)
    setTimeout(fixFloatingParticles, 1000);
    
    // Third run - after a longer delay (ensures it runs after any delayed initializations)
    setTimeout(fixFloatingParticles, 3000);
});

// Also run the fix when window is resized
window.addEventListener('resize', function() {
    fixFloatingParticles();
});