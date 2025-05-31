const body = document.body;
const containerDiv = document.getElementById('containerDiv');
const hamburgerButton = document.getElementById('hamburgerButton');
const rectangularNavBar = document.getElementById('rectangularNavBar');
const switchButton = document.querySelectorAll('.darkLightSwitchButton');
const dropDownSVG = document.getElementById('dropDownSVG');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropDownContent = document.querySelectorAll(".dropdownContent");

const teachersDropDownToggle = document.querySelectorAll('.teachersDropDownToggle');
const teachersDropdown = document.getElementById('teachersDropdown');
const teachersDropdownMobile = document.getElementById('teachersDropdownMobile');

const studentDropDownToggle = document.querySelectorAll('.studentsDropDownToggle');
const studentsDropdown = document.getElementById('studentDropdown');
const studentDropdownMobile = document.getElementById('studentDropdownMobile');

const feePaymentDropDownToggle = document.querySelectorAll('.feePaymentDropDownToggle');
const feePaymentsDropdownMobile = document.getElementById('feePaymentsDropdownMobile');
const feePaymentsDropdown = document.getElementById('feePaymentsDropdown');

const profileContainer = document.getElementById('profileContainer');

const profilePictureInput = document.getElementById('profilePictureInput');
const profilePicturePreview = document.getElementById('profilePicturePreview');
const changePictureButton = document.getElementById('changePictureButton');

let profilePictureBase64 = '';

const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');
const inputs = document.querySelectorAll('#adminProfileForm input');

// Javascript to display user details from local storage in dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Fetch user details from localStorage
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            // Display user details in the dashboard
            document.getElementById('adminNameText').textContent = user.name;
            // document.getElementById('userEmail').textContent = user.email;
            // document.getElementById('userRole').textContent = user.role;
        } catch (error) {
            console.error('No user data found in localStorage', error);
            // Redirect to login page if no user is logged in
            window.location.href = '/login.html';
        }
    }
    else {
        // Redirect to login page if no user is logged in
        window.location.href = '/login.html';
    }

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

// Javascript to handle the hamburger menu
hamburgerButton.addEventListener('click', () => {
    rectangularNavBar.classList.toggle('hidden'); // Toggle the 'hidden' class to show/hide the menu
});

// JavaScript to handle Students dropdown
studentDropDownToggle.forEach(toggle => {
    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        studentsDropdown.classList.toggle('hidden'); // Toggle the 'hidden' class for desktop
        studentDropdownMobile.classList.toggle('hidden'); // Toggle the 'hidden' class for mobile view
    });
});
document.addEventListener('click', (event) => {
    studentDropDownToggle.forEach(toggle => {
        if (!toggle.contains(event.target) && !studentsDropdown.contains(event.target)) {
            studentsDropdown.classList.add('hidden');
        }
        if (!toggle.contains(event.target) && !studentDropdownMobile.contains(event.target)) {
            studentDropdownMobile.classList.add('hidden');
        }
    });
});

// JavaScript to handle Teachers dropdown
teachersDropDownToggle.forEach(toggle => {
    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        teachersDropdown.classList.toggle('hidden'); // Toggle the 'hidden' class for desktop
        teachersDropdownMobile.classList.toggle('hidden'); // Toggle the 'hidden' class for mobile view
    });
});

// Close Students and Teachers dropdowns when clicking outside
document.addEventListener('click', (event) => {
    teachersDropDownToggle.forEach(toggle => {
        if (!toggle.contains(event.target) && !teachersDropdown.contains(event.target)) {
            teachersDropdown.classList.add('hidden');
        }
        if (!toggle.contains(event.target) && !teachersDropdownMobile.contains(event.target)) {
            teachersDropdownMobile.classList.add('hidden');
        }
    });
});

// JavaScript to handle fee payment drop down
feePaymentDropDownToggle.forEach(toggle => {
    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        feePaymentsDropdown.classList.toggle('hidden');
        feePaymentsDropdownMobile.classList.toggle('hidden');
    });
});
document.addEventListener('click', (event) => {
    feePaymentDropDownToggle.forEach(toggle => {
        if (!toggle.contains(event.target) && !feePaymentsDropdown.contains(event.target)) {
            feePaymentsDropdown.classList.add('hidden');
        }
        if (!toggle.contains(event.target) && !feePaymentsDropdownMobile.contains(event.target)) {
            feePaymentsDropdownMobile.classList.add('hidden');
        }
    })
})

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
        profileContainer.classList.add('dark');

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
        profileContainer.classList.remove('dark');
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


editButton.addEventListener('click', () => {
    inputs.forEach(input => input.disabled = false);
    editButton.classList.add('hidden');
    saveButton.classList.remove('hidden');
    cancelButton.classList.remove('hidden');
});


