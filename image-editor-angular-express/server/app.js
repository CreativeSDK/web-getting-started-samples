var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var chalk = require('chalk');
var bodyParser = require('body-parser');

var clientPath = path.join(__dirname, '../client');
var buildPath = path.join(__dirname, '../client/build');    // for gulped files
var indexHtmlPath = path.join(__dirname, './index.html');
var nodePath = path.join(__dirname, '../node_modules');
var imagePath = path.join(__dirname, './images');

/* 
Meaniscule doesn't use Bower by default. To use Bower,
uncomment the following line and the related `app.use` line below.
*/
// var bowerPath = path.join(__dirname, '../bower_components');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(clientPath));
app.use(express.static(buildPath));
app.use(express.static(nodePath));
app.use(express.static(imagePath));
// app.use(express.static(bowerPath));

/* 
Provides a 404 for times 
Credit to `fsg` module for this one!
*/
app.use(function (req, res, next) {

  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next(null);
  }

});

// Routes
//// Index/Home
app.use('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, './index.html'));
});


// Errors
//// Not found
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//// Server issues
app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);

});


module.exports = app;

