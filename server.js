const express = require("express");
const app = express(); 

// Serve static files css, js, or images
app.use(express.static("public"));

// Default route to send
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
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
        // io - Broadcast chat message 
        io.emit("broadcast message", message);
    });
    // Fire disconnect
    socket.on("disconnect", function() {
        console.log("User disconnected!");
    })
})
