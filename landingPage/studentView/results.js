//  const jsPDF = require('jspdf'); // Import jsPDF library
const { jsPDF } = window.jspdf;
const autoTable = window.jspdf.autoTable;
 // JavaScript to toggle dark mode
 const switchButton=document.querySelectorAll('.darkLightSwitchButton');
 const containerDiv = document.getElementById('containerDiv');
 const navList = document.getElementById('navList');
 const dropDownSVG = document.getElementById('dropDownSVG');
 const dropdownMenu = document.getElementById('dropdownMenu');
 const hamburgerButton = document.getElementById('hamburgerButton');
 const rectangularNavBar = document.getElementById('rectangularNavBar');

 const firstSection = document.getElementById('firstSection');
 const secondSection = document.getElementById('secondSection');
 const form = document.querySelector('.form');
 const resultsContainer = document.querySelector('.resultsContainer');
const body=document.body;
// Javascript to handle the hamburger menu
hamburgerButton.addEventListener('click', () => {
    rectangularNavBar.classList.toggle('hidden'); // Toggle the 'hidden' class to show/hide the menu
});

 dropDownSVG.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden'); // Toggle the 'hidden' class
});
// Close dropdown menu when clicking outside
document.addEventListener('click', (event) => {
    if (!dropDownSVG.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }
    
});

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


function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark');
        containerDiv.classList.add('dark');
        navList.classList.add('dark');
        rectangularNavBar.classList.add('dark');
        dropdownMenu.classList.add('dark');
        firstSection.classList.add('dark');
        secondSection.classList.add('dark');
        form.classList.toggle('dark');
        resultsContainer.classList.toggle('dark');
        dropDownSVG.style.fill = "white";
        switchButton.innerText = 'Light Mode';
    } else {
        body.classList.remove('dark');
        containerDiv.classList.remove('dark');
        navList.classList.remove('dark');
        rectangularNavBar.classList.remove('dark');
        dropdownMenu.classList.remove('dark');
        firstSection.classList.remove('dark');
        secondSection.classList.remove('dark');
        form.classList.remove('dark');
        resultsContainer.classList.remove('dark');
        dropDownSVG.style.fill = "black";
        switchButton.innerText = 'Dark Mode';
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

// Auto-fill form data from local storage
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('studentNameInput').value = loggedInUser.name || '';
        document.getElementById('classInput').value = loggedInUser.studentClass || '';
        document.getElementById('rollNoInput').value = loggedInUser.id || '';
    } else {
        console.error('Logged-in user data not found in local storage.');
    }
});

// Backend
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const studentID = document.getElementById('rollNoInput').value.trim();
    const studentClass = document.getElementById('classInput').value.trim();
    const exam = document.getElementById('examNameSelect').value.trim();

    if (!studentID || !studentClass || !exam) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        // Send data to the backend
        const response = await fetch('/api/getStudentResults', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentID, studentClass, exam }),
        });

        if (response.ok) {
            const { result } = await response.json();

            console.log('Student results:', result);
            // Populate the secondSection table with the result
            populateResultsTable(result);
        } else {
            const { error } = await response.json();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error fetching student results:', error);
        alert('An error occurred while fetching the results.');
    }
});

// Function to populate the results table
function populateResultsTable(result) {
    secondSection.classList.remove('hidden');

    const studentName = document.getElementById('studentResultName');
    const studentRollNo = document.getElementById('studentRollNo');

    // Set student name and roll number
    studentName.innerText = result.studentName;
    studentRollNo.innerText = result.rollNo;

    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    let totalMarksObtained = 0;
    let totalMarks = 0;
    let failedSubjects=0, passedSubjects=0;
    result.subjectDetails.forEach(subject => {
        let percentage = ((subject.marksScored) / (subject.totalMarks)) * 100;
        let remarks = percentage >= 40 ? 'Pass' : 'Fail';
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="border border-violet-800 px-4 py-2">${subject.subjectName}</td>
            <td class="border border-violet-800 px-4 py-2">${subject.marksScored}</td>
            <td class="border border-violet-800 px-4 py-2">${subject.totalMarks}</td>
            <td class="border border-violet-800 px-4 py-2">${percentage}%</td>
            <td class="border border-violet-800 px-4 py-2">${remarks}</td>
        `;
        tableBody.appendChild(row);

        totalMarksObtained += Number(subject.marksScored);
        totalMarks += Number(subject.totalMarks);

        if (remarks === 'Pass') {
            passedSubjects++;
        } else {
            failedSubjects++;
        }
    });
    let overallPercentage = ((totalMarksObtained) / (totalMarks)) * 100;
    let overallRemarks = failedSubjects > 0 ? 'Fail' : 'Pass';

    document.getElementById('totalMarksObtained').innerText = totalMarksObtained;
    document.getElementById('totalMarksPossible').innerText = totalMarks;
    document.getElementById('overallPercentage').innerText = overallPercentage + '%';
    document.getElementById('overallRemark').innerText = overallRemarks;

    // Show the second section
}


document.getElementById('downloadResultButton').addEventListener('click', () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Student Results', 10, 10);

    // Add student details
    const studentName = document.getElementById('studentNameInput').value;
    const studentClass = document.getElementById('classInput').value;
    const studentID = document.getElementById('rollNoInput').value;

    doc.setFontSize(12);
    doc.text(`Name: ${studentName}`, 10, 20);
    doc.text(`Class: ${studentClass}`, 10, 30);
    doc.text(`ID: ${studentID}`, 10, 40);

    // Prepare table data
    const tableBody = document.querySelector('#resultsTable tbody');
    const tableData = [];
    tableBody.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = [
            cells[0].innerText, // Subject Name
            cells[1].innerText, // Marks Scored
            cells[2].innerText, // Total Marks
            cells[3].innerText, // Percentage
            cells[4].innerText  // Remarks
        ];
        tableData.push(rowData);
    });

    // Add table using autoTable plugin
    doc.autoTable({
        startY: 50, // Start position below the student details
        head: [['Subject', 'Marks Scored', 'Total Marks', 'Percentage', 'Remarks']], // Table headers
        body: tableData, // Table data
        theme: 'grid', // Table theme
        headStyles: {
            fillColor: [94, 14, 192], // Purple header background
            textColor: [255, 255, 255], // White text color
            fontSize: 12,
            halign: 'center'
        },
        bodyStyles: {
            fontSize: 10,
            halign: 'center'
        },
        styles: {
            cellPadding: 4,
            lineWidth: 0.1
        }
    });

    // Add overall results summary
    const totalMarksObtained = document.getElementById('totalMarksObtained').innerText;
    const totalMarksPossible = document.getElementById('totalMarksPossible').innerText;
    const overallPercentage = document.getElementById('overallPercentage').innerText;
    const overallRemark = document.getElementById('overallRemark').innerText;

    doc.text(`Total Marks Obtained: ${totalMarksObtained}`, 10, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Marks Possible: ${totalMarksPossible}`, 10, doc.lastAutoTable.finalY + 20);
    doc.text(`Overall Percentage: ${overallPercentage}`, 10, doc.lastAutoTable.finalY + 30);
    doc.text(`Overall Remark: ${overallRemark}`, 10, doc.lastAutoTable.finalY + 40);

    // Save the PDF
    doc.save('Student_Results.pdf');
});