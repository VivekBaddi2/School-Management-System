const body = document.body;
const containerDiv = document.getElementById('containerDiv');
const hamburgerButton = document.getElementById('hamburgerButton');
const rectangularNavBar = document.getElementById('rectangularNavBar');
const switchButton = document.querySelectorAll('.darkLightSwitchButton');
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
const dropDownContent = document.querySelectorAll(".dropdownContent");

// totalSudents section
const totalStudentsDiv = document.getElementById('totalStudentsDiv');

// Upcoming Events Section
const upcomingEventsDiv = document.getElementById('upcomingEventsDiv');

// To-Do Section
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoSection = document.getElementById('todoSection');

// Recent Activities Section
const recentActivitiesSection = document.getElementById('recentActivitiesSection');
const recentActivitiesDiv = document.getElementById('recentActivitiesDiv');
const recentActivitiesList = document.getElementById('recentActivitiesList');
// Salary Details Section
const salaryDetailsDiv = document.getElementById('salaryDetailsDiv');

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
studentItem.forEach(item => {
    item.addEventListener("click", (event) => {
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
        totalStudentsDiv.classList.add('dark');
        upcomingEventsDiv.classList.add('dark');
        recentActivitiesSection.classList.add('dark');
        recentActivitiesDiv.classList.add('dark');
        recentActivitiesList.classList.add('dark');
        todoSection.classList.add('dark');
        todoInput.classList.add('dark');
        salaryDetailsDiv.classList.add('dark');

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
        totalStudentsDiv.classList.remove('dark');
        upcomingEventsDiv.classList.remove('dark');
        recentActivitiesSection.classList.remove('dark');
        recentActivitiesDiv.classList.remove('dark');
        recentActivitiesList.classList.remove('dark');
        todoSection.classList.remove('dark');
        todoInput.classList.remove('dark');
        salaryDetailsDiv.classList.remove('dark');
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


// To-Do Section: Add a new task
todoForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const taskText = todoInput.value.trim();
    if (taskText === '') return;

    try {
        const response = await fetch('/api/teacher/saveTodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: taskText }),
        });

        if (response.ok) {
            console.log('Task saved successfully');
            addTaskToUI(taskText); // Add the task to the UI
        } else {
            console.error('Failed to save task:', response.statusText);
        }
    } catch (error) {
        console.error('Error saving task:', error);
    }

    todoInput.value = ''; // Clear the input field
});



// Add a task to the UI
function addTaskToUI(taskText) {
    const listItem = document.createElement('li');
    listItem.className = 'flex flex-col md:flex-row items-center justify-between gap-2 p-2 border border-gray-300 rounded-md shadow-sm';

    // Task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.className = 'flex-1';

    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'flex gap-2 items-center justify-center md:justify-end flex-shrink-0';

    // Complete button
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.className = 'bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400';
    completeButton.addEventListener('click', async () => {
        taskSpan.classList.toggle('line-through');
        taskSpan.classList.toggle('text-gray-500');

      if (taskSpan.classList.contains('line-through')) {
        try {
            // Save the task as a recent activity
            const saveActivityResponse = await fetch('/api/teacher/saveRecentActivity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activity: `Completed: ${taskText}` }),
            });

            if (saveActivityResponse.ok) {
                console.log('Activity saved successfully');
                addRecentActivityToUI(`Completed: ${taskText}`);
            } else {
                console.error('Failed to save activity:', saveActivityResponse.statusText);
            }

            // Delete the task from the JSON file
            const deleteTaskResponse = await fetch('/api/teacher/deleteTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: taskText }),
            });

            if (deleteTaskResponse.ok) {
                console.log('Task deleted successfully from JSON file');
                listItem.remove(); // Remove the task from the UI
            } else {
                console.error('Failed to delete task from JSON file:', deleteTaskResponse.statusText);
            }
        } catch (error) {
            console.error('Error handling complete button:', error);
        }
    }

    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400';
    deleteButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/teacher/deleteTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: taskText }),
            });

            if (response.ok) {
                console.log('Task deleted successfully');
                listItem.remove(); // Remove the task from the UI
            } else {
                console.error('Failed to delete task:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    });

    // Append buttons to the container
    buttonsContainer.appendChild(completeButton);
    buttonsContainer.appendChild(deleteButton);

    // Append elements to the list item
    listItem.appendChild(taskSpan);
    listItem.appendChild(buttonsContainer);

    // Append the list item to the To-Do list
    todoList.appendChild(listItem);
}

// Load To-Do tasks from the backend
async function loadTodos() {
    try {
        const response = await fetch('/api/teacher/getTodos');
        if (response.ok) {
            const { todos } = await response.json();
            todos.forEach((todo) => addTaskToUI(todo.task));
        } else {
            console.error('Failed to fetch To-Do tasks:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching To-Do tasks:', error);
    }
}

// Add a recent activity to the UI
function addRecentActivityToUI(activityText) {
    const recentActivityItem = document.createElement('li');
    recentActivityItem.className = 'p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100';
    recentActivityItem.textContent = activityText;
    recentActivitiesList.appendChild(recentActivityItem);
    if(body.classList.contains('dark')) {
        recentActivityItem.classList.add('dark');
    }
}

// Load Recent Activities from the backend
async function loadRecentActivities() {
    try {
        const response = await fetch('/api/teacher/getRecentActivities');
        if (response.ok) {
            const { recentActivities } = await response.json();
            recentActivities.forEach((activity) => addRecentActivityToUI(activity.activity));
        } else {
            console.error('Failed to fetch recent activities:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching recent activities:', error);
    }
}

// Clear Recent Activities
clearRecentActivitiesButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/teacher/clearRecentActivities', {
            method: 'POST',
        });

        if (response.ok) {
            console.log('Recent activities cleared successfully');
            recentActivitiesList.innerHTML = ''; // Clear all recent activities from the UI
        } else {
            console.error('Failed to clear recent activities:', response.statusText);
        }
    } catch (error) {
        console.error('Error clearing recent activities:', error);
    }
});
// Load Total Students Count
async function loadTotalStudents() {
    try {
        const response = await fetch('/api/getCounts');
        if (response.ok) {
            const { studentCount } = await response.json();

            // Update the Total Students section in the UI
            document.getElementById('totalStudentsText').textContent = `${studentCount}`;
        } else {
            console.error('Failed to fetch total students count:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching total students count:', error);
    }
}

// Load Total Events Count
async function loadTotalEvents() {
    try {
        const response = await fetch('/api/getTotalEvents');
        if (response.ok) {
            const { totalEvents } = await response.json();

            // Update the Upcoming Events section in the UI
            const upcomingEventsDiv = document.getElementById('upcomingEventsDiv');
            upcomingEventsDiv.querySelector('p').textContent = totalEvents;
        } else {
            console.error('Failed to fetch total events count:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching total events count:', error);
    }
}
// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    loadRecentActivities();
    loadTotalStudents();
    loadTotalEvents();

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



