//server.js

  /*  set up  */
  console.log("Starting!");
  var express  = require('express');
  var app      = express();
  var mongoose = require('mongoose'); 
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');
  
  /*  configuration */
  
  mongoose.connect('mongodb://admin:admin@ds035740.mongolab.com:35740/mw_test');
  app.use(express.static(__dirname + '/public'));
  app.use(morgan('dev')); 
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(methodOverride());
  
  /*  define model  */
  
  var Todo = mongoose.model('Todo', {
    text : String
  });
  
  /*  routes  */
  
  //get all todos
  app.get('/api/todos', function(req, res) {
    console.log("I am getting all todos");
    Todo.find(function(err, todos) {
      console.log("I am sending todos", todos);
      if (err)  res.send(err);
      else res.json(todos);
    });
  });
  
  //create a todo
  app.post('/api/todos', function(req, res) {
    console.log('creating a todo');
    Todo.create({
      text : req.body.text,
      done : false
    }, function(err, todo){
      if (err) res.send(err)
      else
      {
        Todo.find(function(err, todos) {
          if (err) res.send(err);
          res.json(todos);
        });
      }
    });
  });
  
  //delete a todo
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err)  res.send(err)
      else{
        Todo.find(function(err, todos) {
          if (err)  res.send(err);
          res.json(todos);
        });
      }
    });
  });
  
  /*  application */
  
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
  
  /*  listen  */
  app.listen(process.env.PORT)
  app.listen(8080);
  console.log("To do app listening on port 8080");