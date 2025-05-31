const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON with increased payload size limit
app.use(express.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API to handle user registration
app.post('/api/register', (req, res) => {
    const userDetails = req.body;

    // Determine the file based on the user's role
    const role = userDetails.role?.toLowerCase(); // Normalize to lowercase
    let fileName;

    switch (role) {
        case 'admin':
            fileName = 'adminData.json';
            break;
        case 'teacher':
            fileName = 'teacherData.json';
            break;
        case 'student':
            fileName = 'studentData.json';
            break;
        default:
            return res.status(400).json({ message: 'Invalid role specified' });
    }

    const filePath = path.join(__dirname, 'data', fileName);

    // Check if the file exists, if not, create it
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
    }

    // Read existing data
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${fileName}:`, err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const roleData = JSON.parse(data);
        roleData.push(userDetails);

        // Write updated data back to the file
        fs.writeFile(filePath, JSON.stringify(roleData, null, 2), (err) => {
            if (err) {
                console.error(`Error writing to ${fileName}:`, err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(201).json({ message: 'Account created successfully!' });
        });
    });
});

// API to handle user login
app.post('/api/login', (req, res) => {
    const { email, password, role } = req.body;

    // Determine the file based on the user's role
    const fileName = `${role.toLowerCase()}Data.json`;
    const filePath = path.join(__dirname, 'data', fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Role data not found' });
    }

    // Read the file and verify user credentials
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${fileName}:`, err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const users = JSON.parse(data || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Serve the dashboard based on the role
        switch (role.toLowerCase()) {
            case 'admin':
                return res.status(200).json({ message: 'Login successful', dashboard: 'adminView/dashboard.html', user });
            case 'teacher':
                return res.status(200).json({ message: 'Login successful', dashboard: 'teacherView/dashboard.html', user });
            case 'student':
                return res.status(200).json({ message: 'Login successful', dashboard: 'studentView/index.html', user });
            default:
                return res.status(400).json({ message: 'Invalid role specified' });
        }
    });
});
// API to get counts of teachers and students
app.get('/api/getCounts', (req, res) => {
    const teacherFilePath = path.join(__dirname, 'data', 'teacherData.json');
    const studentFilePath = path.join(__dirname, 'data', 'studentData.json');

    let teacherCount = 0;
    let studentCount = 0;

    // Read teacher data
    if (fs.existsSync(teacherFilePath)) {
        const teacherData = JSON.parse(fs.readFileSync(teacherFilePath, 'utf8') || '[]');
        teacherCount = teacherData.length;
    }

    // Read student data
    if (fs.existsSync(studentFilePath)) {
        const studentData = JSON.parse(fs.readFileSync(studentFilePath, 'utf8') || '[]');
        studentCount = studentData.length;
    }

    res.status(200).json({ teacherCount, studentCount });
});
// API to save to-do items
app.post('/api/saveTodo', (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ message: 'Task is required' });
    }

    const todoFolderPath = path.join(__dirname, 'data', 'todoData');
    const todoFilePath = path.join(todoFolderPath, 'todoData.json');

    // Create the todoData folder if it doesn't exist
    if (!fs.existsSync(todoFolderPath)) {
        fs.mkdirSync(todoFolderPath, { recursive: true });
    }

    // Read existing to-do data or initialize an empty array
    let todos = [];
    if (fs.existsSync(todoFilePath)) {
        const fileData = fs.readFileSync(todoFilePath, 'utf8');
        todos = JSON.parse(fileData || '[]');
    }

    // Add the new task to the to-do list
    todos.push({ task, createdAt: new Date().toISOString() });


    // Write the updated to-do list back to the file
    fs.writeFileSync(todoFilePath, JSON.stringify(todos, null, 2), 'utf8');

    res.status(201).json({ message: 'Task saved successfully', todos });
});

// Remove completed or deleted tasks
// API to delete a to-do item
app.post('/api/deleteTodo', (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ message: 'Task is required' });
    }

    const todoFolderPath = path.join(__dirname, 'data', 'todoData');
    const todoFilePath = path.join(todoFolderPath, 'todoData.json');

    // Check if the todoData.json file exists
    if (!fs.existsSync(todoFilePath)) {
        return res.status(404).json({ message: 'To-do data not found' });
    }

    // Read existing to-do data
    const fileData = fs.readFileSync(todoFilePath, 'utf8');
    const todos = JSON.parse(fileData || '[]');

    // Filter out the task to be deleted
    const updatedTodos = todos.filter(todo => todo.task !== task);

    // Write the updated to-do list back to the file
    fs.writeFileSync(todoFilePath, JSON.stringify(updatedTodos, null, 2), 'utf8');

    res.status(200).json({ message: 'Task deleted successfully', todos: updatedTodos });
});

// API to fetch all to-do items
app.get('/api/getTodos', (req, res) => {
    const todoFolderPath = path.join(__dirname, 'data', 'todoData');
    const todoFilePath = path.join(todoFolderPath, 'todoData.json');

    // Check if the todoData.json file exists
    if (!fs.existsSync(todoFilePath)) {
        return res.status(404).json({ message: 'To-do data not found', todos: [] });
    }

    // Read existing to-do data
    const fileData = fs.readFileSync(todoFilePath, 'utf8');
    const todos = JSON.parse(fileData || '[]');

    res.status(200).json({ todos });
});

