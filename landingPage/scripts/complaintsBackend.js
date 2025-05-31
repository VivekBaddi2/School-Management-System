// Backend functions for handling complaints

// Load user details from local storage and populate the form
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user details from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('nameInput').value = loggedInUser.name || '';
        document.getElementById('IdInput').value = loggedInUser.id || '';
        document.getElementById('classInput').value = loggedInUser.department || loggedInUser.studentClass || '';
        document.getElementById('roleInput').value = loggedInUser.role || '';
    } else {
        console.error('No user data found in local storage');
    }
});


// Handle form submission
document.getElementById('submitButton').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementById('nameInput').value.trim();
    const id = document.getElementById('IdInput').value.trim();
    const department = document.getElementById('classInput').value.trim();
    const role = document.getElementById('roleInput').value.trim();
    const complaint = document.getElementById('complaintInput').value.trim();

    if (!name || !id || !department || !role || !complaint) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('/api/saveComplaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, id, department, role, complaint }),
        });

        if (response.ok) {
            alert('Complaint submitted successfully');
            document.getElementById('complaintInput').value = ''; // Clear the complaint field
        } else {
            const { error } = await response.json();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error submitting complaint:', error);
        alert('An error occurred while submitting the complaint');
    }
});