document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('email-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        
        try {
            // GitHub repository information - replace with your actual username
            const owner = 'YOUR_GITHUB_USERNAME';
            const repo = 'DSA-ToS-Tracker';
            
            // Create a serverless function URL that will handle the GitHub API auth
            // You'll need to set this up (instructions below)
            const functionUrl = 'YOUR_FUNCTION_URL';
            
            // Submit email to your serverless function instead of directly to GitHub API
            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            
            const data = await response.json();
            
            if (data.success) {
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