// Save a completed task to recentActivity.json
app.post('/api/saveRecentActivity', (req, res) => {
    const { task } = req.body;
    const recentActivityFolderPath = path.join(__dirname, 'data', 'todoData');
    const recentActivityPath = path.join(recentActivityFolderPath, 'recentActivity.json');

    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    // Ensure the folder exists
    if (!fs.existsSync(recentActivityFolderPath)) {
        fs.mkdirSync(recentActivityFolderPath, { recursive: true });
    }

    // Read or initialize the file
    fs.readFile(recentActivityPath, 'utf8', (err, data) => {
        let recentActivities = [];
        if (!err && data) {
            try {
                recentActivities = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing recentActivity.json:', parseError);
                return res.status(500).json({ error: 'Failed to parse recentActivity.json' });
            }
        }

        // Add the new task
        recentActivities.push({ task, completedAt: new Date().toISOString() });

        // Write the updated data back to the file
        fs.writeFile(recentActivityPath, JSON.stringify(recentActivities, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to recentActivity.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save task to recentActivity.json' });
            }
            res.status(200).json({ message: 'Task saved to recent activities' });
        });
    });
});
// Fetch recent activities from recentActivity.json
app.get('/api/getRecentActivities', (req, res) => {
    const recentActivityFolderPath = path.join(__dirname, 'data', 'todoData');
    const recentActivityPath = path.join(recentActivityFolderPath, 'recentActivity.json');

    // Ensure the file exists
    if (!fs.existsSync(recentActivityPath)) {
        return res.status(404).json({ error: 'recentActivity.json not found', recentActivities: [] });
    }

    // Read the file
    fs.readFile(recentActivityPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading recentActivity.json:', err);
            return res.status(500).json({ error: 'Failed to read recentActivity.json' });
        }

        try {
            const recentActivities = JSON.parse(data || '[]');
            res.status(200).json({ recentActivities });
        } catch (parseError) {
            console.error('Error parsing recentActivity.json:', parseError);
            res.status(500).json({ error: 'Failed to parse recentActivity.json' });
        }
    });
});

// Clear recent activities
app.post('/api/clearRecentActivities', (req, res) => {
    const recentActivityFolderPath = path.join(__dirname, 'data', 'todoData');
    const recentActivityPath = path.join(recentActivityFolderPath, 'recentActivity.json');

    // Ensure the file exists
    if (!fs.existsSync(recentActivityPath)) {
        return res.status(404).json({ error: 'recentActivity.json not found' });
    }

    // Clear the file by writing an empty array
    fs.writeFile(recentActivityPath, JSON.stringify([], null, 2), (err) => {
        if (err) {
            console.error('Error clearing recentActivity.json:', err);
            return res.status(500).json({ error: 'Failed to clear recentActivity.json' });
        }
        res.status(200).json({ message: 'Recent activities cleared successfully' });
    });
});

// API to save event data
app.post('/api/saveEvent', (req, res) => {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const eventsFolderPath = path.join(__dirname, 'data', 'eventsData');
    const eventsFilePath = path.join(eventsFolderPath, 'eventsData.json');

    // Ensure the folder exists
    if (!fs.existsSync(eventsFolderPath)) {
        fs.mkdirSync(eventsFolderPath, { recursive: true });
    }

    // Read or initialize the file
    fs.readFile(eventsFilePath, 'utf8', (err, data) => {
        let events = [];
        if (!err && data) {
            try {
                events = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing eventsData.json:', parseError);
                return res.status(500).json({ error: 'Failed to parse eventsData.json' });
            }
        }

        // Add the new event
        events.push({ title, description, date, createdAt: new Date().toISOString() });

        // Write the updated data back to the file
        fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to eventsData.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save event to eventsData.json' });
            }
            res.status(200).json({ message: 'Event saved successfully' });
        });
    });
});

// API to fetch event data
app.get('/api/getEvents', (req, res) => {
    const eventsFolderPath = path.join(__dirname, 'data', 'eventsData');
    const eventsFilePath = path.join(eventsFolderPath, 'eventsData.json');

    // Check if the file exists
    if (!fs.existsSync(eventsFilePath)) {
        return res.status(200).json({ events: [] }); // Return an empty array if the file doesn't exist
    }

    // Read the file
    fs.readFile(eventsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading eventsData.json:', err);
            return res.status(500).json({ error: 'Failed to read eventsData.json' });
        }

        try {
            const events = JSON.parse(data || '[]');
            res.status(200).json({ events });
        } catch (parseError) {
            console.error('Error parsing eventsData.json:', parseError);
            res.status(500).json({ error: 'Failed to parse eventsData.json' });
        }
    });
});

