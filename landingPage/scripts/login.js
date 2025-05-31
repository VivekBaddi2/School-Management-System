    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Password and Confirm Password do not match.');
                return;
            }

            const email = document.getElementById('email').value;
            const role = document.getElementById('role').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, role })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Login response data:', data); // Debugging
                    alert('Login successful!');
                    localStorage.setItem('loggedInUser', JSON.stringify(data.user)); // store user details in browser
                    window.location.href = data.dashboard; // Redirect to the dashboard
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('There was an error logging in. Please try again.');
            }
        });
    });