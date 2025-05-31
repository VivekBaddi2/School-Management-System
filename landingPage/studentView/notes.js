 // JavaScript to toggle dark mode
 const switchButton=document.querySelectorAll('.darkLightSwitchButton');
 const containerDiv = document.getElementById('containerDiv');
 const navBar = document.getElementById('navBar');
 const hamburgerButton = document.getElementById('hamburgerButton');
 const rectangularNavBar = document.getElementById('rectangularNavBar');
 const dropDownSVG = document.getElementById('dropDownSVG');
 const dropdownMenu = document.getElementById('dropdownMenu');
 const cards = document.querySelectorAll('.card'); // Use querySelectorAll to select all cards
 const body=document.body;
 const subContainer=document.getElementById('subContainer');

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
    const cards=document.querySelectorAll('.card');
    
    if (theme === 'dark') {
        body.classList.add('dark');
        containerDiv.classList.add('dark');
        navList.classList.add('dark');
        dropdownMenu.classList.add('dark');
        rectangularNavBar.classList.add('dark');
        cards.forEach(card => card.classList.add('dark'));
        dropDownSVG.style.fill = "white";
        switchButton.innerText = 'Light Mode';
    } else {
        body.classList.remove('dark');
        containerDiv.classList.remove('dark');
        navList.classList.remove('dark');
        dropdownMenu.classList.remove('dark');
        rectangularNavBar.classList.remove('dark');
        cards.forEach(card => card.classList.remove('dark'));
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


// Fetch Notes backend
// Function to fetch and display notes
async function loadNotes() {
    try {
        // Get the logged-in student's class from local storage
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const studentClass = loggedInUser?.studentClass;
        // Check if studentClass is available        
        if (!studentClass) {
            console.error('Student class not found in local storage.');
            return;
        }
        console.log('Student class:', studentClass);
        const response = await fetch('/api/getNotes');
        if (response.ok) {
            const { notes } = await response.json();

            // Clear existing cards
            subContainer.innerHTML = '';

            // Filter notes based on the student's class
            const filteredNotes = notes.filter(note => note.className === studentClass);
            console.log('Filtered notes:', filteredNotes);

            // Create cards for each filtered note
            filteredNotes.forEach(note => {
                const card = document.createElement('div');
                
                card.className = 'card w-[300px] h-[400px] border-violet-800 border-2 rounded-2xl shadow-lg bg-white flex flex-col justify-center items-center gap-4 p-4 m-4';

                card.innerHTML = `
                    <div class="cardImage w-full h-60 overflow-hidden rounded-t-xl " id="cardImage">
                        <img src=${note.thumbnail} alt="thumbnail" class="w-full h-full object-cover">
                    </div>
                    <div class="cardTitle" id="cardTitle">
                        <h3 class="text-2xl font-medium text-violet-800">${note.subjectTitle}</h3>
                    </div>
                    <div class="cardBody overflow-hidden text-wrap" id="cardBody">
                        <p class="text-gray-700 text-sm">${note.description}</p>
                    </div>
                    <div class="downloadButton" id="downloadButtonDiv">
                        <a href="${note.downloadLink}" target="_blank" class="text-blue-500 underline">
                        <button class="downloadButton hover:text-violet-800 hover:cursor-pointer border-2 rounded-2xl p-1 pl-2 pr-2" id="downloadButton">
                                Download
                            </button>
                        </a>
                    </div>
                   
                `;

                subContainer.appendChild(card);
            });

             // If no notes are found for the class, display a message
            if (filteredNotes.length === 0) {
                subContainer.innerHTML = `<p class="text-gray-500 text-center">No notes available for your class.</p>`;
            }

             // Reapply the current theme to the dynamically added cards
            const savedTheme = localStorage.getItem('theme') || 'light';
            applyTheme(savedTheme);
        } else {
            const { error } = await response.json();
            console.error(`Error fetching notes: ${error}`);
        }
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}

// Call the function to load notes on page load
document.addEventListener('DOMContentLoaded', loadNotes);