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

// Get references to elements
const fileInputTrigger = document.getElementById('fileInputTrigger');
const popupForm = document.getElementById('popupForm');
const classInput = document.getElementById('classInput');
const cancelButton = document.getElementById('cancelButton');
const saveButton = document.getElementById('saveButton');
const popupFormContent = document.getElementById('popupFormContent');
const popupElements = popupForm.querySelectorAll('.bg-white, .text-gray-700, input, textarea, button');
const subContainer = document.querySelector('.subContainer');

const uploadNotesDiv = document.getElementById('uploadNotesDiv');
const uploadNotesDivTitle = document.getElementById('uploadNotesDivTitle');

// Counter for card IDs
let cardCounter = 1;

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

// Show the popup form when the SVG is clicked
fileInputTrigger.addEventListener('click', () => {
    popupForm.classList.remove('hidden');
    popupForm.classList.add('flex');
});

// Close the popup form without saving when "Cancel" is clicked
cancelButton.addEventListener('click', () => {
    popupForm.classList.add('hidden');
    popupFormContent.reset(); // Reset the form fields
});

// // Handle form submission when "Save" is clicked
// popupFormContent.addEventListener('submit', (event) => {
//     event.preventDefault(); // Prevent form submission

//     // Get form values
//     const subjectTitle = document.getElementById('subjectTitle').value;
//     const description = document.getElementById('description').value;
//     const thumbnail = document.getElementById('thumbnail').files[0];
//     const downloadLink = document.getElementById('downloadLink').value;

//     // Create a new card
//     const newCard = document.createElement('div');
//     newCard.className = 'card w-[300px] h-[400px] border-violet-800 border-2 rounded-2xl shadow-lg bg-white flex flex-col justify-center items-center gap-4 p-4 m-4';
//     newCard.id = `card${cardCounter++}`;

//     // Create card content
//     const reader = new FileReader();
//     reader.onload = function (e) {
//         newCard.innerHTML = `
//             <div class="cardImage w-full h-40 overflow-hidden rounded-t-xl">
//                 <img src="${e.target.result}" alt="Thumbnail" class="w-full h-full object-cover">
//             </div>
//             <div class="cardTitle break-words">
//                 <p class="text-2xl font-medium text-violet-800">${subjectTitle}</p>
//             </div>
//             <div class="cardBody w-full h-36 break-words">
//                 <p class="text-gray-700 text-sm ">${description}</p>
//             </div>
//             <div class="downloadButton">
//                 <a href="${downloadLink}" target="_blank" class="downloadButton hover:bg-violet-500 hover:cursor-pointer border-2 rounded-lg p-2 bg-violet-800 text-white">Download</a>
//             </div>
//         `;
//         // Check the current theme and apply it to the new card
//         if (body.classList.contains('dark')) {
//             newCard.classList.add('dark');
//         }

//         // Append the new card to the container
//         subContainer.appendChild(newCard);

//         // Close the popup and reset the form
//         popupForm.classList.add('hidden');
//         popupFormContent.reset();

//     };

//     // Read the thumbnail file as a data URL
//     if (thumbnail) {
//         reader.readAsDataURL(thumbnail);
//     }
// });




// JavaScript to toggle dark mode

