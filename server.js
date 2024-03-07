var express = require('express');// to support express.js
var bodyParser = require('body-parser');// to support JSON-encoded bodies
var app = express(); // to create our app w/ express
var http = require('http').Server(app); // to create a server with express
var io = require('socket.io')(http); // to create a socket.io server
var mongoose = require('mongoose'); // to connect to a MongoDB database

mongoose.connect('mongodb://localhost:27017/nodejschat'); // to connect to a MongoDB database

app.use(express.static(__dirname + '/public/')); // to set the static files location /public/img will be /img for users
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // to support URL-encoded bodies

// Mongodb collections definition
var Message = mongoose.model('Message', {
    name: String,
    message: String
});

var messages = [
    {name: 'John', message: 'Hello, John!'},
    {name: 'Mary', message: 'Hello, Mary!'},
    {name: 'Bob', message: 'Hello, Bob!'},
];

// find single message by message text
app.get('/ex1', async function(req, res) {
    var msg = await Message.findOne({message: 'Hello anyone?'}); //return the first message with the given condition {}
    res.send(msg)
});

// find all messages with the given condition
app.get('/ex2', async function(req, res) {
    var msg = await Message.find({message: 'Hello anyone?'}); //return all messages with the given condition []
    res.send(msg)
});

// find single message by _id of collection
app.get('/ex3', async function(req, res) {
    var msg = await Message.findById("65ea12b13fd6b3334383d5ab"); //return the first message with the given _id {}
    res.send(msg)
});

// update all messages with the given _id of collection
app.get('/ex4', async function(req, res) {
    var msg = await Message.findByIdAndUpdate("65ea12b13fd6b3334383d5ab", {message: 'Hello, Mary!'}); //update by id
    console.log(msg);
    if(msg === null) {
        res.send("Data not found!")
        return;
    }
    res.send("Data updated successfully!")
});

// delete all messages with the given _id of collection
app.get('/ex5', async function(req, res) {
    var msg = await Message.findByIdAndDelete("65ea12b13fd6b3334383d5ab"); //update by id
    console.log(msg);
    if(msg === null) {
        res.send("Data not found!")
        return;
    }
    res.send("Data deleted successfully!")
});


// open help.html page
app.get('/help', function(req, res) {
    // Access query string parameters - for an example only
    const name = req.query.name;
    const age = req.query.age;
    console.log(name, age);
    
    res.sendFile(__dirname + '/public/help.html');
});

app.get('/help/:userId', function(req, res) {
    // Access URL parameters - for an example only
    const userId = req.params.userId;
    console.log(userId);
    
    res.sendFile(__dirname + '/public/help.html');
});

// return all messages
app.get('/messages', async function(req, res) {
    var msg = await Message.find({});
    res.send(msg)
});

// create a new message
app.post('/messages', function(req, res) {
    console.log(req.body);

    var message = new Message(req.body);
    message.save();

    messages.push(req.body);
    //emit a message to all connected clients
    io.emit('message', req.body);
    res.sendStatus(200)
});

// test socket.io connection
io.on('connection', function(socket) {
    console.log('a user connected');
})

//var server = app.listen(3000, function() { //use as restful api
var server = http.listen(3000, function() { //use as websocket api
    console.log(`Example app listening on port ${server.address().port}!`);
});