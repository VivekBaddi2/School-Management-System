const switchButton = document.querySelectorAll('.darkLightSwitchButton');
const navList = document.getElementById('navList');
const containerDiv = document.getElementById('containerDiv');
const hamburgerButton = document.getElementById('hamburgerButton');
const rectangularNavBar = document.getElementById('rectangularNavBar');
const detailsContainer = document.querySelector('.detailsContainer');
const navBar = document.getElementById('navBar');
const dropDownSVG = document.getElementById('dropDownSVG');
const dropdownMenu = document.getElementById('dropdownMenu');
const body = document.body;

const studentName = document.getElementById('studentNameText');
const profileImage = document.getElementById('profileImage');
const dp = document.getElementById('dp');

const studentProfileForm = document.getElementById('studentProfileForm');
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');

// Javascript to handle the dropdown menu
dropDownSVG.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden'); // Toggle the 'hidden' class
});
// Close dropdown menu when clicking outside
document.addEventListener('click', (event) => {
    if (!dropDownSVG.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }
});

// Javascript to handle the hamburger menu
hamburgerButton.addEventListener('click', () => {
    rectangularNavBar.classList.toggle('hidden'); // Toggle the 'hidden' class to show/hide the menu
});

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark');
        containerDiv.classList.add('dark');
        navList.classList.add('dark');
        rectangularNavBar.classList.add('dark');
        detailsContainer.classList.add('dark');
        dropdownMenu.classList.add('dark');
        dropDownSVG.style.fill = "white";
        switchButton.forEach(button => button.innerText = 'Light Mode');
    } else {
        body.classList.remove('dark');
        containerDiv.classList.remove('dark');
        navList.classList.remove('dark');
        rectangularNavBar.classList.remove('dark');
        detailsContainer.classList.remove('dark');
        dropdownMenu.classList.remove('dark');
        dropDownSVG.style.fill = "black";
        switchButton.forEach(button => button.innerText = 'Dark Mode');
    }
}

// Check and apply the saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light mode
applyTheme(savedTheme);

switchButton.forEach(button => {
    button.addEventListener('click', () => {
        const currentTheme = containerDiv.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save the theme preference
    });
});

// Function to enable or disable form inputs
function setFormDisabled(disabled) {
    Array.from(studentProfileForm.elements).forEach(element => {
        if (element.tagName.toLowerCase() !== 'button') {
            element.disabled = disabled;
        }
    });
    saveButton.disabled = disabled;
}

// Load student profile data and populate form
async function loadStudentProfile() {
    try {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const studentId = loggedInUser?.id;

        if (!studentId) {
            console.error('Student ID not found in local storage.');
            return;
        }

        const response = await fetch('/api/getStudents');
        if (response.ok) {
            const { students } = await response.json();
            const studentData = students.find(student => student.id === studentId);

            if (!studentData) {
                console.error('Student data not found.');
                return;
            }

            // Populate form fields
            studentName.textContent = studentData.name || '';
            if (studentData.profileImage && studentData.profileImage.startsWith('data:image')) {
                profileImage.src = studentData.profileImage;
                dp.src = studentData.profileImage; // Set the profile image in the dp element
            } 
            // else if (studentData.profileImage) {
            //     profileImage.src = studentData.profileImage;
            // } else {
            //     profileImage.src = 'img/profileImage.jpeg';
            // }

            studentProfileForm.name.value = studentData.name || '';
            studentProfileForm.studentMotherName.value = studentData.studentMotherName || '';
            studentProfileForm.studentFatherName.value = studentData.studentFatherName || '';
            studentProfileForm.id.value = studentData.id || '';
            studentProfileForm.studentClass.value = studentData.studentClass || '';
            studentProfileForm.studentAddress.value = studentData.studentAddress || '';
            studentProfileForm.studentGender.value = studentData.studentGender || '';
            studentProfileForm.studentBloodGroup.value = studentData.studentBloodGroup || '';
            studentProfileForm.birthDate.value = studentData.birthDate || '';
            studentProfileForm.studentPhone.value = studentData.studentPhone || '';
            studentProfileForm.email.value = studentData.email || '';

            setFormDisabled(true);
        } else {
            const { error } = await response.json();
            console.error(`Error fetching student data: ${error}`);
        }
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
}

// Handle Edit button click
editButton.addEventListener('click', () => {
    setFormDisabled(false);
    editButton.disabled = true;
});

// Handle Save button click
saveButton.addEventListener('click', async () => {
    const formData = new FormData(studentProfileForm);
    const updatedData = {};
    formData.forEach((value, key) => {
        updatedData[key] = value;
    });

    // Include profile image as base64 if changed
    const profileImageInput = document.getElementById('profileImageInput');
    if (profileImageInput.files.length > 0) {
        const file = profileImageInput.files[0];
        updatedData.profileImage = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    try {
        const response = await fetch('/api/saveStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            // Update local storage loggedInUser with all updated data fields
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
            Object.keys(updatedData).forEach(key => {
                loggedInUser[key] = updatedData[key];
            });
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            alert('Profile updated successfully.');
            setFormDisabled(true);
            editButton.disabled = false;
            await loadStudentProfile(); // Reload to reflect any changes
        } else {
            const { error } = await response.json();
            alert(`Failed to update profile: ${error}`);
        }
    } catch (error) {
        alert('Error updating profile.');
        console.error('Error updating profile:', error);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadStudentProfile();

    // Show file input when profile image is clicked in edit mode
    const profileImageInput = document.getElementById('profileImageInput');
    const profileImage = document.getElementById('profileImage');

    profileImage.addEventListener('click', () => {
        if (!profileImageInput.disabled && !profileImageInput.style.display.includes('none')) {
            profileImageInput.click();
        }
    });

    // Preview selected image
    profileImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Enable/disable profile image input on edit/save
    editButton.addEventListener('click', () => {
        profileImageInput.style.display = 'block';
    });
    saveButton.addEventListener('click', () => {
        profileImageInput.style.display = 'none';
    });
});
