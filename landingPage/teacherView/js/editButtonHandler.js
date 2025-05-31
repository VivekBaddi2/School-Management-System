document.getElementById('resultsContainer').addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('editButton')) {}
       
});
function displayEditStudentDetails{
 // Check if studentDetailsDiv already exists
        let studentDetailsDiv = document.querySelector('.studentBasicDetails');
        if (!studentDetailsDiv) {
            // Create the new student details div (same as addDetailsButton click handler)
            studentDetailsDiv = document.createElement('div');
            studentDetailsDiv.className = 'studentBasicDetails lg:w-[60vw] border-2 border-violet-800 rounded-lg p-4 m-4';

            studentDetailsDiv.innerHTML = `
                <form class="space-y-4">
                    <div>
                        <label for="studentName" class="block text-sm font-medium text-gray-700">Student Name</label>
                        <input type="text" id="studentName" name="studentName" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                    </div>
                    <div>
                        <label for="studentClass" class="block text-sm font-medium text-gray-700">Class</label>
                        <input type="text" id="studentClass" name="studentClass" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                    </div>
                    <div>
                        <label for="rollNo" class="block text-sm font-medium text-gray-700">Roll No</label>
                        <input type="text" id="rollNo" name="rollNo" class="mt-1 p-2 block w-full border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                    </div>
                    <div class="buttonsContainer flex flex-col md:flex-row gap-4">
                        <button type="button" class="addSubjectDetailsButton mt-4 w-fit bg-violet-800 border-2 border-violet-800 text-white py-2 px-4 rounded-md hover:bg-violet-700 cursor-pointer">
                            Add Subject Details
                        </button>
                        <button type="button" class="saveStudentDetailsButton mt-4 w-fit bg-transparent border-2 border-violet-800 text-violet-600 font-semibold py-2 px-4 rounded-md cursor-pointer">
                            Save Student Details
                        </button>
                        <button type="button" class="removeDetailsButton mt-4 w-fit bg-transparent text-red-600 font-semibold border-1 border-red-600 py-2 px-4 rounded-md cursor-pointer">
                            Remove Details
                        </button>
                    </div>
                    <button type="button" class="toggleDetailsButton mt-4 w-fit bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer">
                        Collapse
                    </button>
                </form>
            `;

            // Append the new div below the .addDetails div
            const addDetailsDiv = document.getElementById('addDetails');
            addDetailsDiv.insertAdjacentElement('beforebegin', studentDetailsDiv);

            // Apply the current theme to the new inputs
            const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
            // Assuming applyTheme function is globally available
            if (typeof applyTheme === 'function') {
                applyTheme(currentTheme);
            }

            // Add event listeners for the buttons inside the new studentDetailsDiv
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
                    formFields.forEach(field => field.style.display = 'block'); // Show all fields
                    buttonsContainer.style.display = 'flex'; // Show buttons container
                    studentNameField.style.width = '100%'; // Reset width
                    studentClassField.style.width = '100%'; // Reset width
                    rollNoField.style.width = '100%'; // Reset width
                    studentDetailsForm.style.flexDirection = 'column'; // Reset layout
                    toggleButton.innerText = 'Collapse'; // Change button text to "Collapse"
                } else {
                    // Collapse the div
                    formFields.forEach(field => field.style.display = 'none'); // Hide all fields except the first three
                    buttonsContainer.style.display = 'none'; // Hide buttons container
                    if (window.innerWidth <= 768) { // Check if the device width is less than or equal to 768px (mobile devices)
                        studentDetailsForm.style.display = 'flex'; // Set layout to flex
                        studentDetailsForm.style.flexDirection = 'column'; // Arrange fields side by side
                    } else {
                        studentDetailsForm.style.display = 'flex'; // Set layout to flex
                        studentDetailsForm.style.flexDirection = 'row'; // Arrange fields side by side
                    }
                    studentNameField.style.width = '90%'; // Default width for larger devices
                    studentClassField.style.width = '90%'; // Reduce width
                    rollNoField.style.width = '90%'; // Reduce width
                    toggleButton.innerText = 'Expand'; // Change button text to "Expand"
                }
            });

            studentDetailsDiv.querySelector('.saveStudentDetailsButton').addEventListener('click', () => {
                // Disable all inputs and buttons inside the student details div
                const inputs = studentDetailsDiv.querySelectorAll('input');
                const buttons = studentDetailsDiv.querySelectorAll('button');

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

            studentDetailsDiv.querySelector('.removeDetailsButton').addEventListener('click', () => {
                studentDetailsDiv.remove();
            });

            studentDetailsDiv.querySelector('.addSubjectDetailsButton').addEventListener('click', () => {
                let subjectDetailsContainer = document.getElementById('subjectDetailsContainer');
                if (!subjectDetailsContainer) {
                    subjectDetailsContainer = document.createElement('div');
                    subjectDetailsContainer.id = 'subjectDetailsContainer';
                    subjectDetailsContainer.className = 'subjectDetailsContainer space-y-4 mt-4';
                    const addDetailsDiv = document.getElementById('addDetails');
                    addDetailsDiv.insertAdjacentElement('afterend', subjectDetailsContainer);
                }

                const subjectDetailsDiv = document.createElement('div');
                subjectDetailsDiv.className = 'subjectDetails border-2 border-violet-800 rounded-lg p-4 m-4';

                subjectDetailsDiv.innerHTML = `
                <form class="space-y-4 flex flex-col md:flex-row md:items-center gap-4">
                    <div>
                        <label for="subjectName" class="block text-sm font-medium text-gray-700">Subject Name</label>
                        <input type="text" name="subjectName" class="mt-1 p-2 w-[150px] block border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                    </div>
                    <div>
                        <label for="totalMarks" class="block text-sm font-medium text-gray-700">Total Marks</label>
                        <input type="number" name="totalMarks" class="mt-1 p-2 w-[100px] block border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                    </div>
                    <div>
                        <label for="marksScored" class="block text-sm font-medium text-gray-700">Marks Scored</label>
                        <input type="number" name="marksScored" class="mt-1 p-2 block w-[100px] border-1 border-violet-800 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500">
                    </div>
                    <div>
                        <button type="button" title="Remove Subject" class="removeSubjectDetailsButton mt-4 mb-2 rounded-md bg-transparent text-red-500 font-semibold border-1 border-red-500 text-md py-2 px-4 cursor-pointer">
                            <span class="flex items-center justify-center h-full">Remove Subject</span>
                        </button>
                    </div>
                </form>
                `;

                const buttonsContainer = studentDetailsDiv.querySelector('.buttonsContainer');
                buttonsContainer.insertAdjacentElement('beforebegin', subjectDetailsDiv);

                const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
                if (typeof applyTheme === 'function') {
                    applyTheme(currentTheme);
                }

                subjectDetailsDiv.querySelector('.removeSubjectDetailsButton').addEventListener('click', () => {
                    subjectDetailsDiv.remove();
                });
            });
        }

        // Make the studentDetailsDiv visible (if it was hidden)
        studentDetailsDiv.style.display = 'block';

        // Optionally, populate the form with the selected student's data here
}