// API to save fee structure data
app.post('/api/saveFeeStructure', (req, res) => {
    const { className, fees } = req.body;

    if (!className || !fees) {
        return res.status(400).json({ error: 'Class name and fees are required' });
    }

    const feeStructureFolderPath = path.join(__dirname, 'data', 'feeStructureData');
    const feeStructureFilePath = path.join(feeStructureFolderPath, 'feeStructure.json');

    // Ensure the folder exists
    if (!fs.existsSync(feeStructureFolderPath)) {
        fs.mkdirSync(feeStructureFolderPath, { recursive: true });
    }

    // Read or initialize the file
    fs.readFile(feeStructureFilePath, 'utf8', (err, data) => {
        let feeStructures = [];
        if (!err && data) {
            try {
                feeStructures = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing feeStructure.json:', parseError);
                return res.status(500).json({ error: 'Failed to parse feeStructure.json' });
            }
        }

        // Check if the class already exists
        const existingClassIndex = feeStructures.findIndex(item => item.className === className);
        if (existingClassIndex !== -1) {
            // Update the fees for the existing class
            feeStructures[existingClassIndex].fees = fees;
        } else {
            // Add the new fee structure
            feeStructures.push({ className, fees });
        }

        // Write the updated data back to the file
        fs.writeFile(feeStructureFilePath, JSON.stringify(feeStructures, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to feeStructure.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save fee structure to feeStructure.json' });
            }
            res.status(200).json({ message: 'Fee structure saved successfully' });
        });
    });
});

// API to fetch fee structure data
app.get('/api/getFeeStructure', (req, res) => {
    const feeStructureFolderPath = path.join(__dirname, 'data', 'feeStructureData');
    const feeStructureFilePath = path.join(feeStructureFolderPath, 'feeStructure.json');

    // Check if the file exists
    if (!fs.existsSync(feeStructureFilePath)) {
        return res.status(200).json({ feeStructures: [] }); // Return an empty array if the file doesn't exist
    }

    // Read the file
    fs.readFile(feeStructureFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading feeStructure.json:', err);
            return res.status(500).json({ error: 'Failed to read feeStructure.json' });
        }

        try {
            const feeStructures = JSON.parse(data || '[]');
            res.status(200).json({ feeStructures });
        } catch (parseError) {
            console.error('Error parsing feeStructure.json:', parseError);
            res.status(500).json({ error: 'Failed to parse feeStructure.json' });
        }
    });
});

// API to delete a fee structure
app.post('/api/deleteFeeStructure', (req, res) => {
    const { className } = req.body;

    if (!className) {
        return res.status(400).json({ error: 'Class name is required' });
    }

    const feeStructureFolderPath = path.join(__dirname, 'data', 'feeStructureData');
    const feeStructureFilePath = path.join(feeStructureFolderPath, 'feeStructure.json');

    // Check if the file exists
    if (!fs.existsSync(feeStructureFilePath)) {
        return res.status(404).json({ error: 'Fee structure file not found' });
    }

    // Read the file
    fs.readFile(feeStructureFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading feeStructure.json:', err);
            return res.status(500).json({ error: 'Failed to read feeStructure.json' });
        }

        try {
            let feeStructures = JSON.parse(data || '[]');

            // Filter out the fee structure to be deleted
            const updatedFeeStructures = feeStructures.filter(item => item.className !== className);

            // Write the updated data back to the file
            fs.writeFile(feeStructureFilePath, JSON.stringify(updatedFeeStructures, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to feeStructure.json:', writeErr);
                    return res.status(500).json({ error: 'Failed to delete fee structure from feeStructure.json' });
                }
                res.status(200).json({ message: 'Fee structure deleted successfully' });
            });
        } catch (parseError) {
            console.error('Error parsing feeStructure.json:', parseError);
            res.status(500).json({ error: 'Failed to parse feeStructure.json' });
        }
    });
});

// API to fetch teacher data
app.get('/api/getTeachers', (req, res) => {
    const teacherDataPath = path.join(__dirname, 'data', 'teacherData.json');

    // Check if the file exists
    if (!fs.existsSync(teacherDataPath)) {
        return res.status(200).json({ teachers: [] }); // Return an empty array if the file doesn't exist
    }

    // Read the file
    fs.readFile(teacherDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading teacherData.json:', err);
            return res.status(500).json({ error: 'Failed to read teacherData.json' });
        }

        try {
            const teachers = JSON.parse(data || '[]');
            res.status(200).json({ teachers });
        } catch (parseError) {
            console.error('Error parsing teacherData.json:', parseError);
            res.status(500).json({ error: 'Failed to parse teacherData.json' });
        }
    });
});

// API to delete teacher data
app.post('/api/deleteTeacher', (req, res) => {
    const { teacherId } = req.body;
    if (!teacherId) {
        return res.status(400).json({ error: 'Teacher ID is required' });
    }

    const teacherDataPath = path.join(__dirname, 'data', 'teacherData.json');

    // Check if the file exists
    if (!fs.existsSync(teacherDataPath)) {
        return res.status(404).json({ error: 'Teacher data file not found' });
    }

    // Read the file
    fs.readFile(teacherDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading teacherData.json:', err);
            return res.status(500).json({ error: 'Failed to read teacherData.json' });
        }

        try {
            let teachers = JSON.parse(data || '[]');

            // Filter out the teacher to be deleted
            const updatedTeachers = teachers.filter(teacher => teacher.id !== Number(teacherId));
            console.log('Updated teachers:', updatedTeachers);
            // Write the updated data back to the file
            fs.writeFile(teacherDataPath, JSON.stringify(updatedTeachers, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to teacherData.json:', writeErr);
                    return res.status(500).json({ error: 'Failed to delete teacher from teacherData.json' });
                }
                console.log('Received teacherId:', teacherId);
                console.log('Updated teachers:', updatedTeachers);
                res.status(200).json({ message: 'Teacher deleted successfully' });
            });
        } catch (parseError) {
            console.error('Error parsing teacherData.json:', parseError);
            res.status(500).json({ error: 'Failed to parse teacherData.json' });
        }
    });
});

