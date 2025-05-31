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

// Select necessary elements
const seeListBtn = document.getElementById('seeListBtn');
const classSelection = document.getElementById('classSelection');
const studentsFeesPaidDetails = document.querySelector('.studentsFeesPaidDetails');
const monthlyRevenueDiv = document.querySelector('.monthlyRevenueDiv');
const leftSection = document.querySelector('.leftSection');
const rightSection = document.querySelector('.rightSection');
const searchBox = document.querySelector('.searchBox');

// Example data for students
const students = [
    { id: 'U02CG22S0046', name: 'Vivek Baddi', class: '7TH', feesPaid: 20000, totalFees: 20000 },
    { id: 'U02CG22S0047', name: 'John Doe', class: '6TH', feesPaid: 15000, totalFees: 20000 },
    { id: 'U02CG22S0048', name: 'Jane Smith', class: '8TH', feesPaid: 10000, totalFees: 20000 },
    { id: 'U02CG22S0049', name: 'Alice Johnson', class: '1ST', feesPaid: 5000, totalFees: 20000 },
    { id: 'U02CG22S0050', name: 'Bob Brown', class: '7TH', feesPaid: 0, totalFees: 20000 },
];

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

// Function to display the list of students who have not paid full fees
function displayUnpaidStudents() {
    // Check if the table already exists to avoid duplicates
    const existingTable = document.getElementById('unpaidStudentsTable');
    if (existingTable) {
        existingTable.remove(); // Remove the existing table
    }

    // Get the selected class from the dropdown
    const selectedClass = classSelection.value;

    // Extract the number from the selected class (e.g., "class7" -> "7")
    const selectedClassNumber = selectedClass.match(/\d+/)?.[0];
    console.log(selectedClassNumber);

    // Filter students who have not paid full fees and match the selected class
    const unpaidStudents = students.filter(student => {
        const hasPendingFees = student.feesPaid < student.totalFees;

        // Extract the number from student.class (e.g., "7TH" -> "7")
        const studentClassNumber = student.class.match(/\d+/)?.[0];
        console.log(studentClassNumber);
        // Compare the extracted numbers
        const matchesClass = !selectedClassNumber || studentClassNumber === selectedClassNumber;

        return hasPendingFees && matchesClass;
    });
    console.log(unpaidStudents);

    // Create a table to display the unpaid students
    const table = document.createElement('table');
    table.id = 'unpaidStudentsTable';
    table.classList.add('w-full', 'mt-4', 'border-collapse', 'border', 'border-violet-800', 'text-left');

    // Add table headers
    table.innerHTML = `
        <thead>
            <tr class="bg-violet-800 text-white">
                <th class="border border-violet-800 p-2">Student ID</th>
                <th class="border border-violet-800 p-2">Name</th>
                <th class="border border-violet-800 p-2">Class</th>
                <th class="border border-violet-800 p-2">Fees Paid</th>
                <th class="border border-violet-800 p-2">Pending Fees</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    // Add rows for each unpaid student
    const tbody = table.querySelector('tbody');
    unpaidStudents.forEach(student => {
        const row = document.createElement('tr');
        row.classList.add('hover:bg-violet-50');

        row.innerHTML = `
            <td class="border border-violet-800 p-2">${student.id}</td>
            <td class="border border-violet-800 p-2">${student.name}</td>
            <td class="border border-violet-800 p-2">${student.class}</td>
            <td class="border border-violet-800 p-2">${student.feesPaid}</td>
            <td class="border border-violet-800 p-2">${student.totalFees - student.feesPaid}</td>
        `;

        tbody.appendChild(row);
    });

    // If no unpaid students, display a message
    if (unpaidStudents.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `
            <td colspan="5" class="border border-violet-800 p-2 text-center">No students found for the selected class or all have paid their fees.</td>
        `;
        tbody.appendChild(noDataRow);
    }

    // Append the table below the seeListBtn
    studentsFeesPaidDetails.appendChild(table);
}

// Add event listener to the See List button
seeListBtn.addEventListener('click', displayUnpaidStudents);

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
    toggle.addEventListener('click',(event)=>{
        event.stopPropagation();
        feePaymentsDropdown.classList.toggle('hidden');
        feePaymentsDropdownMobile.classList.toggle('hidden');
    });
});
document.addEventListener('click',(event)=>{
    feePaymentDropDownToggle.forEach(toggle=>{
        if(!toggle.contains(event.target) && !feePaymentsDropdown.contains(event.target)){
            feePaymentsDropdown.classList.add('hidden');
        }
          if(!toggle.contains(event.target) && !feePaymentsDropdownMobile.contains(event.target)){
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
        leftSection.classList.add('dark');
        rightSection.classList.add('dark');
        studentsFeesPaidDetails.classList.add('dark');
        monthlyRevenueDiv.classList.add('dark');
        searchBox.classList.add('dark');
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
        leftSection.classList.remove('dark');
        rightSection.classList.remove('dark');
        studentsFeesPaidDetails.classList.remove('dark');
        monthlyRevenueDiv.classList.remove('dark');
        searchBox.classList.remove('dark');
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
