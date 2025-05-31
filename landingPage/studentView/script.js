//  const switchButton = document.getElementById('darkLightSwitchButton');
//  const switchButtonMobile = document.getElementById('darkLightSwitchButtonMobile');
const switchButton=document.querySelectorAll('.darkLightSwitchButton');
 const navList = document.getElementById('navList');
 const containerDiv = document.getElementById('containerDiv');
 const hamburgerButton = document.getElementById('hamburgerButton');
 const rectangularNavBar = document.getElementById('rectangularNavBar');
 const navBar = document.getElementById('navBar');
 const dropDownSVG = document.getElementById('dropDownSVG');
 const dropdownMenu = document.getElementById('dropdownMenu');
 const attendanceRateDiv = document.getElementById('attendanceRateDiv');
 const averageGradeDiv = document.getElementById('averageGradeDiv');
 const attendanceGraphDiv = document.getElementById('attendanceGraphDiv');
 const body = document.body;

// update student name and profile picture in navbar from localStorage

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        const profileImage = document.getElementById('profileImage');
        const studentNameText = document.getElementById('studentNameText');

        if (profileImage && loggedInUser.profileImage) {
            profileImage.src = loggedInUser.profileImage; 
        }

        if (studentNameText && loggedInUser.name) {
            studentNameText.innerText = loggedInUser.name;
        }
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

// Javascript to handle the attendance graph
// Select the canvas element
const ctx = document.getElementById('lineChart').getContext('2d');

// Create the line chart
const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // X-axis labels
        datasets: [{
            label: 'Attendance Percentage',
            data: [87, 90, 85, 88, 92, 95, 89, 93, 91, 94, 96, 97], // Y-axis data
            borderColor: '#7c3aed', // Violet-800 color
            backgroundColor: 'rgba(124, 58, 237, 0.1)', // Light violet background
            borderWidth: 2,
            tension: 0.4, // Smooth curve
            pointBackgroundColor: '#7c3aed', // Violet-800 for points
            pointBorderColor: '#7c3aed',
            pointRadius: 4,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
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
                // max: 100, // Maximum value for Y-axis
                grid: {
                    color: '#e5e7eb', // Light gray grid lines for y-axis
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#4b5563' // Gray text
                }
            }
        }
    }
});


 // JavaScript to toggle dark mode

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark');
        containerDiv.classList.add('dark');
        navList.classList.add('dark');
        rectangularNavBar.classList.add('dark');
        dropdownMenu.classList.add('dark');
        attendanceRateDiv.classList.toggle('dark');
        averageGradeDiv.classList.toggle('dark');
        attendanceGraphDiv.classList.toggle('dark');
        dropDownSVG.style.fill = "white";
        switchButton.forEach(button => {
            button.innerText = "Light Mode"; // Change text color to white
        });

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
        attendanceRateDiv.classList.remove('dark');
        averageGradeDiv.classList.remove('dark');
        attendanceGraphDiv.classList.remove('dark');
        dropDownSVG.style.fill = "black";
        switchButton.forEach(button => {
            button.innerText = "Dark Mode"; // Change text color to white
        });
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

// Backend
// Function to calculate and display attendance rate
// async function loadAttendanceRate() {
//     try {
//         // Get the logged-in student's ID from local storage
//         const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//         const studentId = loggedInUser?.id;

//         if (!studentId) {
//             console.error('Student ID not found in local storage.');
//             return;
//         }

//         // Get the current month and year
//         const currentDate = new Date();
//         const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
//         const currentYear = currentDate.getFullYear();

//         // Fetch attendance data from the backend
//         const response = await fetch('/api/getMonthlyAttendance', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ studentId, month: currentMonth, year: currentYear }),
//         });

//         if (response.ok) {
//             const { attendance } = await response.json();

//             // Count the number of "Present" days
//             const daysPresent = attendance.filter(record => record.attendance === 'Present').length;

//             // Calculate the attendance rate
//             const workingDays = 25; // Number of working days per month
//             const attendanceRate = ((daysPresent / workingDays) * 100);

//             // Display the attendance rate
//             document.getElementById('attendanceRateValue').innerText = `${attendanceRate}%`;
//         } else {
//             const { error } = await response.json();
//             console.error(`Error fetching attendance data: ${error}`);
//             document.getElementById('attendanceRateValue').innerText = 'N/A';
//         }
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         document.getElementById('attendanceRateValue').innerText = 'N/A';
//     }
// }

// Helper function to animate counting from 0 to target value
function animateCount(element, target, duration = 1500) {
    let start = 0;
    const increment = target / (duration / 30);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.innerText = target.toFixed(0) + '%';
            clearInterval(timer);
        } else {
            element.innerText = start.toFixed(0) + '%';
        }
    }, 20);
}

