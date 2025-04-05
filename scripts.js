// Email protection script
function revealEmail(event) {
    event.preventDefault();
    
    const visitorEmail = document.getElementById('visitor-email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(visitorEmail)) {
        // Valid email format
        const myEncodedEmail = "niteshcse77@gmail.com"; // Replace with your actual email
        
        // Show the contact info section
        document.getElementById('email-protection-form').style.display = 'none';
        document.getElementById('contact-info').style.display = 'block';
        
        // Set the email address
        const emailLink = document.getElementById('my-email');
        emailLink.href = "mailto:" + myEncodedEmail;
        emailLink.textContent = myEncodedEmail;
        
        console.log("Email verification successful");
        return false;
    } else {
        alert("Please enter a valid email address");
        return false;
    }
}

// Add animation effects when scrolling
document.addEventListener('DOMContentLoaded', function() {
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
});