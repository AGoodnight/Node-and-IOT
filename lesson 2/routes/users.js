var express = require('express');
var router = express.Router();
var emitter = require('../our_modules/emitter');

var ourEmitter;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { 
  	title: 'users', 
  	message:'click here to load your new route',
  	link:'/users/roar' 
  });
});

// Here we pass an array of callbacks
router.get('/roar', [ makeRoar, dinosaur, lion ]);

function makeRoar(req,res,next){
	
	// This will define our EventEmitter variable
	// We do it here once again to illustrate thinking in terms of events
	// everytime this event/route occurs it will reinstantiate the emitter

	ourEmitter = new emitter().on('Roar!',function(data){
		res.render('user', { title:data.title, message:data.message });
	});

	next();
}

function dinosaur(req,res,next){
	
	ourEmitter.emit('Roar!',{
		title:'The Dinosaur Roars...',
		message:'"I am the mighty T-Rex!"'
	});
	
	/* 
		Notice when we omit next() that 'lion()' is never executed.
		Thats because the next() method is the method after this 
		method in the callback array for '/roar'
	*/
	
	// next(); 
}

function lion(req,res,next){
	
	ourEmitter.emit('Roar!',{
		title:'Mufasa Roars...',
		message:'"Scarrrrr!!!!"'
	});

	next();
}

module.exports = router;
