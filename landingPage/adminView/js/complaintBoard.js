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

const leftSection = document.getElementById('leftSection');
const rightSection = document.getElementById('rightSection');
const complaintsContainer = document.getElementById("complaintsContainer");
const complaintDetailsContainer = document.getElementById("complaintDetailsContainer");

// Javascript to display user details from local storage in nav bar
document.addEventListener('DOMContentLoaded', () => {
    // Fetch user details from localStorage
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            // Display user details in the dashboard
            document.getElementById('adminNameText').textContent = user.name;
            // Set profile image src from profilePicture data
            const profileImageElement = document.getElementById('profileImage');
            if (profileImageElement && user.profilePicture) {
                profileImageElement.src = user.profilePicture;
            }
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
document.addEventListener('DOMContentLoaded', () => {
    // Fetch complaints from the server API
    fetch('/api/complaints')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(complaints => {
            renderComplaints(complaints);
        })
        .catch(error => {
            console.error('Error fetching complaints:', error);
            complaintsContainer.textContent = "Failed to load complaints.";
        });
});

// Function to render complaint cards
function renderComplaints(complaints) {
    complaintsContainer.innerHTML = ''; // Clear existing complaints
    complaints.forEach(complaint => {
        const card = document.createElement("div");
        console.log('savedTheme ', savedTheme)
        
        card.className =
            "complaintCard p-4 flex flex-col gap-2 border-2 rounded-2xl w-full lg:w-[20vw] min-w-[250px] h-[200px] border-violet-800 bg-white shadow-md text-gray-700 cursor-pointer hover:shadow-lg transition";
        card.innerHTML = `
            <div class="complaintTitle font-semibold text-lg text-white bg-violet-800 p-2 rounded-t-xl">
                <p class="truncate">${complaint.name} (${complaint.role})</p>
            </div>
            <div class="complaintBody w-full h-[40%] p-2 overflow-hidden">
                <p class="text-sm">
                    ${complaint.complaint}
                </p>
            </div>
            <div class="datePosted font-light text-sm text-gray-500 mt-2">
                <p>Posted on: <span class="font-medium">${new Date(complaint.date).toLocaleDateString()}</span></p>
            </div>
        `;
        if(savedTheme=='dark'){
            card.classList.add('dark');
        }
        card.addEventListener("click", () => displayComplaintDetails(complaint));
        complaintsContainer.appendChild(card);
    });
}

// Display complaint details
function displayComplaintDetails(complaint) {
    complaintDetailsContainer.innerHTML = `
        <h3 class="font-bold text-2xl">${complaint.name} (${complaint.role})</h3>
        <p class="text-sm text-gray-500">${new Date(complaint.date).toLocaleDateString()}</p>
        <p class="mt-4">${complaint.complaint}</p>
        <p class="mt-2 font-light text-gray-600">Department: ${complaint.department}</p>
    `;
}

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
    });
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
        document.querySelectorAll('.complaintCard').forEach(card => {
            card.classList.add('dark');
        });
        complaintDetailsContainer.classList.add('dark');
        // complaintsContainer.classList.add('dark');
        document.querySelectorAll('.complaintCard').forEach(card => {
            card.classList.add('dark');
        })
        leftSection.classList.add('dark');
        rightSection.classList.add('dark');

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
        document.querySelectorAll('.complaintCard').forEach(card => {
            card.classList.remove('dark');
        });
        // complaintsContainer.classList.remove('dark');

        complaintDetailsContainer.classList.remove('dark');
          document.querySelectorAll('.complaintCard').forEach(card => {
            card.classList.remove('dark');
        })
        leftSection.classList.remove('dark');
        rightSection.classList.remove('dark');
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