// API to save a To-Do task
app.post('/api/teacher/saveTodo', (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    const todoFilePath = path.join(__dirname, 'data', 'teacherTodo.json');

    // Read or initialize the file
    fs.readFile(todoFilePath, 'utf8', (err, data) => {
        let todos = [];
        if (!err && data) {
            try {
                todos = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing teacherTodo.json:', parseError);
                return res.status(500).json({ error: 'Failed to parse teacherTodo.json' });
            }
        }

        // Add the new task
        todos.push({ task, createdAt: new Date().toISOString() });

        // Write the updated data back to the file
        fs.writeFile(todoFilePath, JSON.stringify(todos, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to teacherTodo.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save task to teacherTodo.json' });
            }
            res.status(200).json({ message: 'Task saved successfully' });
        });
    });
});

// API to fetch To-Do tasks
app.get('/api/teacher/getTodos', (req, res) => {
    const todoFilePath = path.join(__dirname, 'data', 'teacherTodo.json');

    // Check if the file exists
    if (!fs.existsSync(todoFilePath)) {
        return res.status(200).json({ todos: [] }); // Return an empty array if the file doesn't exist
    }

    // Read the file
    fs.readFile(todoFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading teacherTodo.json:', err);
            return res.status(500).json({ error: 'Failed to read teacherTodo.json' });
        }

        try {
            const todos = JSON.parse(data || '[]');
            res.status(200).json({ todos });
        } catch (parseError) {
            console.error('Error parsing teacherTodo.json:', parseError);
            res.status(500).json({ error: 'Failed to parse teacherTodo.json' });
        }
    });
});

// API to save a recent activity
app.post('/api/teacher/saveRecentActivity', (req, res) => {
    const { activity } = req.body;

    if (!activity) {
        return res.status(400).json({ error: 'Activity is required' });
    }

    const recentActivityFilePath = path.join(__dirname, 'data', 'teacherRecentActivities.json');

    // Read or initialize the file
    fs.readFile(recentActivityFilePath, 'utf8', (err, data) => {
        let recentActivities = [];
        if (!err && data) {
            try {
                recentActivities = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing teacherRecentActivities.json:', parseError);
                return res.status(500).json({ error: 'Failed to parse teacherRecentActivities.json' });
            }
        }

        // Add the new activity
        recentActivities.push({ activity, createdAt: new Date().toISOString() });

        // Write the updated data back to the file
        fs.writeFile(recentActivityFilePath, JSON.stringify(recentActivities, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to teacherRecentActivities.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save activity to teacherRecentActivities.json' });
            }
            res.status(200).json({ message: 'Activity saved successfully' });
        });
    });
});

// API to fetch recent activities
app.get('/api/teacher/getRecentActivities', (req, res) => {
    const recentActivityFilePath = path.join(__dirname, 'data', 'teacherRecentActivities.json');

    // Check if the file exists
    if (!fs.existsSync(recentActivityFilePath)) {
        return res.status(200).json({ recentActivities: [] }); // Return an empty array if the file doesn't exist
    }

    // Read the file
    fs.readFile(recentActivityFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading teacherRecentActivities.json:', err);
            return res.status(500).json({ error: 'Failed to read teacherRecentActivities.json' });
        }

        try {
            const recentActivities = JSON.parse(data || '[]');
            res.status(200).json({ recentActivities });
        } catch (parseError) {
            console.error('Error parsing teacherRecentActivities.json:', parseError);
            res.status(500).json({ error: 'Failed to parse teacherRecentActivities.json' });
        }
    });
});

// API to delete a To-Do task
app.post('/api/teacher/deleteTodo', (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    const todoFilePath = path.join(__dirname, 'data', 'teacherTodo.json');

    // Read the file
    fs.readFile(todoFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading teacherTodo.json:', err);
            return res.status(500).json({ error: 'Failed to read teacherTodo.json' });
        }

        try {
            let todos = JSON.parse(data || '[]');

            // Filter out the task to be deleted
            const updatedTodos = todos.filter((todo) => todo.task !== task);

            // Write the updated data back to the file
            fs.writeFile(todoFilePath, JSON.stringify(updatedTodos, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to teacherTodo.json:', writeErr);
                    return res.status(500).json({ error: 'Failed to delete task from teacherTodo.json' });
                }
                res.status(200).json({ message: 'Task deleted successfully' });
            });
        } catch (parseError) {
            console.error('Error parsing teacherTodo.json:', parseError);
            res.status(500).json({ error: 'Failed to parse teacherTodo.json' });
        }
    });
});

// API to clear recent activities
app.post('/api/teacher/clearRecentActivities', (req, res) => {
    const recentActivityFilePath = path.join(__dirname, 'data', 'teacherRecentActivities.json');

    // Check if the file exists
    if (!fs.existsSync(recentActivityFilePath)) {
        return res.status(404).json({ error: 'Recent activities file not found' });
    }

    // Clear the file by writing an empty array
    fs.writeFile(recentActivityFilePath, JSON.stringify([], null, 2), (err) => {
        if (err) {
            console.error('Error clearing teacherRecentActivities.json:', err);
            return res.status(500).json({ error: 'Failed to clear recent activities' });
        }
        res.status(200).json({ message: 'Recent activities cleared successfully' });
    });
});

