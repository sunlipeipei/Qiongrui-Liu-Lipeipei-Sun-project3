/**
 * Main server file
 */

const express = require('express');
const helper = require('./helper');
const post = require('./backend/routes/post.route');
const user = require('./backend/routes/user.route');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/post', post);
app.use('/api/user', user);

app.get('/', function(request, response) {
    const responseString = helper.returnRandomString();
    
    response.send('Hello from the express server. It says: ' + responseString);
})

app.post('/', function(request, response) {

    response.send("This response is preventing the later API");

})

app.post('/', function(request, response) {

    response.send('Hello from the POST API in the Express server');
})

// to do: add MongoDB Link
const mongoEndpoint = '';
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.listen(3000, function() {
    console.log('Server started');
})
