const express = require("express");
const logger = require('morgan');
const bodyParser = require("body-parser");
const app = express();

// app.use(logger('dev'));
app.use(express.static('./dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/routes.js")(app);
require("./routes/index.js")(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

var port = process.env.PORT || 3001;
var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});

module.exports = app;