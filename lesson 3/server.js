(function(){
	"use strict";

	const express = require('express');
	const path = require('path');
	const favicon = require('serve-favicon');
	const logger = require('morgan');
	const cookieParser = require('cookie-parser');
	const bodyParser = require('body-parser');

	const routes = require('./routes/index');
	const users = require('./routes/users');

	let app = express();

	// view engine setup
	app.set('port', process.env.PORT || 7070);
	app.use('/',express.static(__dirname));
	 
	// uncomment after placing your favicon in /public
	app.use(logger('dev'));
	app.use('/', routes);
	app.use('/users', users);

	// ERROR HANDLING --------------------------------
	// catch 404 and forward to error handler
	app.use( (req, res, next) => {
	  let err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

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
})();
