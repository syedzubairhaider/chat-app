const todosController = require('../controllers').todos;

var appRouter = function(app) {
var path = require('path');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/msg', function(req, res) {
    msg=req.query.msg;
    session=req.query.session;
    let a = {}
    a.msg = msg
    a.session = session
    console.log('req.query.uri',req.query.uri)
    require('../../server/app.js').io.sockets.emit(`chat ${req.query.uri}`, msg,session )
    // res.send({"status": "success", "message": msg});
});
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/todos', todosController.create);

app.use('/', function(req,res){
  res.sendFile(path.resolve('dist/index.html'))
});

}

module.exports = appRouter;