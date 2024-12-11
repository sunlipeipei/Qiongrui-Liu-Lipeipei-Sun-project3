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

// API Routes
app.use('/api/post', post);
app.use('/api/user', user);

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
// to do: add MongoDB Link, change to our MongoDB
const mongoEndpoint = 'mongodb+srv://hunter:banana2@seawebdevfall2021.ykjok.mongodb.net/?retryWrites=true&w=majority&appName=SeaWebDevFall2021';
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


// serve frontend files (React/Vite)
const frontend_dir = path.join(__dirname, '..', 'frontend', 'dist'); 
app.use(express.static(frontend_dir));

// Redirect all unmatched routes to the frontend
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, 'index.html'));
});

// Start the server
app.listen(process.env.PORT || 3000, function() {
    console.log("Starting server now...")
})