// Modified function to calculate and display attendance rate with animation
async function loadAttendanceRate() {
    try {
        // Get the logged-in student's ID from local storage
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const studentId = loggedInUser?.id;

        if (!studentId) {
            console.error('Student ID not found in local storage.');
            return;
        }

        // Get the current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
        const currentYear = currentDate.getFullYear();

        // Fetch attendance data from the backend
        const response = await fetch('/api/getMonthlyAttendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentId, month: currentMonth, year: currentYear }),
        });

        if (response.ok) {
            const { attendance } = await response.json();

            // Count the number of "Present" days
            const daysPresent = attendance.filter(record => record.attendance === 'Present').length;

            // Calculate the attendance rate
            const workingDays = 25; // Number of working days per month
            const attendanceRate = ((daysPresent / workingDays) * 100);

            // Animate the attendance rate display
            const attendanceRateElement = document.getElementById('attendanceRateValue');
            animateCount(attendanceRateElement, attendanceRate);

            if(attendanceRate>=75){
                document.getElementById('attendanceRateQuote').innerText="Keep up the great work! Your attendance is above average."
            }
            else if(attendanceRate>=50 && attendanceRate<75){
                document.getElementById('attendanceRateQuote').innerText="You're doing okay, but you can do better";
            }
            else{
                document.getElementById('attendanceRateQuote').innerText="You need to improve your attendance rate";
            }
        } else {
            const { error } = await response.json();
            console.error(`Error fetching attendance data: ${error}`);
            document.getElementById('attendanceRateValue').innerText = 'N/A';
        }
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        document.getElementById('attendanceRateValue').innerText = 'N/A';
    }
}

// New function to load student results, calculate percentage and assign grades
async function loadStudentResults() {
    try {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const studentId = loggedInUser?.id;
        const studentClass = loggedInUser?.className || loggedInUser?.studentClass; // try both keys
        const exam = "Midterm"; // Hardcoded exam name as per example data

        if (!studentId || !studentClass) {
            console.error('Student ID or class not found in local storage.');
            return;
        }

        const response = await fetch('/api/getStudentResults', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentID: studentId, studentClass: studentClass, exam: exam }),
        });

        if (response.ok) {
            const data = await response.json();
            const result = data.result;

            if (!result || !result.subjectDetails || result.subjectDetails.length === 0) {
                console.error('No subject details found in the result.');
                return;
            }

            let totalMarks = 0;
            let marksScored = 0;

            result.subjectDetails.forEach(subject => {
                totalMarks += Number(subject.totalMarks);
                marksScored += Number(subject.marksScored);
            });

            const percentage = (marksScored / totalMarks) * 100;

            
            // Assign grade based on percentage to averageGradeValue element
            const averageGradeElement = document.getElementById('averageGradeValue');
            let grade = '';
            let quote = '';

            if (percentage >= 90) {
                grade = 'A+';
                quote = "Excellent work! You're a star student!";
            } else if (percentage >= 80) {
                grade = 'A';
                quote = "Great job! You're doing really well!";
            } else if (percentage >= 70) {
                grade = 'B+';
                quote = "Good job! Keep up the good work!";
            } else if (percentage >= 60) {
                grade = 'B';
                quote = "You're doing well, but there's room for improvement.";
            } else if (percentage >= 50) {
                grade = 'C+';
                quote = "You're passing, but you can do better.";
            } else if (percentage >= 40) {
                grade = 'C';
                quote = "You're close to passing, but you need to work harder.";
            } else {
                grade = 'F';
                quote = "Unfortunately, you didn't pass. Don't give up!";
            }

            averageGradeElement.innerText = grade;
            document.getElementById('averageGradeQuote').innerText = quote;

        } else {
            console.error('Failed to fetch student results.');
        }
    } catch (error) {
        console.error('Error fetching student results:', error);
    }
}


// New function to fetch attendance data for all months and update the attendance graph
async function fetchAndUpdateAttendanceGraph() {
    try {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const studentId = loggedInUser?.id;

        if (!studentId) {
            console.error('Student ID not found in local storage.');
            return;
        }

        const currentYear = new Date().getFullYear();

        // Array to hold attendance percentages for each month
        const monthlyAttendancePercentages = [];

        // Number of working days per month (assumed constant)
        const workingDays = 25;

        // Fetch attendance for each month
        for (let month = 1; month <= 12; month++) {
            const response = await fetch('/api/getMonthlyAttendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId, month, year: currentYear }),
            });

            if (response.ok) {
                const { attendance } = await response.json();

                // Count the number of "Present" days
                const daysPresent = attendance.filter(record => record.attendance === 'Present').length;

                // Calculate attendance percentage for the month
                const attendancePercentage = (daysPresent / workingDays) * 100;

                monthlyAttendancePercentages.push(attendancePercentage);
            } else {
                console.error(`Failed to fetch attendance for month ${month}`);
                monthlyAttendancePercentages.push(0); // Push 0 if fetch fails
            }
        }

        // Update the chart data and refresh the chart
        lineChart.data.datasets[0].data = monthlyAttendancePercentages;
        lineChart.update();

    } catch (error) {
        console.error('Error fetching and updating attendance graph:', error);
    }
}

// Call the functions to load attendance rate, student results, and update attendance graph on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAttendanceRate();
    loadStudentResults();
    fetchAndUpdateAttendanceGraph();
});


