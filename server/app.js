const express = require("express");
const bodyParser = require("body-parser");
const webpack = require("webpack")
const webpackMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const webpackConfig = require("../webpack.config.js")
const app = express();

const compiler = webpack(webpackConfig)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

require("./routes/routes.js")(app)
var socketIO = require('socket.io')
var port = process.env.PORT || 3001
let io
var server = app.listen(port, function () {
    console.log(`App listening at http://${server.address().port}`)
});

io = socketIO(server)

app.io = io
app
    .io
    .on('connection', function (socket) {
        socket.emit('news1', '1')
    });

module.exports = app