 // JavaScript to toggle dark mode
 const switchButton=document.querySelectorAll('.darkLightSwitchButton');
 const containerDiv = document.getElementById('containerDiv');
 const navBar = document.getElementById('navBar');
 const hamburgerButton = document.getElementById('hamburgerButton');
 const rectangularNavBar = document.getElementById('rectangularNavBar');
 const dropDownSVG = document.getElementById('dropDownSVG');
 const dropdownMenu = document.getElementById('dropdownMenu');
 const form = document.querySelector('.form');
 const firstSection = document.getElementById('firstSection');
 const secondSection = document.getElementById('secondSection');
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
        dropdownMenu.classList.add('dark');
        rectangularNavBar.classList.add('dark');
        form.classList.toggle('dark');
        firstSection.classList.toggle('dark');
        secondSection.classList.toggle('dark');
        dropDownSVG.style.fill = "white";
        switchButton.innerText = 'Light Mode';
    } else {
        body.classList.remove('dark');
        containerDiv.classList.remove('dark');
        navList.classList.remove('dark');
        dropdownMenu.classList.remove('dark');
        rectangularNavBar.classList.remove('dark');
        form.classList.remove('dark');
        firstSection.classList.remove('dark');
        secondSection.classList.remove('dark');
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