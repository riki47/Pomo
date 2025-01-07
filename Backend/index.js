const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3000;

//MIDDLEWARE
app.use(express.json());
// app.use(cors());

//model
const EmployeeModel = require('./models/Employee');

app.get('/',async(req,res)=>{
    res.json("Hello World");
})


app.post('/register', async (req, res) => {
    try {
        const {email} = req.body;
        const user = await EmployeeModel.findOne({ email});
        if(user)return res.status(202).json({ message: 'User already exists' });
        const newUser = await EmployeeModel.create(req.body);
        console.log(newUser);
        res.status(201).json({ message: 'Registration successful!', data: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving data', error: err });
    }
});
let currentUser = null; // Track the current logged-in user (not ideal for production, consider using sessions or JWTs)

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email and password
        const user = await EmployeeModel.findOne({ email, password });

        if (user) {
            // If the user is found, save the name to `currentUser`
            currentUser = user;
            // Respond with success
            res.status(200).json({ message: 'Login successful!', data: user });
        } else {
            // If no user found, respond with not found error
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in', error: err });
    }
});

app.get('/', async (req, res) => {
    try {
        // If there's no logged-in user
        if (!currentUser) {
            return res.status(403).json({ message: 'Please login first' });
        }
        console.log(currentUser);
        // If the user is logged in, return the user name
        res.json(currentUser);
    } catch (error) {
        res.status(500).send('Error retrieving employees: ' + error.message);
    }
});

app.get('/api', async (req, res) => {
    //const { userId } = req.params;
    if (currentUser) {
        res.json(currentUser);
    } else {
        res.status(404).json({ message: 'Settings not found' });
    }
});

app.put('/api/settings', async (req, res) => {
    try {
        const { email, focusTime, breakTime } = req.body;
        if (!email || focusTime == null || breakTime == null) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find user by email and update their settings
        const updatedUser = await EmployeeModel.findOneAndUpdate(
            { email }, // Query to find the user by email
            { focus: focusTime, break: breakTime }, // Fields to update
            { new: true } // Return the updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
        console.log('User settings updated successfully:', updatedUser);
    } catch (err) {
        console.error('Error updating settings:', err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});


//DATABASE CONNECTION
mongoose.connect('mongodb+srv://rithwikkoul180204:fM28b5VHogVdXTwD@clusterone.b4n9i.mongodb.net/testing');

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
); 