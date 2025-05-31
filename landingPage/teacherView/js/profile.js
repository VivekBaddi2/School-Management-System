const body = document.body;
const containerDiv = document.getElementById('containerDiv');
const hamburgerButton = document.getElementById('hamburgerButton');
const rectangularNavBar = document.getElementById('rectangularNavBar');
const switchButton=document.querySelectorAll('.darkLightSwitchButton');
const dropDownSVG = document.getElementById('dropDownSVG');
const dropdownMenu = document.getElementById('dropdownMenu');
// Salary dropdown
const salaryItem = document.querySelectorAll(".salaryDropDownToggle");
const salaryDropdown = document.getElementById("salaryDropdown");
const salaryDropdownMobile = document.getElementById("salaryDropdownMobile");
// Student dropdown
const studentItem = document.querySelectorAll(".manageStudentsDropDownToggle");
const manageStudentsDropdown = document.getElementById("manageStudentsDropdown");
const manageStudentsDropdownMobile = document.getElementById("manageStudentsDropdownMobile");
const dropDownContent=document.querySelectorAll(".dropdownContent");

// Edit mode variables and elements
const detailsContainer = document.querySelector('.detailsContainer');

const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const profileDetails = document.getElementById('profileDetails');

const profileImageInput = document.getElementById('profileImageInput');
const profileImage = document.getElementById('profileImage');
const dp = document.getElementById('dp');


let originalData = {};

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

// Add click event listener to toggle dropdown visibility for student management
studentItem.forEach(item =>{
    item.addEventListener("click",(event)=>{
        event.preventDefault();
        manageStudentsDropdown.classList.toggle("hidden");
        manageStudentsDropdownMobile.classList.toggle("hidden");
    })
})

//  Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    const isStudentItemClicked = Array.from(studentItem).some(item => item.contains(event.target));
    if (!isStudentItemClicked && !manageStudentsDropdown.contains(event.target)) {
        manageStudentsDropdown.classList.add("hidden");
        manageStudentsDropdownMobile.classList.add("hidden");
    }
});

 // Add click event listener to toggle dropdown visibility
 salaryItem.forEach(item => { 
    item.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    salaryDropdown.classList.toggle("hidden");
    salaryDropdownMobile.classList.toggle("hidden");
});
});

//  Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    const isSalaryItemClicked = Array.from(salaryItem).some(item => item.contains(event.target));
    if (!isSalaryItemClicked && !salaryDropdown.contains(event.target)) {
        salaryDropdown.classList.add("hidden");
        salaryDropdownMobile.classList.add("hidden");
    }
});

// Javascript to handle the hamburger menu
hamburgerButton.addEventListener('click', () => {
    rectangularNavBar.classList.toggle('hidden'); // Toggle the 'hidden' class to show/hide the menu
});

// JavaScript to toggle dark mode

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark');
        containerDiv.classList.add('dark');
        navList.classList.add('dark');
        rectangularNavBar.classList.add('dark');
        dropdownMenu.classList.add('dark');
        dropDownSVG.style.fill = "white";
        dropDownContent.forEach(content => {
            content.classList.add('dark');
        });
        switchButton.forEach(button => {
            button.innerText = 'Light Mode';
        });
        detailsContainer.classList.toggle('dark');

        
    } else {
        body.classList.remove('dark');
        containerDiv.classList.remove('dark');
        navList.classList.remove('dark');
        rectangularNavBar.classList.remove('dark');
        dropdownMenu.classList.remove('dark');
        dropDownSVG.style.fill = "black";
        dropDownContent.forEach(content => {
            content.classList.remove('dark');
        });
         // Change the text of the button to "Dark Mode"
        switchButton.forEach(button => {
            button.innerText = 'Dark Mode';
        });
        detailsContainer.classList.remove('dark');

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

// Function to populate profile fields from local storage
function populateProfileFromLocalStorage() {
    const profileData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!profileData) {
        return;
    }
    const fields = profileDetails.querySelectorAll('[data-field]');
    fields.forEach(field => {
        const key = field.getAttribute('data-field');
        if (profileData[key]) {
            field.textContent = profileData[key];
        }
    });
}

// Populate profile on page load
window.addEventListener('DOMContentLoaded', () => {
    populateProfileFromLocalStorage();

    // Show profile image from local storage (for both navbar and profile page)
    const profileData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (profileData && profileData.profileImage) {
        if (document.getElementById('profileImage')) {
            document.getElementById('profileImage').src = profileData.profileImage;
        }
        if (document.getElementById('dp')) {
            document.getElementById('dp').src = profileData.profileImage;
        }
    }

    // Show teacher name in navbar from local storage
    if (profileData && profileData.name) {
        const teacherNameText = document.getElementById('teacherNameText');
        if (teacherNameText) {
            teacherNameText.textContent = profileData.name;
        }
    }
});

// Change profile image functionality
profileImageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (profileImage) profileImage.src = e.target.result;
            if (dp) dp.src = e.target.result;
            // Store the base64 string for saving
            profileImage.dataset.newImage = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Edit mode functions

function enterEditMode() {
    document.getElementById('profileImageInput').style.display = 'block';

    originalData = {};
    profileDetails.classList.add('editMode');
    const fields = profileDetails.querySelectorAll('[data-field]');
    fields.forEach(field => {
        const key = field.getAttribute('data-field');
        originalData[key] = field.textContent.trim();
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalData[key];
        input.setAttribute('data-field', key);
        input.classList.add('editInput');
        field.replaceWith(input);
    });
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function exitEditMode(save) {
    document.getElementById('profileImageInput').style.display = 'none';

    const inputs = profileDetails.querySelectorAll('input.editInput');
    inputs.forEach(input => {
        const key = input.getAttribute('data-field');
        const p = document.createElement('p');
        p.classList.add('text-lg', 'mt-1', 'font-light');
        p.setAttribute('data-field', key);
        p.textContent = save ? input.value.trim() : originalData[key];
        input.replaceWith(p);
    });
    profileDetails.classList.remove('editMode');
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

editBtn.addEventListener('click', () => {
    enterEditMode();
});

cancelBtn.addEventListener('click', () => {
    exitEditMode(false);
});

saveBtn.addEventListener('click', () => {
    // Collect updated data
    const inputs = profileDetails.querySelectorAll('input.editInput');
    const updatedFields = {};
    inputs.forEach(input => {
        const key = input.getAttribute('data-field');
        updatedFields[key] = input.value.trim();
    });

    // Get the original profile data (with id/email)
    const originalProfile = JSON.parse(localStorage.getItem('loggedInUser')) || {};

     // If a new image was selected, add it to updatedFields
    if (profileImage.dataset.newImage) {
        updatedFields.profileImage = profileImage.dataset.newImage;
    }

    // Merge updated fields with original profile (so id/email are included)
    const updatedData = { ...originalProfile, ...updatedFields };

    // Update local storage with new data
    localStorage.setItem('loggedInUser', JSON.stringify(updatedData));

    // Send updatedData to backend API to save changes
    fetch('/api/teacher/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === 'Teacher data updated successfully'){
            exitEditMode(true);
            alert('Profile updated successfully');
        } else {
            alert('Failed to update profile');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating profile');
    });
});