// API to fetch total events count
app.get('/api/getTotalEvents', (req, res) => {
    const eventsFilePath = path.join(__dirname, 'data', "eventsData", 'eventsData.json');

    // Check if the file exists
    if (!fs.existsSync(eventsFilePath)) {
        return res.status(200).json({ totalEvents: 0 }); // Return 0 if the file doesn't exist
    }

    // Read the file
    fs.readFile(eventsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading events.json:', err);
            return res.status(500).json({ error: 'Failed to read events.json' });
        }

        try {
            const events = JSON.parse(data || '[]');
            res.status(200).json({ totalEvents: events.length }); // Return the total count
        } catch (parseError) {
            console.error('Error parsing events.json:', parseError);
            res.status(500).json({ error: 'Failed to parse events.json' });
        }
    });
});

// API to save bank details
app.post('/api/saveBankDetails', (req, res) => {
    const { email, password, bankDetails } = req.body;

    const teacherDataPath = path.join(__dirname, 'data', 'teacherData.json');

    // Check if the file exists
    if (!fs.existsSync(teacherDataPath)) {
        return res.status(404).json({ error: 'Teacher data file not found' });
    }

    // Read the teacher data file
    fs.readFile(teacherDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading teacherData.json:', err);
            return res.status(500).json({ error: 'Failed to read teacher data' });
        }

        try {
            const teachers = JSON.parse(data || '[]');
            const teacher = teachers.find(t => t.email === email);

            if (!teacher) {
                return res.status(400).json({ error: 'Email not found' });
            }

            if (teacher.password !== password) {
                return res.status(400).json({ error: 'Invalid password' });
            }

            // Update the teacher's bank details
            teacher.bankDetails = bankDetails;

            // Write the updated data back to the file
            fs.writeFile(teacherDataPath, JSON.stringify(teachers, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to teacherData.json:', writeErr);
                    return res.status(500).json({ error: 'Failed to save bank details' });
                }

                res.status(200).json({ message: 'Bank details saved successfully' });
            });
        } catch (parseError) {
            console.error('Error parsing teacherData.json:', parseError);
            res.status(500).json({ error: 'Failed to parse teacher data' });
        }
    });
});

// API to fetch bank details
app.post('/api/getBankDetails', (req, res) => {
    const { email } = req.body;
    console.log('Received email:', email);
    const teacherDataPath = path.join(__dirname, 'data', 'teacherData.json');

    // Check if the file exists
    if (!fs.existsSync(teacherDataPath)) {
        return res.status(404).json({ error: 'Teacher data file not found' });
    }

    // Read the teacher data file
    fs.readFile(teacherDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading teacherData.json:', err);
            return res.status(500).json({ error: 'Failed to read teacher data' });
        }

        try {
            const teachers = JSON.parse(data || '[]');
            const teacher = teachers.find(t => t.email === email);

            if (!teacher) {
                return res.status(400).json({ error: 'Email not found' });
            }

            // Return the bank details
            res.status(200).json({ bankDetails: teacher.bankDetails || {} });
        } catch (parseError) {
            console.error('Error parsing teacherData.json:', parseError);
            res.status(500).json({ error: 'Failed to parse teacher data' });
        }
    });
});

// API to save uploaded notes
app.post('/api/uploadNotes', (req, res) => {
    const { subjectTitle, description, thumbnail, className, downloadLink } = req.body;

    const uploadNotesPath = path.join(__dirname, 'data', 'uploadNotes', 'uploadNotes.json');

    // Ensure the uploadNotes folder exists
    if (!fs.existsSync(path.dirname(uploadNotesPath))) {
        fs.mkdirSync(path.dirname(uploadNotesPath), { recursive: true });
    }

    // Read the existing notes
    fs.readFile(uploadNotesPath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading uploadNotes.json:', err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        const notes = data ? JSON.parse(data) : [];

        // Add the new note
        const newNote = {
            id: notes.length + 1,
            subjectTitle,
            description,
            thumbnail,
            className,
            downloadLink,
        };
        notes.push(newNote);

        // Write the updated notes back to the file
        fs.writeFile(uploadNotesPath, JSON.stringify(notes, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to uploadNotes.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save note' });
            }

            res.status(200).json({ message: 'Note saved successfully' });
        });
    });
});

// API to fetch uploaded notes
app.get('/api/getNotes', (req, res) => {
    const uploadNotesPath = path.join(__dirname, 'data', 'uploadNotes', 'uploadNotes.json');

    // Read the notes file
    fs.readFile(uploadNotesPath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading uploadNotes.json:', err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        const notes = data ? JSON.parse(data) : [];
        res.status(200).json({ notes });
    });
});

