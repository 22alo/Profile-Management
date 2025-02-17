const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());




let users = [];
let idCounter = 1;

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// Create a new user
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    const newUser = { id: idCounter++, name, email, age: age || null };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { name, email, age } = req.body;
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (age !== undefined) user.age = age;
    res.json(user);
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
});

app.listen(port, () => {
    console.log(`User Profile API running on http://localhost:${port}`);
});
