document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('email-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        
        try {
            // Send the email to our API
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Show success message
                messageDiv.className = 'success';
                messageDiv.textContent = 'Success! You will now receive ToS update notifications.';
                form.reset();
            } else {
                // Show error message
                messageDiv.className = 'error';
                messageDiv.textContent = data.error || 'Failed to register. Please try again.';
            }
        } catch (error) {
            // Show error message for network errors
            messageDiv.className = 'error';
            messageDiv.textContent = 'Network error. Please check your connection and try again.';
            console.error('Error:', error);
        }
    });
});