/**
 * Nitesh's Data Mastery Website
 * Captcha verification functionality
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