// API to save complaints
app.post('/api/saveComplaint', (req, res) => {
    const { name, id, department, role, complaint } = req.body;

    const complaintsFilePath = path.join(__dirname, 'data', 'complaints', 'complaints.json');

    // Ensure the complaints folder exists
    if (!fs.existsSync(path.dirname(complaintsFilePath))) {
        fs.mkdirSync(path.dirname(complaintsFilePath), { recursive: true });
    }

    // Read the existing complaints
    fs.readFile(complaintsFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading complaints.json:', err);
            return res.status(500).json({ error: 'Failed to read complaints' });
        }

        const complaints = data ? JSON.parse(data) : [];

        // Add the new complaint
        const newComplaint = {
            id: complaints.length + 1,
            name,
            teacherId: id,
            department,
            role,
            complaint,
            date: new Date().toISOString(),
        };
        complaints.push(newComplaint);

        // Write the updated complaints back to the file
        fs.writeFile(complaintsFilePath, JSON.stringify(complaints, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to complaints.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save complaint' });
            }

            res.status(200).json({ message: 'Complaint saved successfully' });
        });
    });
});

// API to fetch student data
app.get('/api/getStudents', (req, res) => {
    const studentDataPath = path.join(__dirname, 'data', 'studentData.json');

    // Read the student data file
    fs.readFile(studentDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading studentData.json:', err);
            return res.status(500).json({ error: 'Failed to read student data' });
        }

        const students = JSON.parse(data || '[]');
        res.status(200).json({ students });
    });
});

// API to save attendance data
app.post('/api/saveAttendance', (req, res) => {
    const attendanceData = req.body;
    const attendanceFilePath = path.join(__dirname, 'data', 'attendance', 'attendance.json');

    // Ensure the attendance folder exists
    if (!fs.existsSync(path.dirname(attendanceFilePath))) {
        fs.mkdirSync(path.dirname(attendanceFilePath), { recursive: true });
    }

    // Read existing attendance data
    fs.readFile(attendanceFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading attendance.json:', err);
            return res.status(500).json({ error: 'Failed to read attendance data' });
        }

        const attendanceRecords = data ? JSON.parse(data) : [];

        // Add the new attendance data
        attendanceRecords.push(...attendanceData);

        // Write updated attendance data back to the file
        fs.writeFile(attendanceFilePath, JSON.stringify(attendanceRecords, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to attendance.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save attendance data' });
            }

            res.status(200).json({ message: 'Attendance saved successfully' });
        });
    });
});

// API to get attendance data for a specific student and month
app.post('/api/getMonthlyAttendance', (req, res) => {
    const { studentId, month, year } = req.body;

    const attendanceFilePath = path.join(__dirname, 'data', 'attendance', 'attendance.json');

    fs.readFile(attendanceFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading attendance.json:', err);
            return res.status(500).json({ error: 'Failed to fetch attendance data' });
        }

        const attendanceRecords = JSON.parse(data || '[]');

        // Filter attendance records for the given student and month
        const filteredRecords = attendanceRecords.filter(record => {
            const recordDate = new Date(record.date);
            return (
                String(record.id) === String(studentId) &&
                recordDate.getMonth() + 1 === Number(month) &&
                recordDate.getFullYear() === Number(year)
            );
        });

        res.status(200).json({ attendance: filteredRecords });
    });
});

// API to save student results
app.post('/api/saveStudentResult', (req, res) => {
    const studentResult = req.body;
    const resultsFilePath = path.join(__dirname, 'data', 'studentResults', 'studentResults.json');

    // Ensure the studentResults folder exists
    if (!fs.existsSync(path.dirname(resultsFilePath))) {
        fs.mkdirSync(path.dirname(resultsFilePath), { recursive: true });
    }

    // Read existing results
    fs.readFile(resultsFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading studentResults.json:', err);
            return res.status(500).json({ error: 'Failed to read student results' });
        }

        const results = data ? JSON.parse(data) : [];

        // Check if the student result already exists
        const existingResultIndex = results.findIndex(result => result.rollNo === studentResult.rollNo);
        if (existingResultIndex !== -1) {
            // Update the existing result
            results[existingResultIndex] = studentResult;
        } else {
            // Add the new result
            results.push(studentResult);
        }

        // Write updated results back to the file
        fs.writeFile(resultsFilePath, JSON.stringify(results, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to studentResults.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save student result' });
            }

            res.status(200).json({ message: 'Student result saved successfully' });
        });
    });
});

// API to fetch student results
app.get('/api/getStudentResults', (req, res) => {
    const resultsFilePath = path.join(__dirname, 'data', 'studentResults', 'studentResults.json');

    // Read the results file
    fs.readFile(resultsFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading studentResults.json:', err);
            return res.status(500).json({ error: 'Failed to read student results' });
        }

        const results = data ? JSON.parse(data) : [];
        res.status(200).json({ results });
    });
});

// API to save student data
app.post('/api/saveStudent', (req, res) => {
    const updatedStudentData = req.body;
    const studentDataPath = path.join(__dirname, 'data', 'studentData.json');

    // Ensure the file exists
    if (!fs.existsSync(studentDataPath)) {
        fs.writeFileSync(studentDataPath, JSON.stringify([], null, 2), 'utf8');
    }

    // Read existing data
    fs.readFile(studentDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading studentData.json:', err);
            return res.status(500).json({ error: 'Failed to read student data' });
        }

        const students = JSON.parse(data || '[]');

        // Find the student by ID
        const studentIndex = students.findIndex(student => student.id === updatedStudentData.id);

        if (studentIndex !== -1) {
            // Update the existing student data
            students[studentIndex] = {
                ...students[studentIndex], // Keep existing fields
                ...updatedStudentData,    // Overwrite with updated fields
            };

            // Write updated data back to the file
            fs.writeFile(studentDataPath, JSON.stringify(students, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to studentData.json:', writeErr);
                    return res.status(500).json({ error: 'Failed to update student data' });
                }

                res.status(200).json({ message: 'Student data updated successfully' });
            });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    });
});
// API to fetch student data
app.get('/api/getStudents', (req, res) => {
    const studentDataPath = path.join(__dirname, 'data', 'studentData.json');

    // Read the file
    fs.readFile(studentDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading studentData.json:', err);
            return res.status(500).json({ error: 'Failed to read student data' });
        }

        const students = JSON.parse(data || '[]');
        res.status(200).json({ students });
    });
});

