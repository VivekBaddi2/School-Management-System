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


const classSelection = document.getElementById('classSelection');
const teacherSelection = document.getElementById('teacherSelection');

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



// JavaScript to display chart
// Select the canvas element
const ctx = document.getElementById('lineChart').getContext('2d');

// Data for the chart
const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Months on x-axis
    datasets: [{
        label: 'Teacher Attendance Percentage',
        data: [85, 90, 78, 88, 92, 95, 80, 85, 87, 90, 93, 96], // Percentage values for each month
        borderColor: '#7c3aed', // Line color
        backgroundColor: 'rgba(124, 58, 237, 0.1)', // Fill color under the line
        borderWidth: 2, // Line thickness
        tension: 0.4, // Smoothness of the line
        pointBackgroundColor: '#7c3aed', // Violet-800 for points
        pointBorderColor: '#7c3aed',
        pointRadius: 4,
    }]
};

// Configuration for the chart
const config = {
    type: 'line', // Line chart
    data: data,
    options: {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Allow the chart to grow in height
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                    color: '#4b5563', // Gray text
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    color: '#4b5563' // Gray text
                },
                grid: {
                    color: '#e5e7eb', // Light gray grid lines for X-axis
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Percentage',
                    color: '#4b5563', // Gray text
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    color: '#4b5563', // Gray text
                    stepSize: 10, // Increment by 10
                    beginAtZero: true,
                    max: 100 // Maximum value
                },
                min: 10, // Minimum value for Y-axis
                grid: {
                    color: '#e5e7eb', // Light gray grid lines for y-axis
                }
            }
        }
    }
};

// Render the chart
lineChart=new Chart(ctx, config);


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
        classSelection.classList.add('dark');
        teacherSelection.classList.add('dark');
        // Update chart grid line color for dark mode
         lineChart.options.scales.x.grid.color = '#1c1c1c'; // Dark gray grid lines for X-axis
         lineChart.options.scales.y.grid.color = '#1c1c1c'; // Dark gray grid lines for Y-axis
         lineChart.update(); // Apply the changes to the chart
      
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
        classSelection.classList.remove('dark');
        teacherSelection.classList.remove('dark');
         // Update chart grid line color for light mode
         lineChart.options.scales.x.grid.color = '#e5e7eb'; // Light gray grid lines for X-axis
         lineChart.options.scales.y.grid.color = '#e5e7eb'; // Light gray grid lines for Y-axis
         lineChart.update(); // Apply the changes to the chart
    
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