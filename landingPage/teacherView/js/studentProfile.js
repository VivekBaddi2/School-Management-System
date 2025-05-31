const body = document.body;
const containerDiv = document.getElementById('containerDiv');
const hamburgerButton = document.getElementById('hamburgerButton');
const rectangularNavBar = document.getElementById('rectangularNavBar');
const switchButton = document.querySelectorAll('.darkLightSwitchButton');
const dropDownSVG = document.getElementById('dropDownSVG');
const dropdownMenu = document.getElementById('dropdownMenu');
const addStudentText = document.getElementById('addStudentText');
// Salary dropdown
const salaryItem = document.querySelectorAll(".salaryDropDownToggle");
const salaryDropdown = document.getElementById("salaryDropdown");
const salaryDropdownMobile = document.getElementById("salaryDropdownMobile");
// Student dropdown
const studentItem = document.querySelectorAll(".manageStudentsDropDownToggle");
const manageStudentsDropdown = document.getElementById("manageStudentsDropdown");
const manageStudentsDropdownMobile = document.getElementById("manageStudentsDropdownMobile");
const dropDownContent = document.querySelectorAll(".dropdownContent");

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

// JavaScript to toggle dark mode

function applyTheme(theme) {
    const inputs = document.querySelectorAll('input');
    const buttons = document.querySelectorAll('button');

    if (theme === 'dark') {
        body.classList.add('dark');
        inputs.forEach(input => input.classList.add('dark'));
        buttons.forEach(button => button.classList.add('dark'));
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
        addStudentText.classList.add('dark');
    } else {
        body.classList.remove('dark');
        inputs.forEach(input => input.classList.remove('dark'));
        buttons.forEach(button => button.classList.remove('dark'));
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
        addStudentText.classList.remove('dark');
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
// var count=0;

// Javascript to dynamically add student details div
document.getElementById('addDetailsButton').addEventListener('click', () => {
    // Create the new student details div
    const studentDetailsDiv = document.createElement('div');
    studentDetailsDiv.className = 'studentBasicDetails lg:w-[60vw] border-2 border-violet-800 rounded-lg p-4 m-4';

    // Add the form content
    studentDetailsDiv.innerHTML = `
        <form class="space-y-4">
            <div>
                <label for="studentName" class="block text-sm font-medium text-gray-700">Student Name</label>
                <input type="text" id="studentName" name="studentName" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
            </div>

             <div class="flex flex-col md:flex-row gap-4">
                <div>
                    <label for="studentClass" class="block text-sm font-medium text-gray-700">Class</label>
                    <input type="text" id="studentClass" name="studentClass" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                </div>
                <div>
                    <label for="rollNo" class="block text-sm font-medium text-gray-700">Roll No</label>
                    <input type="text" id="rollNo" name="rollNo" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                </div>
            </div>

            <div>
                <label for="studentMotherName" class="block text-sm font-medium text-gray-700">Student Mother Name</label>
                <input type="text" id="studentMotherName" name="studentMotherName" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                </div>
            <div>
                <label for="studentFatherName" class="block text-sm font-medium text-gray-700">Student Father Name</label>
                <input type="text" id="studentFatherName" name="studentFatherName" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
            </div>

           
            <div>
                <label for="studentAddress" class="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" id="studentAddress" name="studentAddress" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
            </div>

            <div class="flex flex-col md:flex-row gap-4 w-full">
                <div>
                    <label for="studentPhone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" id="studentPhone" name="studentPhone" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                </div>
                <div>
                    <label for="studentEmail" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="studentEmail" name="studentEmail" class="mt-1 p-2 block md:w-[250px]  border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-4 w-full">
                <div>
                    <label for="studentDOB" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input type="date" id="studentDOB" name="studentDOB" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">   
                </div>
                <div>
                    <label for="studentGender" class="block text-sm font-medium text-gray-700">Gender</label>
                    <select id="studentGender" name="studentGender" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                 <div>
                    <label for="studentBloodGroup" class="block text-sm font-medium text-gray-700">Blood Group</label>
                    <input type="text" id="studentBloodGroup" name="studentBloodGroup" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">   
                </div>
            </div>
            <div class="buttonsContainer flex flex-col md:flex-row gap-4">
               
                <button type="button" class="saveStudentDetailsButton mt-4 w-fit bg-transparent border-2 border-violet-800 text-violet-600 font-semibold py-2 px-4 rounded-md cursor-pointer">
                    Save Student Details
                </button>
                <button type="button" class="removeDetailsButton mt-4 w-fit bg-transparent text-red-600 font-semibold border-1 border-red-600 py-2 px-4 rounded-md cursor-pointer">
                    Remove Details
                </button>
            </div>
                <button type="button" class="toggleDetailsButton mt-4 w-[100px] bg-blue-600 text-white p-2 rounded-md cursor-pointer">
                    Collapse
                </button>
        </form>
    `;

    // Append the new div below the .addDetails div
    const addDetailsDiv = document.getElementById('addDetails');
    addDetailsDiv.insertAdjacentElement('beforebegin', studentDetailsDiv);

    // Apply the current theme to the new inputs
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(currentTheme);

    studentDetailsDiv.querySelector('.toggleDetailsButton').addEventListener('click', (event) => {
        const toggleButton = event.target;
        const formFields = studentDetailsDiv.querySelectorAll('form > div:not(:first-child):not(:nth-child(2)):not(:nth-child(3))'); // Exclude Student Name, Class, and Roll No fields
        const buttonsContainer = studentDetailsDiv.querySelector('.buttonsContainer');
        const studentNameField = studentDetailsDiv.querySelector('input[name="studentName"]');
        const studentClassField = studentDetailsDiv.querySelector('input[name="studentClass"]');
        const rollNoField = studentDetailsDiv.querySelector('input[name="rollNo"]');
        const studentDetailsForm = studentDetailsDiv.querySelector('form');

        if (toggleButton.innerText === 'Expand') {
            // Expand the div
            formFields.forEach(field => field.classList.remove('hidden-field')); // Show all fields
            buttonsContainer.classList.remove('hidden-field'); // Show buttons container
            studentNameField.style.width = '100%'; // Reset width
            studentClassField.style.width = '100%'; // Reset width
            rollNoField.style.width = '100%'; // Reset width
            studentDetailsForm.style.flexDirection = 'column'; // Reset layout
            toggleButton.innerText = 'Collapse'; // Change button text to "Collapse"
            toggleButton.style.width = '100px'; // Set a consistent width for the button
            toggleButton.style.padding = '10px'; // Adjust padding for better appearance
        } else {
            // Collapse the div
            formFields.forEach(field => field.classList.add('hidden-field')); // Hide all fields except the first three
            buttonsContainer.classList.add('hidden-field'); // Hide buttons container
            studentDetailsForm.style.display = 'flex'; // Set layout to flex
            studentDetailsForm.style.flexDirection = 'row'; // Arrange fields side by side
            studentDetailsForm.style.justifyContent = 'space-between'; // Add spacing between fields
            studentDetailsForm.style.flexWrap = 'wrap'; // Allow wrapping for smaller screens
            studentDetailsForm.style.rowGap = '10px'; // Add spacing between rows
            studentNameField.style.width = '90%'; // Reduce width for smaller layout
            studentClassField.style.width = '90%'; // Reduce width
            rollNoField.style.width = '90%'; // Reduce width
            toggleButton.innerText = 'Expand'; // Change button text to "Expand"
            toggleButton.style.width = '80px'; // Set smaller width for the button
            toggleButton.style.padding = '5px'; // Adjust padding for a smaller size
            toggleButton.style.marginLeft = '12px'; // Add margin to the left for spacing
        }
    });

    // Add event listener to the "Save Student Details" button
    studentDetailsDiv.querySelector('.saveStudentDetailsButton').addEventListener('click', async (event) => {
        // Disable all inputs and buttons inside the student details div
        const inputs = studentDetailsDiv.querySelectorAll('input');
        const buttons = studentDetailsDiv.querySelectorAll('button');
        // const studentDetailsDiv = event.target.closest('.studentBasicDetails');
        // Collect student details
        const studentData = {
            name: studentDetailsDiv.querySelector('input[name="studentName"]').value.trim(),
            studentClass: studentDetailsDiv.querySelector('input[name="studentClass"]').value.trim(),
            id: studentDetailsDiv.querySelector('input[name="rollNo"]').value.trim(),
            studentFatherName: studentDetailsDiv.querySelector('input[name="studentFatherName"]').value.trim(),
            studentMotherName: studentDetailsDiv.querySelector('input[name="studentMotherName"]').value.trim(),
            studentAddress: studentDetailsDiv.querySelector('input[name="studentAddress"]').value.trim(),
            studentPhone: studentDetailsDiv.querySelector('input[name="studentPhone"]').value.trim(),
            email: studentDetailsDiv.querySelector('input[name="studentEmail"]').value.trim(),
            birthDate: studentDetailsDiv.querySelector('input[name="studentDOB"]').value.trim(),
            studentGender: studentDetailsDiv.querySelector('select[name="studentGender"]').value.trim(),
            studentBloodGroup: studentDetailsDiv.querySelector('input[name="studentBloodGroup"]').value.trim(),
        };

        // Send the student data to the backend
        try {
            const response = await fetch('/api/saveStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });

            if (response.ok) {
                alert('Student data saved successfully');
            } else {
                const { error } = await response.json();
                alert(`Error: ${error}`);
            }
        } catch (error) {
            console.error('Error saving student data:', error);
            alert('An error occurred while saving the student data');
        }

        inputs.forEach(input => {
            input.disabled = true;
            input.style.backgroundColor = '#ebeced';
            if (input.classList.contains('dark')) {
                input.style.backgroundColor = '#1f1f1f';
            }
        });
        buttons.forEach(button => {
            if (button.classList.contains('removeDetailsButton') || button.classList.contains('toggleDetailsButton')) {
                button.disabled = false;
            }
            else {
                button.disabled = true;
                button.style.backgroundColor = '#ebeced';
                if (button.classList.contains('dark')) {
                    button.style.backgroundColor = '#171717';
                }
            }
        });
    });

    // Add event listener to the remove button to remove the student details div
    studentDetailsDiv.querySelector('.removeDetailsButton').addEventListener('click', () => {
        studentDetailsDiv.remove();
    });


});



// Backend logic 
async function loadStudentData() {
    try {
        const response = await fetch('/api/getStudents');
        if (response.ok) {
            const { students } = await response.json();

            const studentContainer = document.getElementById('studentContainer');
            studentContainer.innerHTML = ''; // Clear existing data

            students.forEach(student => {
                const studentDiv = document.createElement('div');
                studentDiv.className = 'studentDetails hidden border-2 border-violet-800 rounded-lg p-4 m-4';

                studentDiv.innerHTML = `
                    <form class="editStudentForm space-y-4">
                        <div>
                            <label for="editStudentName" class="block text-sm font-medium text-gray-700">Student Name</label>
                            <input type="text" id="editStudentName" name="editStudentName" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500" value="${student.name}">
                        </div>
                        <div class="flex flex-col md:flex-row gap-4">
                            <div>
                                <label for="editStudentClass" class="block text-sm font-medium text-gray-700">Class</label>
                                <input type="text" id="editStudentClass" name="editStudentClass" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500" value="${student.studentClass}">
                            </div>
                            <div>
                                <label for="editRollNo" class="block text-sm font-medium text-gray-700">Roll No</label>
                                <input type="text" id="editRollNo" name="editRollNo" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500" value="${student.id}">
                            </div>
                        </div>
                        <div>
                            <label for="editStudentMotherName" class="block text-sm font-medium text-gray-700">Student Mother Name</label>
                            <input type="text" id="editStudentMotherName" name="editStudentMotherName" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500" value="${student.studentMotherName}">
                        </div>
                        <div>
                            <label for="editStudentFatherName" class="block text-sm font-medium text-gray-700">Student Father Name</label>
                            <input type="text" id="editStudentFatherName" name="editStudentFatherName" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500" value="${student.studentFatherName}">
                        </div>
                        <div>
                            <label for="editStudentAddress" class="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" id="editStudentAddress" name="editStudentAddress" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500" value="${student.studentAddress}">
                        </div>
                        <div class="flex flex-col md:flex-row gap-4 w-full">
                            <div>
                                <label for="editStudentPhone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="text" id="editStudentPhone" name="editStudentPhone" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500" value="${student.studentPhone}">
                            </div>
                            <div>
                                <label for="editStudentEmail" class="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="editStudentEmail" name="editStudentEmail" class="mt-1 p-2 block md:w-[250px]  border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500" value="${student.email}">
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row gap-4 w-full">
                            <div>
                                <label for="editStudentDOB" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input type="date" id="editStudentDOB" name="editStudentDOB" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500" value="${student.birthDate}">
                            </div>
                            <div>
                                <label for="editStudentGender" class="block text-sm font-medium text-gray-700">Gender</label>
                                <select id="editStudentGender" name="editStudentGender" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                                    <option value="">Select</option>
                                    <option value="Male" ${student.studentGender === 'Male' ? 'selected' : ''}>Male</option>
                                    <option value="Female" ${student.studentGender === 'Female' ? 'selected' : ''}>Female</option>
                                </select>
                            </div>
                            <div>
                                <label for="editStudentBloodGroup" class="block text-sm font-medium text-gray-700">Blood Group</label>
                                <input type="text" id="editStudentBloodGroup" name="editStudentBloodGroup" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500" value="${student.studentBloodGroup}">
                            </div>
                        </div>
                        <div class="buttonsContainer flex flex-col md:flex-row gap-4">
                            <button type="button" class="saveStudentDetailsButton mt-4 w-fit bg-transparent border-2 border-violet-800 text-violet-600 font-semibold py-2 px-4 rounded-md cursor-pointer">
                                Save
                            </button>
                            <button type="button" class="cancelEditButton mt-4 w-fit bg-transparent text-red-600 font-semibold border-1 border-red-600 py-2 px-4 rounded-md cursor-pointer">
                                Cancel
                            </button>
                            <button type="button" class="deleteStudentButton mt-4 w-fit bg-transparent text-red-600 font-semibold border-1 border-red-600 py-2 px-4 rounded-md cursor-pointer">
                                Delete
                            </button>
                        </div>
                    </form>
                `;

                const collapsedStudnentDetails = document.createElement('div');
                collapsedStudnentDetails.className = 'collapsedStudentDetails flex gap-4 justify-between items-center border-2 border-violet-800 rounded-lg p-4 m-4';
                collapsedStudnentDetails.innerHTML = `
                    <div class="flex gap-4 items-center">
                        <h3 class="border-2 border-violet-800 rounded-xl p-2 ">${student.name} (${student.id})</h3>
                        <p class="border-2 border-violet-800 rounded-xl p-2 ">Class: ${student.studentClass}</p>
                        <p class="border-2 border-violet-800 rounded-xl p-2 ">Phone: ${student.studentPhone}</p>
                    </div>
                    <div>
                        <button class="editStudentButton m-2 border-1 p-4 pt-2 pb-2 border-red-700 rounded-xl bg-white hover:bg-amber-50 cursor-pointer text-red-700 font-bold" id="editStudentButton">Edit</button>
                    </div>
                `;

                studentContainer.appendChild(studentDiv);
                studentContainer.appendChild(collapsedStudnentDetails);

                // Add event listener for edit button in collapsedStudentDetails
                collapsedStudnentDetails.querySelector('.editStudentButton').addEventListener('click', () => {
                    collapsedStudnentDetails.style.display = 'none';
                    studentDiv.style.display = 'flex';
                    studentDiv.className = 'flex-col gap-4 justify-between border-2 border-violet-800 rounded-lg p-4 m-4';
                });

                // Add event listener for save button in studentDiv
                studentDiv.querySelector('.saveStudentDetailsButton').addEventListener('click', async () => {
                    const form = studentDiv.querySelector('.editStudentForm');
                    const updatedStudentData = {
                        name: form.editStudentName.value.trim(),
                        studentClass: form.editStudentClass.value.trim(),
                        id: form.editRollNo.value.trim(),
                        studentFatherName: form.editStudentFatherName.value.trim(),
                        studentMotherName: form.editStudentMotherName.value.trim(),
                        studentAddress: form.editStudentAddress.value.trim(),
                        studentPhone: form.editStudentPhone.value.trim(),
                        email: form.editStudentEmail.value.trim(),
                        birthDate: form.editStudentDOB.value.trim(),
                        studentGender: form.editStudentGender.value.trim(),
                        studentBloodGroup: form.editStudentBloodGroup.value.trim(),
                    };

                    try {
                        const response = await fetch('/api/saveStudent', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedStudentData),
                        });

                        if (response.ok) {
                            alert('Student data updated successfully');
                            // Update collapsedStudentDetails with new data
                            collapsedStudnentDetails.querySelector('h3').textContent = `${updatedStudentData.name} (${updatedStudentData.id})`;
                            const infoParagraphs = collapsedStudnentDetails.querySelectorAll('p');
                            infoParagraphs[0].textContent = `Class: ${updatedStudentData.studentClass}`;
                            infoParagraphs[1].textContent = `Phone: ${updatedStudentData.studentPhone}`;

                            // Hide editable div and show collapsed div
                            studentDiv.style.display = 'none';
                            collapsedStudnentDetails.style.display = 'flex';
                        } else {
                            const { error } = await response.json();
                            alert("Error:" `${error}`);
                        }
                    } catch (error) {
                        console.error('Error updating student data:', error);
                        alert('An error occurred while updating the student data');
                    }
                });

                // Add event listener for cancel button in studentDiv
                studentDiv.querySelector('.cancelEditButton').addEventListener('click', () => {
                    // Hide editable div and show collapsed div without saving
                    studentDiv.style.display = 'none';
                    collapsedStudnentDetails.style.display = 'flex';
                });

                // Add event listener for delete button in studentDiv
                studentDiv.querySelector('.deleteStudentButton').addEventListener('click', () => deleteStudent(student.id));
            });
        } else {
            const { error } = await response.json();
            console.error("Error fetching student data: ${error}");
        }
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
}

async function deleteStudent(id) {
    try {
        const response = await fetch(`/api/deleteStudent/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Student data deleted successfully');
            loadStudentData(); // Reload the data
        } else {
            const { error } = await response.json();
            alert("Error: ${error}");
        }
    } catch (error) {
        console.error('Error deleting student data:', error);
        alert('An error occurred while deleting the student data');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadStudentData();
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



