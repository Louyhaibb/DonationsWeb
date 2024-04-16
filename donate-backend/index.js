const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to DB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // Connection successful
        console.log('👓 Connected to DB')
    })
    .catch((error) => {
        // Handle connection error
        console.log('Connection Error => : ', error.message)
    });

var corsOptions = {
    credentials: true,
    origin: [
        "http://localhost:3000",
    ]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use(express.static("public"))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Donate application." });
});

// Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const itemRoute = require('./routes/items');
const itemRequestRoute = require('./routes/itemRequests');
const dashboardRoute = require('./routes/dashboard');

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/items', itemRoute);
app.use('/api/itemRequests', itemRequestRoute);
app.use('/api/dashboard', dashboardRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🛺  API Server UP and Running on port ${PORT}.`);
});