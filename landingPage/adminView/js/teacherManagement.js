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

const searchBoxDiv = document.querySelector('.searchBoxDiv');
const searchBox=document.getElementById('searchBox');
const teacherDetailsCard=document.querySelectorAll('.teacherDetailsCard');

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
        searchBox.classList.add('dark');
        teacherDetailsCard.forEach(card =>{
            card.classList.add('dark');
        })
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
        searchBox.classList.remove('dark');
        teacherDetailsCard.forEach(card =>{
            card.classList.remove('dark');
        })
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
// Add search functionality
searchBox.addEventListener('input', () => {
    const searchQuery = searchBox.value.toLowerCase(); // Get the search query in lowercase
    const teacherCards = document.querySelectorAll('.teacherDetailsCard'); // Select all teacher cards

    teacherCards.forEach(card => {
        const teacherName = card.querySelector('.teacherNameText').textContent.toLowerCase(); // Get teacher name
        const teacherDept = card.querySelector('.teacherDeptText').textContent.toLowerCase(); // Get teacher department
        const teacherId = card.querySelector('.teacherIdText').textContent.toLowerCase(); // Get teacher ID

        // Check if the search query matches any of the fields
        if (
            teacherName.includes(searchQuery) ||
            teacherDept.includes(searchQuery) ||
            teacherId.includes(searchQuery)
        ) {
            card.style.display = 'flex'; // Show the card if it matches
        } else {
            card.style.display = 'none'; // Hide the card if it doesn't match
        }
    });
});

async function loadTeachers() {
    try {
        const response = await fetch('/api/getTeachers');
        if (response.ok) {
            const { teachers } = await response.json();

            // Populate the teacher details in the UI
            teachers.forEach(teacher => {
                const teacherCard = document.createElement('div');
                teacherCard.className = "teacherDetailsCard bg-white flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 border-1 border-violet-800 rounded-2xl w-full h-fit md:h-[80px] mx-auto p-4";
                teacherCard.innerHTML = `
                <div class="flex flex-col md:flex-row gap-4 md:items-center w-[80%] h-fit md:h-[80px]">

                <div class="teacherIdDiv flex items-center border-1 border-violet-500 rounded-2xl md:w-[20%] w-full h-full md:h-[50%] md:ml-4 p-2"
                data-id="${teacher.id}" id="teacherIdDiv">
                        <p class="teacherIdText ml-2" id="teacherIdText">${teacher.id}</p>
                    </div>
                    <div class="teacherNameDiv flex items-center border-1 border-violet-500 rounded-2xl md:w-[30%] w-full h-full md:h-[50%] p-2"
                        id="teacherNameDiv">
                        <p class="teacherNameText ml-2" id="teacherNameText">${teacher.name}</p>
                    </div>
                    <div class="teacherDeptDiv flex items-center border-1 border-violet-500 rounded-2xl md:w-[30%] w-full h-full md:h-[50%] p-2"
                        id="teacherDeptDiv">
                        <p class="teacherDeptText ml-2" id="teacherDeptText">${teacher.department}</p>
                    </div>
                </div>
                <div class="deleteBtnDiv mr-4">
                    <button data-id="${teacher.id}"
                        class="deleteTeacherBtn bg-red-600 hover:bg-red-500 rounded-xl text-white font-bold  p-4 pt-1 pb-1 h-full cursor-pointer">Delete</button>
                </div>
                `;
                if(savedTheme === 'dark'){
                    teacherCard.classList.add('dark');
                }
                searchBoxDiv.insertAdjacentElement("afterend",teacherCard);
            });

            // Add event listeners to delete buttons
            document.querySelectorAll('.deleteTeacherBtn').forEach(button => {
                button.addEventListener('click', deleteTeacher);
            });
        } else {
            console.error('Failed to fetch teachers:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
}

async function deleteTeacher(event) {
    const teacherId = event.target.getAttribute('data-id'); // Ensure this matches the `id` field in the JSON file

    if (!teacherId) {
        console.error('Teacher ID is required to delete the teacher.');
        return;
    }

    try {
        // Send a request to delete the teacher from the backend
        const response = await fetch('/api/deleteTeacher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ teacherId })
        });

        if (response.ok) {
            console.log('Teacher deleted successfully');

            // Remove the teacher card from the UI
            event.target.closest('.teacherDetailsCard').remove();
        } else {
            const errorData = await response.json();
            console.error('Failed to delete teacher:', errorData.error || response.statusText);
        }
    } catch (error) {
        console.error('Error deleting teacher:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadTeachers);