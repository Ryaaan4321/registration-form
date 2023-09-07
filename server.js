const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connecting  to MongoDB
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

// Serve this  registration form for the user

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/registration.html');
});

// Handling registration form submission
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Creating  a new user
    const newUser = new User({
        username,
        email,
        password
    });

    // Saving the user in our database
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
