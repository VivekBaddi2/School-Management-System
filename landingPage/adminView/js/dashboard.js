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

const recentActivitiesSection = document.getElementById('recentActivitiesSection');
const recentActivities = document.getElementById('recentActivitiesDiv');
const todoList = document.getElementById('todoSection');
const todoListItem = document.getElementById('todoList');
const totalStudents = document.querySelector('.totalStudentsDiv');
const totalTeacher = document.querySelector('.totalTeachersDiv');
const studentFeesPaid = document.querySelector('.studentFeesPaid');
const combinedStudentAttendance = document.querySelector('.combinedStudentAttendance');

// Javascript to display user details from local storage in dashboard
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

// Fetch and display the number of teachers and students
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/getCounts');
        if (response.ok) {
            const { teacherCount, studentCount } = await response.json();

            // Display the counts in the dashboard
            document.getElementById('totalTeachersSize').textContent = `${teacherCount}`;
            document.getElementById('totalStudentsSize').textContent = `${studentCount}`;
        } else {
            console.error('Failed to fetch counts:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching counts:', error);
    }
});

// Function to fetch attendance data for all students and update combined attendance percentage
async function updateCombinedStudentAttendance() {
    try {
        // Fetch all students
        const studentsResponse = await fetch('/api/getStudents');
        if (!studentsResponse.ok) {
            console.error('Failed to fetch students:', studentsResponse.statusText);
            return;
        }
        const { students } = await studentsResponse.json();
        if (!students || students.length === 0) {
            console.warn('No students found');
            return;
        }

        // Get current month and year
        const now = new Date();
        const month = now.getMonth() + 1; // JS months 0-based
        const year = now.getFullYear();

        let totalRecords = 0;
        let presentCount = 0;

        // For each student, fetch monthly attendance and aggregate
        for (const student of students) {
            const attendanceResponse = await fetch('/api/getMonthlyAttendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: student.id, month, year })
            });
            if (!attendanceResponse.ok) {
                console.error(`Failed to fetch attendance for student ${student.id}:`, attendanceResponse.statusText);
                continue;
            }
            const { attendance } = await attendanceResponse.json();
            if (attendance && attendance.length > 0) {
                totalRecords += attendance.length;
                presentCount += attendance.filter(record => record.attendance.toLowerCase() === 'present').length;
            }
        }
        console.log(`Total Records: ${totalRecords}, Present Count: ${presentCount}`);

        if (totalRecords === 0) {
            console.warn('No attendance records found for the latest month');
            return;
        }

        const attendancePercentage = ((presentCount / totalRecords) * 100).toFixed(2);

        // Update the combinedStudentAttendance element
        if (combinedStudentAttendance) {
            const percentageElement = combinedStudentAttendance.querySelector('p.text-3xl');
            if (percentageElement) {
                percentageElement.textContent = `${attendancePercentage}%`;
            }
        }
    } catch (error) {
        console.error('Error updating combined student attendance:', error);
    }
}

// Call the update function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    updateCombinedStudentAttendance();
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
        recentActivitiesSection.classList.add('dark');
        recentActivities.classList.add('dark');
        todoList.classList.add('dark');
        totalStudents.classList.add('dark');
        totalTeacher.classList.add('dark');
        studentFeesPaid.classList.add('dark');
        combinedStudentAttendance.classList.add('dark');
        todoList.classList.add('dark');
        todoListItem.classList.add('dark');
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
        recentActivitiesSection.classList.remove('dark');
        recentActivities.classList.remove('dark');
        todoList.classList.remove('dark');
        totalStudents.classList.remove('dark');
        totalTeacher.classList.remove('dark');
        studentFeesPaid.classList.remove('dark');
        combinedStudentAttendance.classList.remove('dark');
        todoList.classList.remove('dark');
        todoListItem.classList.remove('dark');
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

// To-Do and Recent Activities functionality
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const recentActivitiesList = document.getElementById('recentActivitiesList');

