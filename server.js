const bodyParser = require("body-parser");
const express = require("express");
const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false // False- Does not allow nested objects**
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Serve static files css, js, or images
app.use(express.static("public"));

// Get login html
app.get('/', function(request, response) {
    response.sendFile(__dirname + "/login.html");
})

// Post user login & redirect
app.post('/userLogin', function(request, response) {
    var user = request.body.user;
    response.redirect('/chat/' + user);
})

// Get index html (chat)
app.get('/chat/:user', function(request, response) {
    response.sendFile(__dirname + "/index.html");
});

// Server port
const server = app.listen(8000);

// Socket.io
const io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket) {
    console.log("User connected!");
    // Receive chat mesasge
    socket.on("chat message", function(message) {
        console.log("Message is: ", message);
        // io - Broadcast chat message to all
        io.emit("broadcast message", message);
    });
    // Fire disconnect
    socket.on("disconnect", function() {
        console.log("User disconnected!");
    })
})