cancelButton.addEventListener('click', () => {
    inputs.forEach(input => input.disabled = true);
    editButton.classList.remove('hidden');
    saveButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
    fetchAdminData();
});

document.getElementById('adminProfileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveAdminData();
});

changePictureButton.addEventListener('click', () => {
    profilePictureInput.click();
});

profilePictureInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const maxDimension = 300; // max width or height
                let { width, height } = img;
                if (width > height) {
                    if (width > maxDimension) {
                        height = height * (maxDimension / width);
                        width = maxDimension;
                    }
                } else {
                    if (height > maxDimension) {
                        width = width * (maxDimension / height);
                        height = maxDimension;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // compress to jpeg quality 0.7
                profilePicturePreview.src = compressedDataUrl;
                profilePictureBase64 = compressedDataUrl;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Fetch admin data and populate form fields
async function fetchAdminData() {
    try {
        const response = await fetch('/api/getAdminData');
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }
        const admin = await response.json();

        // Populate form fields
        document.getElementById('adminNameInput').value = admin.name || '';
        document.getElementById('adminEmailInput').value = admin.email || '';
        document.getElementById('adminPhoneInput').value = admin.phone || '';
        document.getElementById('adminAddressInput').value = admin.address || '';

        // Set profile picture preview and base64
        if (admin.profilePicture) {
            profilePicturePreview.src = admin.profilePicture;
            profilePictureBase64 = admin.profilePicture;
        } else {
            profilePicturePreview.src = '';
            profilePictureBase64 = '';
        }

        // Convert birthDate object to yyyy-mm-dd string for date input
        if (admin.birthDate && admin.birthDate.year && admin.birthDate.month && admin.birthDate.day) {
            const monthMap = {
                January: '01', February: '02', March: '03', April: '04',
                May: '05', June: '06', July: '07', August: '08',
                September: '09', October: '10', November: '11', December: '12'
            };
            const monthNum = monthMap[admin.birthDate.month] || '01';
            const dayNum = admin.birthDate.day.padStart(2, '0');
            const dobStr = `${admin.birthDate.year}-${monthNum}-${dayNum}`;
            document.getElementById('adminDOBInput').value = dobStr;
        } else {
            document.getElementById('adminDOBInput').value = '';
        }

        document.getElementById('adminRoleInput').value = admin.role || 'admin';
    } catch (error) {
        console.error('Error fetching admin data:', error);
        alert('Error fetching admin data');
    }
}

// Convert yyyy-mm-dd string to birthDate object
function convertDOBToBirthDate(dobStr) {
    if (!dobStr) return null;
    const [year, month, day] = dobStr.split('-');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[parseInt(month, 10) - 1] || 'January';
    return { day: day, month: monthName, year: year };
}

// Save updated admin data
async function saveAdminData() {
    // Collect form data
    const name = document.getElementById('adminNameInput').value.trim();
    const email = document.getElementById('adminEmailInput').value.trim();
    const phone = document.getElementById('adminPhoneInput').value.trim();
    const address = document.getElementById('adminAddressInput').value.trim();
    const dobStr = document.getElementById('adminDOBInput').value;
    const role = document.getElementById('adminRoleInput').value;

    const birthDate = convertDOBToBirthDate(dobStr);

    const updatedAdmin = {
        name,
        email,
        phone,
        address,
        birthDate,
        role,
        profilePicture: profilePictureBase64
    };

    try {
        const response = await fetch('/api/updateAdminData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedAdmin)
        });
        if (!response.ok) {
            throw new Error('Failed to update admin data');
        }
        const result = await response.json();
        alert(result.message || 'Admin data updated successfully');
        // Disable form fields after save
        toggleFormFields(false);
        toggleButtons(false);
    } catch (error) {
        console.error('Error updating admin data:', error);
        alert('Error updating admin data');
    }
}

// Toggle form fields enabled/disabled
function toggleFormFields(enable) {
    document.getElementById('adminNameInput').disabled = !enable;
    document.getElementById('adminEmailInput').disabled = !enable;
    document.getElementById('adminPhoneInput').disabled = !enable;
    document.getElementById('adminAddressInput').disabled = !enable;
    document.getElementById('adminDOBInput').disabled = !enable;
    document.getElementById('adminRoleInput').disabled = !enable;
}

// Toggle buttons visibility
function toggleButtons(editMode) {
    document.getElementById('editButton').style.display = editMode ? 'none' : 'inline-block';
    document.getElementById('saveButton').style.display = editMode ? 'inline-block' : 'none';
    document.getElementById('cancelButton').style.display = editMode ? 'inline-block' : 'none';
}

// Fetch data on page load
document.addEventListener('DOMContentLoaded',()=>{
    fetchAdminData();
})