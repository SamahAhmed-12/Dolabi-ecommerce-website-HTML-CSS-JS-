document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Display the thank you message
    var messageDiv = document.getElementById('thankYouMessage');
    messageDiv.textContent = "Thanks for contacting us. We've received your message and appreciate your getting in touch. We will reply as soon as possible.";
    messageDiv.style.display = 'block';

    // Reset the form
    this.reset();
});