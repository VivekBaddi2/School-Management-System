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
 
// Javascript to handle form editing
const detailsDiv = document.querySelector('.detailsDiv');
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const bankDetailsForm = document.getElementById('bankDetailsForm');
const inputs = bankDetailsForm.querySelectorAll('input');
const additionalFields = bankDetailsForm.querySelectorAll('.additionalFields');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirmPassword');

function collapseInputFiels(){
    inputs.forEach(input => input.disabled = true);
    additionalFields.forEach(field => field.classList.add('hidden'));
}
function checkPasswordMatch() {
    if (passwordField.value !== confirmPasswordField.value) {
        confirmPasswordField.setCustomValidity("Passwords do not match");
    } else {
        confirmPasswordField.setCustomValidity("");
    }
}
editButton.addEventListener('click', () => {
    if (editButton.innerText === 'Edit') {
        // Enable all inputs and display additional fields
        inputs.forEach(input => input.disabled = false);
        additionalFields.forEach(field => field.classList.remove('hidden'));
        editButton.classList.add('hidden');
        saveButton.classList.remove('hidden');

        // editButton.innerText = 'Save';
    } else {
        // Disable all inputs and hide additional fields
        collapseInputFiels();
    }
});
saveButton.addEventListener('click', () => {
    // Check if the password and confirm password fields match
    checkPasswordMatch();
    // Disable all inputs and hide additional fields
    inputs.forEach(input => {
        if(input.innerText != ''){
            collapseInputFiels();
        }
    })
});



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
        detailsDiv.classList.add('dark');
        
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
        detailsDiv.classList.remove('dark');
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


saveButton.addEventListener('click', async () => {
    event.preventDefault(); // Prevent the default form submission
    // Check if the password and confirm password fields match
    checkPasswordMatch();

    // Collect the edited bank details
    const bankDetails = {
        bankName: document.getElementById('bankName').value.trim(),
        accountHolderName: document.getElementById('holderName').value.trim(),
        accountNumber: document.getElementById('accountNumber').value.trim(),
        ifscCode: document.getElementById('ifscCode').value.trim(),
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
    };

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('/api/saveBankDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, bankDetails }),
        });

        if (response.ok) {
            alert('Bank details saved successfully');
            collapseInputFiels(); // Disable all inputs and hide additional fields
        } else {
            const { error } = await response.json();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error saving bank details:', error);
        alert('An error occurred while saving bank details');
    }
});

async function loadBankDetails() {
    const loggedInUser = localStorage.getItem('loggedInUser');
     // Retrieve email from local storage
    const email = loggedInUser ? JSON.parse(loggedInUser).email : null;
    console.log(email);
    if (!email) {
        console.error('No email found in local storage');
        return;
    }
    try {
        const response = await fetch('/api/getBankDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            const { bankDetails } = await response.json();

            // Populate the form fields with the fetched bank details
            document.getElementById('bankName').value = bankDetails.bankName || '';
            document.getElementById('holderName').value = bankDetails.accountHolderName || '';
            document.getElementById('accountNumber').value = bankDetails.accountNumber || '';
            document.getElementById('ifscCode').value = bankDetails.ifscCode || '';
            document.getElementById('phoneNumber').value = bankDetails.phoneNumber || '';
        } else {
            const { error } = await response.json();
            console.error(`Error fetching bank details: ${error}`);
        }
    } catch (error) {
        console.error('Error fetching bank details:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadBankDetails(); // Fetch and display bank details
    // Show teacher name and profile photo in navbar from localStorage
    const profileData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (profileData) {
        if (profileData.profileImage) {
            const profileImageElem = document.getElementById('profileImage');
            if (profileImageElem) {
                profileImageElem.src = profileData.profileImage;
            }
        }
        if (profileData.name) {
            const teacherNameElem = document.getElementById('teacherNameText');
            if (teacherNameElem) {
                teacherNameElem.textContent = profileData.name;
            }
        }
    }
});