"use strict";

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const socketio = require('socket.io');

let app = express();
let io = socketio();
app.io = io;

const routes = require('./routes/index');//(io);
const users = require('./routes/users');//(io);

app.io.on('connection',function(data){
	console.log('-------------> Socket Connected');
})

app.io.on('myEvent',function(data){
	console.log('-------------> My event fired');
});

app.use('/',express.static(__dirname));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
 
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use( (err, req, res, next) => {
    res.status(err.status || 500);
  });
}

// production error handler
// no stacktraces leaked to user
app.use( (err, req, res, next) => {
  res.status(err.status || 500);
});


module.exports = app;