function applyTheme(theme) {
    const cards = document.querySelectorAll('.card'); // Select all cards

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
        uploadNotesDiv.classList.add('dark');
        uploadNotesDivTitle.classList.add('dark');
        fileInputTrigger.classList.add('dark');
        popupForm.classList.add('dark');
        popupElements.forEach((element) => {
            element.classList.add('dark');
        });
        classInput.classList.add('dark');
        // Apply dark mode to all cards
        cards.forEach(card => {
            card.classList.add('dark');
            card.querySelector('.cardTitle p').classList.add('dark');
            card.querySelector('.cardBody p').classList.add('dark');
            const downloadButton = card.querySelector('.downloadButton a');
            if (downloadButton) {
                downloadButton.classList.add('dark');
            }
        });

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
        switchButton.forEach(button => {
            button.innerText = 'Dark Mode';
        });
        uploadNotesDiv.classList.remove('dark');
        uploadNotesDivTitle.classList.remove('dark');
        fileInputTrigger.classList.remove('dark');
        popupForm.classList.remove('dark');
        popupElements.forEach((element) => {
            element.classList.remove('dark');
        });
        classInput.classList.remove('dark');
        // Remove dark mode from all cards
        cards.forEach(card => {
            card.classList.remove('dark');
            card.querySelector('.cardTitle p').classList.remove('dark');
            card.querySelector('.cardBody p').classList.remove('dark');
            const downloadButton = card.querySelector('.downloadButton a');
            if (downloadButton) {
                downloadButton.classList.remove('dark');
            }
        });
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

function resizeImage(file, maxWidth, maxHeight, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            // Resize the image while maintaining the aspect ratio
            if (width > maxWidth || height > maxHeight) {
                if (width > height) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                } else {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Convert the resized image to base64
            const resizedImage = canvas.toDataURL('image/jpeg', 0.8); // Adjust quality as needed
            callback(resizedImage);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

popupFormContent.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const subjectTitle = document.getElementById('subjectTitle').value;
    const description = document.getElementById('description').value;
    const thumbnail = document.getElementById('thumbnail').files[0];
    const className = document.getElementById('classInput').value;
    const downloadLink = document.getElementById('downloadLink').value;

    if (thumbnail) {
        resizeImage(thumbnail, 800, 800, async (resizedThumbnail) => {
            try {
                const response = await fetch('/api/uploadNotes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subjectTitle,
                        description,
                        thumbnail: resizedThumbnail,
                        className,
                        downloadLink,
                    }),
                });

                if (response.ok) {
                    alert('Note uploaded successfully');
                    popupForm.classList.add('hidden');
                    popupFormContent.reset();
                    loadNotes(); // Reload notes to display the new one
                } else {
                    const { error } = await response.json();
                    alert(`Error: ${error}`);
                }
            } catch (error) {
                console.error('Error uploading note:', error);
                alert('An error occurred while uploading the note');
            }
        });
    }
});

async function loadNotes() {
    try {
        const response = await fetch('/api/getNotes');
        if (response.ok) {
            const { notes } = await response.json();

            // // Clear existing notes
            // subContainer.innerHTML = '';

            // Display each note
            notes.forEach(note => {
                const newCard = document.createElement('div');
                newCard.className = 'card w-[300px] h-[400px] border-violet-800 border-2 rounded-2xl shadow-lg bg-white flex flex-col justify-center items-center gap-4 p-4 m-4';

                newCard.innerHTML = `
                    <div class="cardImage w-full h-40 overflow-hidden rounded-t-xl">
                        <img src="${note.thumbnail}" alt="Thumbnail" class="w-full h-full object-cover">
                    </div>
                    <div class="cardTitle break-words">
                        <p class="text-2xl font-medium text-violet-800">${note.subjectTitle}</p>
                    </div>
                    <div class="cardBody w-full h-36 break-words overflow-hidden">
                        <p class="text-gray-700 text-sm">${note.description}</p>
                    </div>
                    <div class="downloadButton">
                        <a href="${note.downloadLink}" target="_blank" class="downloadButton hover:bg-violet-500 hover:cursor-pointer border-2 rounded-lg p-2 bg-violet-800 text-white">Download</a>
                    </div>
                `;

                // Check the current theme and apply it to the new card
                if (body.classList.contains('dark')) {
                    newCard.classList.add('dark');
                }

                // Append the new card to the container
                subContainer.appendChild(newCard);
            });
        } else {
            const { error } = await response.json();
            console.error(`Error fetching notes: ${error}`);
        }
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadNotes(); // Fetch and display notes on page load
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
