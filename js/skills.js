/**
 * Animated Skills Section
 */

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up skills animation observer
    initSkillsAnimation();
});

// Set up intersection observer for skills section
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Add animation delay as custom property
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--i', index % 10); // Reset counter for each category
    });
    
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                // observer.disconnect(); // Optional: only trigger animation once
            }
        });
    }, { threshold: 0.2 });
    
    // Start observing
    observer.observe(skillsSection);
}

// Animate skills with staggered delays
function animateSkills() {
    const categories = document.querySelectorAll('.skill-category');
    
    categories.forEach((category, i) => {
        // Set a delay based on category index
        setTimeout(() => {
            // Add sparkle effect
            addSparkle(category);
            
            // Find all skill tags in this category
            const tags = category.querySelectorAll('.skill-tag');
            
            // Animate each tag with a staggered delay
            tags.forEach((tag, j) => {
                setTimeout(() => {
                    // Add particle burst
                    addParticleBurst(tag);
                }, j * 100);
            });
        }, i * 300);
    });
}

// Add sparkle effect to a category
function addSparkle(element) {
    // Create a sparkle element
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.top = '0';
    sparkle.style.left = '0';
    sparkle.style.width = '100%';
    sparkle.style.height = '100%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)';
    sparkle.style.opacity = '0';
    
    // Add to element
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    // Animate
    sparkle.animate([
        { opacity: 0, transform: 'scale(0.5)' },
        { opacity: 0.8, transform: 'scale(1.1)' },
        { opacity: 0, transform: 'scale(1.5)' }
    ], {
        duration: 800,
        easing: 'ease-out',
        fill: 'forwards'
    });
    
    // Remove after animation
    setTimeout(() => {
        sparkle.remove();
    }, 800);
}

// Add particle burst effect to a skill tag
function addParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Number of particles
    const particleCount = 8;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Styles
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = getComputedStyle(element).color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        
        // Calculate position
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 20;
        
        // Initial position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Add to document
        document.body.appendChild(particle);
        
        // Animate
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(0.5)',
                opacity: 0
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`,
                opacity: 0.8 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance * 2}px, ${Math.sin(angle) * distance * 2}px) scale(0.5)`,
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
    
    // Add subtle glow effect to the element
    element.animate([
        { boxShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px ' + getComputedStyle(element).color },
        { boxShadow: '0 0 0 rgba(255, 255, 255, 0)' }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
}