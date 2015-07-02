//server.js

  /*  set up  */
  
  var express  = require('express');
  var app      = express();
  var mongoose = require('mongoose'); 
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');
  
  /*  configuration */
  
  mongoose.connect('mongodb://apollo.modulusmongo.net:27017/Va8xipyn');
  app.use(express.static(__dirname + '/public'));
  app.use(morgan('dev')); 
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(methodOverride());
  
  /*  listen  */
  
  app.use(methodOverride());
  console.log("To do app listening on port 8080");