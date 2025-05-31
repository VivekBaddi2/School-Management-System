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

// Variables for event items
const eventItem = document.querySelectorAll('.eventItem');
const eventTitles = document.querySelectorAll('.eventTitle');
const eventDetails = document.querySelector('.eventDetails');
 
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
    // Apply dark mode to all event items
        const eventItems = document.querySelectorAll('.eventItem');
        eventItems.forEach(item => item.classList.add('dark'));

        eventDetails.classList.toggle('dark');
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
         // Remove dark mode from all event items
        const eventItems = document.querySelectorAll('.eventItem');
        eventItems.forEach(item => item.classList.remove('dark'));

        eventDetails.classList.remove('dark');
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

// Fetch and display events
async function loadEvents() {
    try {
        const response = await fetch('/api/getEvents');
        if (response.ok) {
            const { events } = await response.json();

            // Clear existing events
            const eventList = document.querySelector('.eventList');
            eventList.innerHTML = '';

            const isDarkMode = containerDiv.classList.contains('dark');

            // Display each event
            events.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'eventItem p-4 flex flex-col gap-2 border-2 rounded-2xl w-full lg:w-[20vw] min-w-[250px] h-[200px] border-violet-800 bg-white shadow-md text-gray-700';

                // Apply dark mode if the current theme is dark
                if (isDarkMode) {
                    eventItem.classList.add('dark');
                }

                const eventTitle = document.createElement('h3');
                eventTitle.className = 'eventTitle font-semibold text-lg text-white bg-violet-800 p-2 rounded-t-xl';
                eventTitle.textContent = event.title;

                const eventDescription = document.createElement('p');
                eventDescription.className = 'eventDescription  w-full h-[40%] p-2 overflow-hidden';
                eventDescription.textContent = event.description;

                const eventDate = document.createElement('p');
                eventDate.className = 'eventDate font-light text-sm text-gray-500 mt-2';
                eventDate.textContent = `Date: ${event.date}`;

                // Append event details to the event item
                eventItem.appendChild(eventTitle);
                eventItem.appendChild(eventDescription);
                eventItem.appendChild(eventDate);

                 // Add click event listener to display event details
                eventItem.addEventListener('click', () => {
                    displayEventDetails(event);
                });

                // Append the event item to the event details container
                eventList.appendChild(eventItem);

                
            });
          
        } else {
            console.error('Failed to fetch events:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Display event details in the eventDetails section
function displayEventDetails(event) {
    const eventDetails = document.querySelector('.eventDetails');
    eventDetails.classList.remove('hidden'); // Show the event details section
    eventDetails.innerHTML = ''; // Clear existing content

    const eventTitle = document.createElement('h3');
    eventTitle.className = 'text-4xl font-medium text-left';
    eventTitle.textContent = event.title;

    const eventDate = document.createElement('p');
    eventDate.className = 'text-md font-light text-left mt-4';
    eventDate.textContent = `Date: ${event.date}`;

    const eventDescription = document.createElement('p');
    eventDescription.className = 'text-lg text-left mt-4';
    eventDescription.textContent = event.description;

    

    // Append details to the eventDetails section
    eventDetails.appendChild(eventTitle);
    eventDetails.appendChild(eventDate);
    eventDetails.appendChild(eventDescription);

    

}

document.addEventListener('DOMContentLoaded', () => {
   
    loadEvents(); // Load events on page load

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