const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB (Make sure you have MongoDB installed and running)
mongoose.connect('mongodb://localhost/registration_form_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve registration form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/registration.html');
});

// Handle registration form submission
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Create a new user
    const newUser = new User({
        username,
        email,
        password
    });

    // Save the user to the database
    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error registering user');
        } else {
            res.send('Registration successful');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
