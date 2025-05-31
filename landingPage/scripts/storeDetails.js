document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const birthDate = {
            day: form.querySelector('input[aria-label="Day"]').value,
            month: form.querySelector('input[aria-label="Month"]').value,
            year: form.querySelector('input[aria-label="Year"]').value
        };
        const role = document.getElementById('role').value;
        const id = `${birthDate.year}${birthDate.day}${Math.floor(Math.random() * 10000)}`; // Generate a unique ID based on birth date and random number
    
        const userDetails = {
            id,
            name,
            role,
            email,
            password,
            birthDate
        };

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            });

            if (response.ok) {
                alert('Account created successfully!');
                form.reset();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error storing user details:', error);
            alert('There was an error creating your account. Please try again.');
        }
    });
});