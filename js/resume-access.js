/**
 * Nitesh's Data Mastery Website
 * Resume access functionality with password protection
 */

// ==========================================================================
// Resume Access Functions
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the resume access functionality
    initResumeAccess();
});

/**
 * Initialize resume access functionality
 */
function initResumeAccess() {
    // Get resume link element
    const resumeLink = document.getElementById('resume-link');
    
    if (!resumeLink) {
        console.warn('Resume link not found in the DOM');
        return;
    }
    
    // Add click event listener
    resumeLink.addEventListener('click', function(event) {
        event.preventDefault();
        openResumeModal();
    });
    
    // Setup close button functionality
    const closeButton = document.getElementById('modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeResumeModal);
    }
    
    // Setup click outside to close
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeResumeModal();
            }
        });
    }
    
    // Setup form submission
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            verifyPassword();
        });
    }
    
    // Setup password input for real-time validation
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordStrength);
    }
    
    // Add escape key listener
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeResumeModal();
        }
    });
}

/**
 * Opens the resume access modal
 */
function openResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.classList.add('active');
        // Focus on the password input
        setTimeout(() => {
            const passwordInput = document.getElementById('password-input');
            if (passwordInput) {
                passwordInput.focus();
            }
        }, 300);
    }
}

/**
 * Closes the resume modal
 */
function closeResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.classList.remove('active');
        
        // Reset the form and error message
        const passwordForm = document.getElementById('password-form');
        const errorMessage = document.getElementById('error-message');
        const passwordInput = document.getElementById('password-input');
        
        if (passwordForm) {
            passwordForm.reset();
        }
        
        if (errorMessage) {
            errorMessage.classList.remove('active');
        }
        
        // Reset strength indicators
        const strengthWrapper = document.getElementById('password-strength');
        if (strengthWrapper) {
            strengthWrapper.className = 'password-strength';
        }
    }
}

/**
 * Updates the password strength indicators in real-time
 */
function updatePasswordStrength() {
    const password = document.getElementById('password-input').value;
    const strengthWrapper = document.getElementById('password-strength');
    
    // Reset all classes
    strengthWrapper.className = 'password-strength';
    
    // Check for capital letter
    if (/[A-Z]/.test(password)) {
        strengthWrapper.classList.add('has-capital');
    }
    
    // Check for lowercase letter
    if (/[a-z]/.test(password)) {
        strengthWrapper.classList.add('has-lowercase');
    }
    
    // Check for special character
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        strengthWrapper.classList.add('has-special');
    }
    
    // Check if all requirements are met
    if (checkPasswordValid(password)) {
        strengthWrapper.classList.add('password-matches');
    }
}

/**
 * Validates if the password meets all requirements
 * @param {string} password - The password to check
 * @returns {boolean} - True if password is valid
 */
function checkPasswordValid(password) {
    // Password must have at least 1 capital letter, 1 lowercase letter, and 1 special character
    const hasCapital = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasCapital && hasLowercase && hasSpecial;
}

/**
 * Verifies the password and shows the resume if correct
 */
function verifyPassword() {
    const password = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('error-message');
    
    // Check password format first
    if (!checkPasswordValid(password)) {
        showError("Password must contain at least 1 capital letter, 1 lowercase letter, and 1 special character.");
        return;
    }
    
    // For this placeholder implementation, let's use a simple password: "Test@123"
    const correctPassword = "Test@123";
    
    if (password === correctPassword) {
        // Password correct! Open the resume in a new tab
        window.open('your-resume.pdf', '_blank');
        closeResumeModal();
    } else {
        // Password incorrect
        showError("Incorrect password. Please try again.");
        
        // Animate the input to show error
        const passwordInput = document.getElementById('password-input');
        passwordInput.classList.add('shake');
        setTimeout(() => {
            passwordInput.classList.remove('shake');
        }, 400);
    }
}

/**
 * Shows an error message
 * @param {string} message - The error message to display
 */
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('active');
        
        // Force reflow to restart animation
        void errorMessage.offsetWidth;
        
        errorMessage.classList.add('active');
    }
}