// API to get combined monthly attendance data for a class
app.post('/api/getClassMonthlyAttendance', (req, res) => {
    const { className, year } = req.body;

    if (!className || !year) {
        return res.status(400).json({ error: 'className and year are required' });
    }

    const attendanceFilePath = path.join(__dirname, 'data', 'attendance', 'attendance.json');
    const studentDataPath = path.join(__dirname, 'data', 'studentData.json');

    // Read both attendance and student data files
    fs.readFile(attendanceFilePath, 'utf8', (attErr, attData) => {
        if (attErr) {
            console.error('Error reading attendance.json:', attErr);
            return res.status(500).json({ error: 'Failed to read attendance data' });
        }

        fs.readFile(studentDataPath, 'utf8', (stuErr, stuData) => {
            if (stuErr) {
                console.error('Error reading studentData.json:', stuErr);
                return res.status(500).json({ error: 'Failed to read student data' });
            }

            try {
                const attendanceRecords = JSON.parse(attData || '[]');
                const students = JSON.parse(stuData || '[]');

                // Filter students by className
                const classStudentIds = new Set(
                    students.filter(s => s.studentClass === className).map(s => s.id)
                );

                // Filter attendance records for students in the class and the given year
                const filteredAttendance = attendanceRecords.filter(record => {
                    const recordDate = new Date(record.date);
                    return (
                        classStudentIds.has(record.id) &&
                        recordDate.getFullYear() === Number(year)
                    );
                });

                // Aggregate attendance by month
                const monthlyAttendance = {};

                // Initialize months 1 to 12 with counts
                for (let m = 1; m <= 12; m++) {
                    monthlyAttendance[m] = { presentCount: 0, totalCount: 0 };
                }

                filteredAttendance.forEach(record => {
                    const recordDate = new Date(record.date);
                    const month = recordDate.getMonth() + 1;

                    monthlyAttendance[month].totalCount += 1;
                    if (record.attendance.toLowerCase() === 'present') {
                        monthlyAttendance[month].presentCount += 1;
                    }
                });

                // Calculate attendance percentage per month
                const attendancePercentages = [];
                for (let m = 1; m <= 12; m++) {
                    const { presentCount, totalCount } = monthlyAttendance[m];
                    const percentage = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;
                    attendancePercentages.push(Number(percentage.toFixed(2)));
                }

                res.status(200).json({ attendancePercentages });
            } catch (parseError) {
                console.error('Error parsing data:', parseError);
                res.status(500).json({ error: 'Failed to parse data' });
            }
        });
    });
});

// API to delete student data
app.delete('/api/deleteStudent/:id', (req, res) => {
    const id = req.params.id;
    const studentDataPath = path.join(__dirname, 'data', 'studentData.json');

    // Read the file
    fs.readFile(studentDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading studentData.json:', err);
            return res.status(500).json({ error: 'Failed to read student data' });
        }

         

        const students = JSON.parse(data || '[]');
        const updatedStudents = students.filter(student => Number(student.id) !== Number(id));

        console.log('Original Students:', students);
        console.log('Updated Students:', updatedStudents);
        // Write updated data back to the file
        fs.writeFile(studentDataPath, JSON.stringify(updatedStudents, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to studentData.json:', writeErr);
                return res.status(500).json({ error: 'Failed to delete student data' });
            }

            res.status(200).json({ message: 'Student data deleted successfully' });
        });
    });
});

