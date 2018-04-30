const app = require("express")();
const http = require("http").Server(app);

app.get('/', function(request, response) {
    response.send("<h1> Hello John Wick! </h1>");
});

http.listen(8000, function() {
    console.log("Server is listening on port 8000");
})