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

const attendanceRow = Array.from(document.getElementsByTagName('tr'));
const attendanceTableHead = Array.from(document.getElementsByTagName('th'));

const submitAttendanceButton = document.getElementById('submitAttendanceButton');
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
    const attendanceRows = document.querySelectorAll('table tbody tr'); // Dynamically select rows
    const attendanceTableHead = document.querySelectorAll('table thead th'); // Dynamically select headers

    if (theme === 'dark') {
        body.classList.add('dark');
        containerDiv.classList.add('dark');
        navList?.classList.add('dark');
        rectangularNavBar.classList.add('dark');
        dropdownMenu.classList.add('dark');

        attendanceRows.forEach(row => {
            row.classList.add('dark');
        });

        // attendanceTableHead.forEach(header => {
        //    header
        // });

        dropDownSVG.style.fill = "white";
        dropDownContent.forEach(content => {
            content.classList.add('dark');
        });

        switchButton.forEach(button => {
            button.innerText = 'Light Mode';
        });
    } else {
        body.classList.remove('dark');
        containerDiv.classList.remove('dark');
        navList?.classList.remove('dark');
        rectangularNavBar.classList.remove('dark');
        dropdownMenu.classList.remove('dark');

        attendanceRows.forEach(row => {
            row.classList.remove('dark');
        });

        // attendanceTableHead.forEach(header => {
        //     header.style.backgroundColor = ''; // Reset background color
        //     header.style.color = ''; // Reset text color
        // });

        dropDownSVG.style.fill = "black";
        dropDownContent.forEach(content => {
            content.classList.remove('dark');
        });

        switchButton.forEach(button => {
            button.innerText = 'Dark Mode';
        });
    }
}

// Check and apply the saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light mode
applyTheme(savedTheme);

// Add event listener for theme toggle
switchButton.forEach(button => {
    button.addEventListener('click', () => {
        const currentTheme = containerDiv.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save the theme preference
    });
});

// Button to submit attendance
// submitAttendanceButton.addEventListener('click', () => {
//     // Change the button text
//     submitAttendanceButton.innerText = 'Attendance Submitted';
//     submitAttendanceButton.disabled = true; // Disable the button to prevent multiple submissions

//     // Disable all radio inputs inside the table
//     const radioInputs = document.querySelectorAll('table input[type="radio"]');
//     radioInputs.forEach(input => {
//         input.disabled = true;
//     });
// });


// Backend code to handle table data and attendance submission

async function loadStudentData() {
    try {
        const response = await fetch('/api/getStudents');
        if (response.ok) {
            const { students } = await response.json();

            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            // Populate table rows with student data
            students.forEach(student => {
                const row = document.createElement('tr');
                row.className = 'attendanceRow odd:bg-gray-100 even:bg-white';
                row.innerHTML = `
                    <td class="border border-gray-300 px-4 py-2 text-center">${student.id}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">${student.name}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                        <label>
                            <input type="radio" name="attendance-${student.id}" value="Present" required>
                        </label>
                    </td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                        <label>
                            <input type="radio" name="attendance-${student.id}" value="Absent" required>
                        </label>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            // Reapply the current theme to the dynamically added rows
            const savedTheme = localStorage.getItem('theme') || 'light';
            applyTheme(savedTheme);
        } else {
            const { error } = await response.json();
            console.error(`Error fetching student data: ${error}`);
        }
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
}

submitAttendanceButton.addEventListener('click', async () => {
    // Change the button text
    submitAttendanceButton.innerText = 'Attendance Submitted';
    submitAttendanceButton.disabled = true; // Disable the button to prevent multiple submissions

    // Collect attendance data
    const attendanceData = [];
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        const studentId = row.children[0].textContent;
        const studentName = row.children[1].textContent;
        const markedAttendance = row.querySelector('input[type="radio"]:checked')?.value;

        if (markedAttendance) {
            attendanceData.push({
                id: studentId,
                name: studentName,
                attendance: markedAttendance,
                date: new Date().toISOString(),
            });
        }
    });

    // Send attendance data to the backend
    try {
        const response = await fetch('/api/saveAttendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendanceData),
        });

        if (response.ok) {
            alert('Attendance saved successfully');
        } else {
            const { error } = await response.json();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error saving attendance:', error);
        alert('An error occurred while saving attendance');
    }

    // Disable all radio inputs inside the table
    const radioInputs = document.querySelectorAll('table input[type="radio"]');
    radioInputs.forEach(input => {
        input.disabled = true;
    });
});

// Load student data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadStudentData();
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