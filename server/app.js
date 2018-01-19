const express = require("express");
const logger = require('morgan');
const bodyParser = require("body-parser");
const app = express();



// app.use(logger('dev'));
app.use(express.static('./dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let http = require('http')
// let app = express()
// let server = http.createServer(app)

// io = io.listen(server)
var socketIO = require('socket.io');
var port = process.env.PORT || 3001;
let io
var server = app.listen(port, function () {

    console.log(`App listening at http://${server.address().port}`)
    // console.log("Listening on port %s...", server.address().port);
});


// if (settings.env != 'test') {
//   let server = app.listen(settings.port, () => {

    // let host = server.address().address
    // let port = server.address().port
//   })
// }
  io = socketIO(server);

app.io = io
app.io.on('connection', function (socket) {
  socket.emit('news1', '1');
});

require("./routes/routes.js")(app);
// require("./routes/index.js")(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));
module.exports = app;