// API to get student results
app.post('/api/getStudentResults', (req, res) => {
    const { studentID, studentClass, exam } = req.body;

    const resultsFilePath = path.join(__dirname, 'data', 'studentResults', 'studentResults.json');

    fs.readFile(resultsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading studentResults.json:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }

        const results = JSON.parse(data || '[]');
        console.log('Results:', results);
        console.log('Student ID:', studentID);
        console.log('Student Class:', studentClass);
        console.log('Exam:', exam);
        // Find the result that matches the entered data
        const matchedResult = results.find(result =>
            Number(result.rollNo) === Number(studentID) &&
            result.studentClass === studentClass &&
            result.exam.toLowerCase() === exam.toLowerCase()
        );

        if (!matchedResult) {
            return res.status(404).json({ error: 'No results found for the entered data.' });
        }

        res.status(200).json({ result: matchedResult });
    });
});
app.post('/api/getClassSubjectPerformance', (req, res) => {
    const { className, subjectName, exam } = req.body;

    if (!className || !subjectName) {
        return res.status(400).json({ error: 'className and subjectName are required' });
    }

    const resultsFilePath = path.join(__dirname, 'data', 'studentResults', 'studentResults.json');

    fs.readFile(resultsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading studentResults.json:', err);
            return res.status(500).json({ error: 'Failed to read student results' });
        }

        try {
            const results = JSON.parse(data || '[]');

            // Filter results by className and optionally by exam if provided
            const classResults = results.filter(result => {
                if (exam) {
                    return result.studentClass.toLowerCase() === className.toLowerCase() && result.exam && result.exam.toLowerCase() === exam.toLowerCase();
                } else {
                    return result.studentClass.toLowerCase() === className.toLowerCase();
                }
            });

            // Aggregate marks for the selected subject across all students
            // Assuming each result has a 'subjectDetails' array with objects containing subjectName and marksScored properties
            let totalMarks = 0;
            let count = 0;

            classResults.forEach(result => {
                if (result.subjectDetails && Array.isArray(result.subjectDetails)) {
                    result.subjectDetails.forEach(subject => {
                        if (subject.subjectName.toLowerCase() === subjectName.toLowerCase()) {
                            const marks = Number(subject.marksScored);
                            if (!isNaN(marks)) {
                                totalMarks += marks;
                                count++;
                            }
                        }
                    });
                }
            });

            if (count === 0) {
                return res.status(404).json({ error: 'No marks found for the selected subject and class' });
            }

            // Calculate average marks
            const averageMarks = totalMarks / count;

            // For chart display, we can return average marks as a single value or simulate monthly data
            // Here, returning overall average marks as percentage
            res.status(200).json({ averageMarks: Number(averageMarks.toFixed(2)) });
        } catch (parseError) {
            console.error('Error parsing studentResults.json:', parseError);
            res.status(500).json({ error: 'Failed to parse student results' });
        }
    });
});

 
const adminDataPath = path.join(__dirname, 'data', 'adminData.json');

// Serve static files
app.use(express.static(path.join(__dirname, 'landingPage')));

// Endpoint to serve complaints data
app.get('/api/complaints', (req, res) => {
    const complaintsFilePath = path.join(__dirname, 'data', 'complaints', 'complaints.json');
    fs.readFile(complaintsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading complaints.json:', err);
            res.status(500).json({ error: 'Failed to load complaints data' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.get('/api/getAdminData', (req, res) => {
    fs.readFile(adminDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading adminData.json:', err);
            return res.status(500).json({ error: 'Failed to read admin data' });
        }
        try {
            const admins = JSON.parse(data || '[]');
            if (admins.length > 0) {
                // Ensure profilePicture field exists
                if (!admins[0].profilePicture) {
                    admins[0].profilePicture = '';
                }
                res.status(200).json(admins[0]);
            } else {
                res.status(404).json({ error: 'No admin data found' });
            }
        } catch (parseError) {
            console.error('Error parsing adminData.json:', parseError);
            res.status(500).json({ error: 'Failed to parse admin data' });
        }
    });
});

app.post('/api/updateAdminData', (req, res) => {
    const updatedAdmin = req.body;
    fs.readFile(adminDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading adminData.json:', err);
            return res.status(500).json({ error: 'Failed to read admin data' });
        }
        try {
            let admins = JSON.parse(data || '[]');
            if (admins.length > 0) {
                // Merge existing profilePicture if not provided in update
                if (!updatedAdmin.profilePicture && admins[0].profilePicture) {
                    updatedAdmin.profilePicture = admins[0].profilePicture;
                }
                admins[0] = { ...admins[0], ...updatedAdmin };
            } else {
                admins = [updatedAdmin];
            }
            fs.writeFile(adminDataPath, JSON.stringify(admins, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to adminData.json:', writeErr);
                    return res.status(500).json({ error: 'Failed to update admin data' });
                }
                res.status(200).json({ message: 'Admin data updated successfully' });
            });
        } catch (parseError) {
            console.error('Error parsing adminData.json:', parseError);
            res.status(500).json({ error: 'Failed to parse admin data' });
        }
    });
});

// API to update teacher data
app.post('/api/teacher/updateProfile', (req, res) => {
    const updatedTeacher = req.body;
    const teacherDataPath = path.join(__dirname, 'data', 'teacherData.json');

    // Ensure the file exists
    if (!fs.existsSync(teacherDataPath)) {
        return res.status(404).json({ error: 'Teacher data file not found' });
    }

    // Read existing data
    fs.readFile(teacherDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading teacherData.json:', err);
            return res.status(500).json({ error: 'Failed to read teacher data' });
        }

        let teachers = JSON.parse(data || '[]');
        // Find the teacher by ID or email (adjust as per your unique identifier)
        const teacherIndex = teachers.findIndex(
            teacher => teacher.id === updatedTeacher.id || teacher.email === updatedTeacher.email
        );

        if (teacherIndex !== -1) {
            // Update the existing teacher data
            teachers[teacherIndex] = {
                ...teachers[teacherIndex], // Keep existing fields
                ...updatedTeacher,         // Overwrite with updated fields
            };

            // Write updated data back to the file
            fs.writeFile(teacherDataPath, JSON.stringify(teachers, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to teacherData.json:', writeErr);
                    return res.status(500).json({ error: 'Failed to update teacher data' });
                }
                res.status(200).json({ message: 'Teacher data updated successfully' });
            });
        } else {
            res.status(404).json({ error: 'Teacher not found' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



