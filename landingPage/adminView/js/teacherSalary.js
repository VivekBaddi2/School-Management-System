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

const teacherTable = document.getElementById("teacherTable");
const searchInput = document.getElementById("searchInput");

const popupModal = document.getElementById("popupModal");
const popupFormDiv = document.getElementById("popupFormDiv");
const cancelButton = document.getElementById("cancelButton");
const payButton = document.getElementById("payButton");
const payForm = document.getElementById("payForm");

// Javascript to display user details from local storage in navbar
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

    // Fetch teacher data from backend API
    fetch('/api/getTeachers')
        .then(response => response.json())
        .then(data => {
            if (data.teachers) {
                teachers = data.teachers;
                renderTable(teachers);
            } else {
                console.error('No teachers data found in response');
            }
        })
        .catch(error => {
            console.error('Error fetching teachers:', error);
        });
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
        searchInput.classList.add('dark');

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
        searchInput.classList.remove('dark');
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

let teachers = [];

function renderTable(data) {
    teacherTable.innerHTML = "";
    data.forEach(teacher => {
        const row = document.createElement("tr");
        row.className = "hover:bg-gray-100 hover:shadow-md hover:cursor-pointer transition text-center"; // Add hover styles

        row.innerHTML = `
            <td class="border border-gray-300 p-2">${teacher.id}</td>
            <td class="border border-gray-300 p-2">${teacher.name}</td>
            <td class="border border-gray-300 p-2">${teacher.department}</td>
            <td class="border border-gray-300 p-2">${teacher.salary}</td>
            <td class="border border-gray-300 p-2">
                <button class="payButton bg-violet-800 hover:bg-violet-700 cursor-pointer text-white px-4 py-1 rounded-lg">Pay</button>
            </td>
        `;
        teacherTable.appendChild(row);
    });
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(query) || teacher.subject.toLowerCase().includes(query)
    );
    renderTable(filteredTeachers);
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("payButton")) {
        const row = event.target.closest("tr");
        const id = row.children[0].textContent; // Get the ID from the first column
        const name = row.children[1].textContent; // Get the Name from the second column
        const salary = row.children[3].textContent; // Get the Salary from the fourth column
        const bankDetails = "Bank XYZ, Account: 123456789"; // Example details

        document.getElementById("teacherId").value = id;
        document.getElementById("teacherName").value = name;
        document.getElementById("bankDetails").value = bankDetails;
        document.getElementById("amount").value = salary;

        // Check if dark mode is active and apply the dark class to the modal
        if (body.classList.contains("dark")) {
            popupFormDiv.classList.add("dark");
        } else {
            popupFormDiv.classList.remove("dark");
        }

        popupModal.classList.remove("hidden");
        popupModal.classList.add("flex");
    }
});
cancelButton.addEventListener("click", () => {
    popupModal.classList.add("hidden");
});

payButton.addEventListener("click", (event) => {
    event.preventDefault();
    const amount = document.getElementById("amount").value;

    // Check if the success card already exists
    let successCard = document.getElementById("successCard");
    if (!successCard) {
        // Create the success card
        successCard = document.createElement("div");
        successCard.id = "successCard";
        successCard.className =
            "mt-4 p-4 border-2 border-green-600 bg-green-100 text-green-700 rounded-lg text-center";
        payForm.insertAdjacentElement('afterend', successCard);
    }
    // Remove the 'hidden' class if it exists
    successCard.classList.remove("hidden");

    // Update the success card content
    successCard.textContent = `Salary of Rs.${amount} paid successfully!`;

    // Hide the modal after showing the success card
    setTimeout(() => {
        successCard.classList.add("hidden");
    }, 2000); // Hide the modal after 2 seconds
});
