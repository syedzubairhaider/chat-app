var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static('./dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var port = process.env.PORT || 3001;
var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});