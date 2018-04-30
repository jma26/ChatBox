const express = require("express");

const app = express(); 

// Serve static files css, js, or images
app.use(express.static("public"));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.listen(8000, function() {
    console.log("Server is listening on port 8000");
})