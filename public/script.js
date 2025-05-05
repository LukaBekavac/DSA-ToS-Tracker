document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('email-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        
        try {
            // GitHub repository information - replace with your actual username
            const owner = 'LukaBekavac';
            const repo = 'DSA-ToS-Tracker';
            
            // Create a serverless function URL that will handle the GitHub API auth
            const functionUrl = 'https://api.github.com/repos/LukaBekavac/DSA-ToS-Tracker/dispatches';
            
            // Submit email to your serverless function instead of directly to GitHub API
            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': 'Bearer ' + document.getElementById('token').value
                },
                body: JSON.stringify({ 
                    event_type: 'subscription_request',
                    client_payload: { email: email }
                })
            });
            
            if (response.status === 204) {
                messageDiv.className = 'success';
                messageDiv.textContent = 'Success! You will now receive ToS update notifications.';
                form.reset();
            } else {
                // Show error message
                messageDiv.className = 'error';
                messageDiv.textContent = 'Failed to register. Please try again.';
            }
        } catch (error) {
            // Show error message for network errors
            messageDiv.className = 'error';
            messageDiv.textContent = 'Network error. Please check your connection and try again.';
            console.error('Error:', error);
        }
    });
});