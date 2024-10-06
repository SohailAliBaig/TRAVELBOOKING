// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 6666;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// User Registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    fs.readFile('users.json', 'utf8', (err, data) => {
        let users = [];
        if (!err && data) {
            users = JSON.parse(data);
        }

        if (users.some(user => user.email === email)) {
            return res.status(400).send('User already exists.');
        }

        users.push({ username, email, password });
        fs.writeFile('users.json', JSON.stringify(users), err => {
            if (err) return res.status(500).send('Error saving user.');
            res.send('User registered successfully.');
        });
    });
});

// User Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err || !data) return res.status(500).send('Error reading users.');
        const users = JSON.parse(data);
        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }
        res.send('Login successful.');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
