/**
 * Main server file
 */

const express = require('express');
const helper = require('./helper');
const post = require('./routes/post.route');
const user = require('./routes/user.route');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const path = require('path')

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Debug
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});


// API Routes
app.use('/api/post', post);
app.use('/api/user', user);

// Catch-all debug middleware
app.use((req, res, next) => {
    console.log(`Unhandled route: ${req.method} ${req.url}`);
    next();
});

app.get('/', function(request, response) {
    const responseString = helper.returnRandomString();
    
    response.send('Hello from the express server. It says: ' + responseString);
})

// app.post('/', function(request, response) {

//     response.send("This response is preventing the later API");

// })

app.post('/', function(request, response) {

    response.send('Hello from the POST API in the Express server');
})

// MongoDB connection
const mongoEndpoint = 'mongodb+srv://averyl:T-aTmkTMsdPH7C3@seawebdev.jtp1r.mongodb.net/?retryWrites=true&w=majority&appName=SeaWebDev';
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


// serve frontend files (React/Vite)
const frontend_dir = path.join(__dirname, '..', 'frontend', 'dist'); 
app.use(express.static(frontend_dir));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Redirect all unmatched routes to the frontend
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, 'index.html'));
});

// Start the server
app.listen(process.env.PORT || 8000, function() {
    console.log("Starting server now...")
})