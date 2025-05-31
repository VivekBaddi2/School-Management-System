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

const addMoreBtn = document.getElementById('addMoreBtn');
const subContainer = document.querySelector('.subContainer');
const addMoreDiv = document.getElementById('addMoreDiv');

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
    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        feePaymentsDropdown.classList.toggle('hidden');
        feePaymentsDropdownMobile.classList.toggle('hidden');
    });
});
document.addEventListener('click', (event) => {
    feePaymentDropDownToggle.forEach(toggle => {
        if (!toggle.contains(event.target) && !feePaymentsDropdown.contains(event.target)) {
            feePaymentsDropdown.classList.add('hidden');
        }
        if (!toggle.contains(event.target) && !feePaymentsDropdownMobile.contains(event.target)) {
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
        // Apply dark mode to all fee structure forms
        document.querySelectorAll('.feeStructureInputDetailsDiv').forEach(div => {
            div.classList.add('dark');
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
        // Change the text of the button to "Dark Mode"
        switchButton.forEach(button => {
            button.innerText = 'Dark Mode';
        });
        // Remove dark mode from all fee structure forms
        document.querySelectorAll('.feeStructureInputDetailsDiv').forEach(div => {
            div.classList.remove('dark');
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

function createFeeStructureInputDetailsDiv() {
    // Create a new div element
    const newDiv = document.createElement('div');
    newDiv.classList.add('feeStructureInputDetailsDiv', 'flex', 'flex-col', 'gap-5', 'border-2', 'border-violet-800', 'rounded-2xl', 'w-[80%]', 'p-4', 'mx-auto');

    // Add the inner HTML for the new div
    newDiv.innerHTML = `
        <div class="editBtnDiv w-full">
            <button class="editBtn font-bold text-violet-800 border-2 border-violet-800 p-4 pt-1 pb-1 rounded-xl cursor-pointer float-right hover:shadow-violet-500 hover:shadow-md ">Edit</button>
        </div>
        <div class="selectClassDiv flex gap-4 items-center ml-4 w-[80%] max-w-[400px]">
            <label for="selectClass" class="font-semibold">Class:</label>
            <select required name="selectClass" id="selectClass" class="selectClass border border-violet-800 rounded-xl p-2 pl-1 pr-1 w-[100%]">
                <option value="">Select class</option>
                <option value="class-1">class - 1</option>
                <option value="class-2">class - 2</option>
                <option value="class-3">class - 3</option>
                <option value="class-4">class - 4</option>
                <option value="class-5">class - 5</option>
            </select>
        </div>
        <div class="feesInputDiv flex gap-4 items-center ml-4 w-[80%] max-w-[400px]">
            <label for="feesInput" class="font-semibold">New Fees: </label>
            <input required type="number" name="feesInput" id="feesInput" class="feesInput text-black border border-violet-800 rounded-xl p-2 pl-1 pr-1 w-[100%]" placeholder="Enter new fees">
        </div>
        <div class="flex gap-4">
            <div class="saveBtnDiv">
                <button class="saveBtn ml-4 font-bold text-white bg-violet-800 p-4 pt-2 pb-2 rounded-xl hover:bg-violet-700 cursor-pointer">Save</button>
            </div>
            <div class="deleteBtnDiv">
                <button class="deleteBtn ml-4 font-bold text-white bg-red-600 p-4 pt-2 pb-2 rounded-xl hover:bg-red-500 cursor-pointer">Delete</button>
            </div>
        </div>
    `;


    // Select elements within the newDiv
    const editBtn = newDiv.querySelector('.editBtn');
    const saveBtn = newDiv.querySelector('.saveBtn');
    const selectClass = newDiv.querySelector('.selectClass');
    const feesInput = newDiv.querySelector('.feesInput');
    const deleteBtn = newDiv.querySelector('.deleteBtn');

    // logic to handle edit and save button
    // all input fields are disabled by default
    selectClass.disabled = true;
    feesInput.disabled = true;
    saveBtn.style.display = 'none';
    deleteBtn.style.display = 'none';

    // Event listener for edit button
    editBtn.addEventListener('click', () => {
        // Enable the input fields
        selectClass.disabled = false;
        feesInput.disabled = false;

        // Hide the Edit button and show the Save button
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        deleteBtn.style.display = 'inline-block';
    });

    // Event listener for Save button
    saveBtn.addEventListener('click', async () => {

        if (selectClass.value === "" || feesInput.value === "") {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "Please fill in all fields.";
            errorMessage.style.color = 'red';
            errorMessage.style.fontWeight = 'bold';
            errorMessage.style.marginTop = '10px';
            errorMessage.style.border = '2px solid red';
            errorMessage.style.borderRadius = '12px';
            errorMessage.style.backgroundColor = '#ebc7cc';
            errorMessage.style.padding = '10px';
            errorMessage.style.width = 'fit-content';
            errorMessage.style.height = 'auto';

            // Check if an error message already exists to avoid duplicates
            if (!newDiv.querySelector('.error-message')) {
                errorMessage.classList.add('error-message');
                newDiv.appendChild(errorMessage);

                // Remove the error message after 3 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            }
            // return;
        }
        else {
            try {
                // Send the fee structure data to the backend
                const response = await fetch('/api/saveFeeStructure', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ className: selectClass.value, fees: feesInput.value })
                });

                if (response.ok) {
                    console.log('Fee structure saved successfully');
                } else {
                    console.error('Failed to save fee structure:', response.statusText);
                }
            } catch (error) {
                console.error('Error saving fee structure:', error);
            }
            // Disable the input fields
            selectClass.disabled = true;
            feesInput.disabled = true;

            // Hide the Save button and show the Edit button
            saveBtn.style.display = 'none';
            deleteBtn.style.display = 'none';
            editBtn.style.display = 'inline-block';

        }

    });

    // Event listener for delete button
    deleteBtn.addEventListener('click', async () => {
        const className = selectClass.value;

        if (!className) {
            console.error('Class name is required to delete the fee structure.');
            return;
        }

        try {
            // Send a request to delete the fee structure from the backend
            const response = await fetch('/api/deleteFeeStructure', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ className })
            });

            if (response.ok) {
                console.log('Fee structure deleted successfully');

                // Remove the fee structure from the UI
                newDiv.remove();
            } else {
                console.error('Failed to delete fee structure:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting fee structure:', error);
        }
    }
    );

    // Apply dark mode if the current theme is dark
    if (containerDiv.classList.contains('dark')) {
        newDiv.classList.add('dark');
    }
    return newDiv;
}


// Add event listener for the Add More button
addMoreBtn.addEventListener('click', () => {
    const newFeeStructureDiv = createFeeStructureInputDetailsDiv();
    addMoreDiv.insertAdjacentElement("afterend", newFeeStructureDiv); // Add the new div above the prior one
});

async function loadFeeStructures() {
    try {
        const response = await fetch('/api/getFeeStructure');
        if (response.ok) {
            const { feeStructures } = await response.json();

            // Populate the fee structure list
            feeStructures.forEach(feeStructure => {
                const newFeeStructureDiv = createFeeStructureInputDetailsDiv();

                // Set the values for the class and fees
                const selectClass = newFeeStructureDiv.querySelector('.selectClass');
                const feesInput = newFeeStructureDiv.querySelector('.feesInput');
                selectClass.value = feeStructure.className;
                feesInput.value = feeStructure.fees;

                // Append the new fee structure div to the container
                subContainer.appendChild(newFeeStructureDiv);
            });
        } else {
            console.error('Failed to fetch fee structures:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching fee structures:', error);
    }
}

// Call loadFeeStructures on page load
document.addEventListener('DOMContentLoaded', loadFeeStructures);