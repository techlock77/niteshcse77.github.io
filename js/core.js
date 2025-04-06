/**
 * Nitesh's Data Mastery Website
 * Core JavaScript functionality
 */

// ==========================================================================
// Page Animation & Interaction Functions
// ==========================================================================

/**
 * Initializes page animations and interactions on DOM load
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing website functionality...");
    
    // Initialize the captcha if form exists
    if (document.getElementById('captcha-form')) {
        generateCaptcha();
    }
    
    // Set up section reveal animations
    initSectionAnimations();
    
    // Add particle movement on mouse move
    initParticleMovement();
    
    // Initialize data visualizations
    initDataVisualizations();
    
    // Initialize data metrics (already called in metrics.js)
    if (typeof window.initDataMetrics === 'function') {
        window.initDataMetrics();
    }
    
    // Initialize scroll indicator
    if (typeof initScrollIndicator === 'function') {
        initScrollIndicator();
    }
    
    // Initialize dark mode toggle (from theme.js)
    if (typeof createDarkModeToggle === 'function') {
        createDarkModeToggle();
    }
    
    // Initialize logo flip animations
    initLogoFlipAnimations();
    
    console.log("Website initialization complete");
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

/**
 * Initializes all data-related visualizations and interactions
 */
function initDataVisualizations() {
    // Setup interactive elements for the data visualization
    setupDataNodeInteractions();
    
    // Create animated data flow effects
    createDataFlowEffects();
}

/**
 * Initializes the flip animation for client logos
 */
function initLogoFlipAnimations() {
  // Get the clients section
  const clientsSection = document.getElementById('clients');
  if (!clientsSection) return;
  
  // Get all logo elements
  const logoElements = document.querySelectorAll('.logo-img');
  if (!logoElements.length) return;
  
  // Create an observer for the clients section
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // Start the logo flip animations when section is visible
      animateLogos(logoElements);
      
      // Disconnect the observer after triggering animations
      observer.disconnect();
    }
  }, {
    threshold: 0.2 // Trigger when 20% of the section is visible
  });
  
  // Observe the clients section
  observer.observe(clientsSection);
}

function animateLogos(logos) {
  // Animate each logo with a staggered delay
  logos.forEach((logo, index) => {
    setTimeout(() => {
      // Add animation class
      logo.classList.add('animated');
      
      // Add flipped class for non-animated fallback
      setTimeout(() => {
        logo.classList.add('flipped');
      }, 50);
    }, index * 200); // 200ms stagger between each logo
  });
}

/**
 * Plays a subtle flip sound effect
 * Can be enabled/disabled based on user preference
 */
function playFlipSound() {
    // Check if sound effects are enabled (could be a user preference)
    const soundEnabled = localStorage.getItem('soundEffects') !== 'disabled';
    
    if (soundEnabled && window.AudioContext) {
        try {
            // Create audio context
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create oscillator for a short blip sound
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            // Connect nodes
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            // Configure sound
            oscillator.type = 'sine';
            oscillator.frequency.value = 1800 + Math.random() * 400;
            gainNode.gain.value = 0.1;
            
            // Envelope
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
            
            // Play and stop
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (e) {
            console.log('Audio context not supported or other audio error');
        }
    }
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
                // Highlight the node
                node.setAttribute('r', '12');
                node.style.filter = 'brightness(1.2)';
                
                // Show data tooltip near the node
                const tooltipText = node.nextElementSibling ? node.nextElementSibling.textContent : '';
                showDataTooltip(e, tooltipText);
            });
            
            // Remove hover effect
            node.addEventListener('mouseout', () => {
                node.setAttribute('r', '10');
                node.style.filter = 'none';
                
                // Hide tooltip
                hideDataTooltip();
            });
        });
    }
}

/**
 * Displays a tooltip with information about a data node
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
 * Creates data flow effects between page sections
 */
function createDataFlowEffects() {
    // Add data burst effect on the central hub
    setupDataBurstEffect();
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