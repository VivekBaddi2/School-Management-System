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

const eventItem = document.querySelectorAll('.eventItem');
const eventTitles = document.querySelectorAll('.eventTitle');
const eventDetails = document.getElementById('eventDetails');

const addEventButton = document.getElementById('addEventButton'); // Button to open the form
const eventList = document.getElementById('eventList'); // Container for event items
const popupForm = document.getElementById('popupForm'); // Popup form container
const saveButton = document.getElementById('saveButton'); // Save button in the form
const cancelButton = document.getElementById('cancelButton'); // Cancel button in the form
const eventTitleInput = document.getElementById('eventTitleInput'); // Input for event title
const eventDescriptionInput = document.getElementById('eventDescriptionInput'); // Input for event description
const eventDateInput = document.getElementById('eventDateInput'); // Input for event date

const feePaymentDropDownToggle = document.querySelectorAll('.feePaymentDropDownToggle');
const feePaymentsDropdownMobile = document.getElementById('feePaymentsDropdownMobile');
const feePaymentsDropdown = document.getElementById('feePaymentsDropdown');

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
        document.querySelectorAll('.eventItem').forEach(item => {
                    item.classList.add('dark');
                });        
        eventDetails.classList.add('dark');
        popupForm.firstElementChild.classList.add('dark');
        popupForm.querySelectorAll('input, textarea, button, label').forEach(el => el.classList.add('dark'));
        const popupFormHeading = document.getElementById('popupFormHeading');
        popupFormHeading.classList.add('dark');
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
 document.querySelectorAll('.eventItem').forEach(item => {
                    item.classList.remove('dark');
                });                
        eventDetails.classList.remove('dark');
         popupForm.firstElementChild.classList.remove('dark');
        popupForm.querySelectorAll('input, textarea, button, label').forEach(el => el.classList.remove('dark'));
        const popupFormHeading = document.getElementById('popupFormHeading');
        popupFormHeading.classList.remove('dark');
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


// Show the popup form when the addEventButton is clicked
addEventButton.addEventListener('click', () => {
    popupForm.classList.remove('hidden'); // Show the form
    popupForm.classList.add('flex'); // Add flex class to make it visible
});

// Handle the save button click
saveButton.addEventListener('click', async () => {
    const title = eventTitleInput.value.trim();
    const description = eventDescriptionInput.value.trim();
    const date = eventDateInput.value.trim();

    if (title && description && date) {
        try {
            // Send the event data to the backend
            const response = await fetch('/api/saveEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, date })
            });

            if (response.ok) {
                console.log('Event saved successfully');
                resetForm(); // Reset and close the form
            } else {
                console.error('Failed to save event:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving event:', error);
        }
        // Create a new event item
        const newEventItem = document.createElement('div');
        newEventItem.classList.add("eventItem", "p-4", "flex", "flex-col", "gap-2", "border-2", "rounded-2xl", "w-250px", "lg:w-[20vw]", "h-[200px]", "border-violet-800", "bg-white", "shadow-md", "text-gray-700");
        if (body.classList.contains('dark')) {
            newEventItem.classList.add('dark'); // Apply dark mode styling if active
        }

        // Add content to the new event item
        newEventItem.innerHTML = ` 
            <div class="eventTitle font-semibold text-lg text-white bg-violet-800 p-2 rounded-t-xl">
                <p class="truncate">${title}</p>
            </div>
            <div class="eventBody w-full h-[40%] p-2 overflow-hidden">
                <p class="text-sm">
                  ${description}
                </p>
            </div>
            <div class="datePosted font-light text-sm text-gray-500 mt-2">
                <p>Posted on: <span class="font-medium">${date}</span></p>
            </div>`;

        // Append the new event item to the event list
        eventList.insertAdjacentElement('afterbegin', newEventItem);

        // add dark mode class if active
        // if (body.classList.contains('dark')) {
        //     newEventItem.classList.add('dark'); // Apply dark mode styling if active
        // }
        // Reset and close the form
        resetForm();
    } else {
        alert('Please fill in all fields before saving.');
    }
});

// Handle the cancel button click
cancelButton.addEventListener('click', () => {
    resetForm(); // Reset and close the form
});

// Function to reset and close the form
function resetForm() {
    eventTitleInput.value = '';
    eventDescriptionInput.value = '';
    eventDateInput.value = '';
    popupForm.classList.add('hidden'); // Hide the form
}


// When an event item is clicked, show the details
function updateEventDetails(eventItem) {
    const title = eventItem.querySelector('.eventTitle p').textContent;
    const description = eventItem.querySelector('.eventBody p').textContent;
    const date = eventItem.querySelector('.datePosted span').textContent;
    eventDetails.classList.remove('hidden'); // Show the event details box
    // Update the eventDetailsBox content
    eventDetails.innerHTML = `
        <h3 class="text-4xl font-medium text-left">${title}</h3>
        <p class="text-md font-light text-left mt-4 ">Posted on: ${date}</p>
        <p class="text-lg text-left mt-4">${description}</p>
    `;
}

// Add click event listener to dynamically created event items
eventList.addEventListener('click', (event) => {
    const clickedItem = event.target.closest('.eventItem'); // Check if the clicked element is inside an eventItem
    if (clickedItem) {
        updateEventDetails(clickedItem); // Update the eventDetailsBox with the clicked item's details
    }
});

// Fetch and display events
async function loadEvents() {
    try {
        const response = await fetch('/api/getEvents');
        if (response.ok) {
            const { events } = await response.json();

            // Populate the event list
            events.forEach(event => {
                const newEventItem = document.createElement('div');
                newEventItem.classList.add("eventItem", "p-4", "flex", "flex-col", "gap-2", "border-2", "rounded-2xl", "w-250px", "lg:w-[20vw]", "h-[200px]", "border-violet-800", "bg-white", "shadow-md", "text-gray-700");
                if (body.classList.contains('dark')) {
                    newEventItem.classList.add('dark'); // Apply dark mode styling if active
                }

                // Add content to the new event item
                newEventItem.innerHTML = ` 
                    <div class="eventTitle font-semibold text-lg text-white bg-violet-800 p-2 rounded-t-xl">
                        <p class="truncate">${event.title}</p>
                    </div>
                    <div class="eventBody w-full h-[40%] p-2 overflow-hidden">
                        <p class="text-sm">
                          ${event.description}
                        </p>
                    </div>
                    <div class="datePosted font-light text-sm text-gray-500 mt-2">
                        <p>Posted on: <span class="font-medium">${event.date}</span></p>
                    </div>`;

                // Append the new event item to the event list
                eventList.insertAdjacentElement('afterbegin', newEventItem);
            });
        } else {
            console.error('Failed to fetch events:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Call loadEvents on page load
document.addEventListener('DOMContentLoaded', loadEvents);