// Add a new task to the To-Do list
todoForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const task = todoInput.value.trim();

    if (task) {
        try {
            const response = await fetch('/api/saveTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task })
            });

            if (response.ok) {
                const { todos } = await response.json();
                const taskObj = todos[todos.length - 1]; // Get the last added task
                // Add the task to the To-Do list in the UI
                const listItem = document.createElement('li');
                listItem.className = "flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200";
                listItem.innerHTML = `
                    <span>${taskObj.task}</span>
                    <div class="flex gap-2 space-x-2">
                        <button class="markCompleteButton bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">Complete</button>
                        <button class="deleteButton bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">Delete</button>
                    </div>
                `;
                if (savedTheme === 'dark') {
                    listItem.classList.add('dark');
                }
                todoList.appendChild(listItem);
                todoInput.value = ''; // Clear the input field
            } else {
                console.error('Failed to save task:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving task:', error);
        }
    }
});

// Load the task in To-Do list
async function loadTasks() {
    try {
        const response = await fetch('/api/getTodos');
        if (response.ok) {
            const { todos } = await response.json();

            // Populate the To-Do list with tasks from the server
            todos.forEach(taskObj => {
                const listItem = document.createElement('li');
                listItem.className = "flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition";
                listItem.innerHTML = `
                    <span>${taskObj.task}</span>
                    <div class="flex gap-2 space-x-2">
                        <button class="markCompleteButton bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">Complete</button>
                        <button class="deleteButton bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Delete</button>
                    </div>
                `;
                todoList.appendChild(listItem);
                if (savedTheme === 'dark') {
                    listItem.classList.add('dark');
                }
            });
        } else {
            console.error('Failed to fetch tasks:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// delete the task from todo list and remove it from json
todoList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('deleteButton')) {
        const taskItem = event.target.closest('li');
        const taskText = taskItem.querySelector('span').textContent;

        try {
            const response = await fetch('/api/deleteTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: taskText })
            });

            if (response.ok) {
                // Remove the task from the UI
                taskItem.remove();
                console.log('Task deleted successfully');
            } else {
                console.error('Failed to delete task:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
});
// code to mark the task as complete and remove it from backend and show it in recent activities
todoList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('markCompleteButton')) {
        const taskItem = event.target.closest('li');
        const taskText = taskItem.querySelector('span').textContent;

        try {
            // Remove the task from the To-Do list
            const deleteResponse = await fetch('/api/deleteTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: taskText })
            });

            if (deleteResponse.ok) {
                // Save the completed task to recentActivity.json
                const saveResponse = await fetch('/api/saveRecentActivity', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task: taskText })
                });

                if (saveResponse.ok) {
                    // Add the task to Recent Activities in the UI
                    const recentItem = document.createElement('li');
                    recentItem.className = "p-2 bg-gray-100 rounded-md shadow-sm";
                    recentItem.textContent = `Completed: ${taskText}`;
                    recentActivitiesList.appendChild(recentItem);
                    if (savedTheme === 'dark') {
                        recentItem.classList.add('dark');
                    }

                    // Strike through the task in the To-Do list
                    const taskSpan = taskItem.querySelector('span');
                    taskSpan.classList.add('line-through', 'text-gray-500');

                    // Disable the "Complete" button
                    const completeButton = taskItem.querySelector('.markCompleteButton');
                    completeButton.disabled = true;
                    completeButton.classList.add('opacity-50', 'cursor-not-allowed');


                    console.log('Task marked as complete and saved to recent activities');
                } else {
                    console.error('Failed to save task to recent activities:', saveResponse.statusText);
                }
            } else {
                console.error('Failed to delete task:', deleteResponse.statusText);
            }
        } catch (error) {
            console.error('Error marking task as complete:', error);
        }
    }
});
// Load recent activities on page load
async function loadRecentActivities() {
    try {
        const response = await fetch('/api/getRecentActivities');
        if (response.ok) {
            const { recentActivities } = await response.json();

            // Populate the Recent Activities section
            recentActivities.forEach(activity => {
                const recentItem = document.createElement('li');
                recentItem.className = "p-2 bg-gray-100 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-200";
                recentItem.textContent = `Completed: ${activity.task}`;
                recentActivitiesList.appendChild(recentItem);
                if (savedTheme === 'dark') {
                    recentItem.classList.add('dark');
                }
            });
        } else {
            console.error('Failed to fetch recent activities:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching recent activities:', error);
    }
}

// Call loadRecentActivities on page load
document.addEventListener('DOMContentLoaded', loadRecentActivities);
// Call loadTasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
