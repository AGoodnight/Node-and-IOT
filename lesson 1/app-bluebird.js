"use strict";

// Node Modules
// -----------------------------------
const http = require('http');
const promise = require('bluebird');
const fs = require('fs');
const socketIO = require('socket.io');

// Module Setup
// -----------------------------------
let socket = null;
let server = requestIndex().then(function(html){

	return http.createServer( function(request,response){

		// This will return the template from the requestIndex() promise
		response.writeHeader(200, {"Content-Type": "text/html"});  
	    response.write(html);  
	    response.end();

	}).listen(9999,onListen); // START LISTENING

}).then(function($server){

	/* 
		Once we have a valid Server instance returning our index file
		we continue the configuration of our module
	*/

	socket = socketIO($server);
	socket.on('connection',function(){
		console.log('Hello you have connected to a socket!');
	});

});

// Methods 
/* 
	In Javascript function declarations are always 
	initialized before any variable defintions,
	regardless of the order in which you write them.

	I keep my functions/methods near the bottom of the
	script, it's simply a convention to keep things clean
*/
// ------------------------------------
function requestIndex(){
	return new promise( function( resolve, reject ){
		resolve( getTemplate('./index.html') );
	});
}

function getTemplate($path){
	return new promise( function(resolve,reject){
		fs.readFile($path,function(err,html){
			if(err) reject(err);
			else resolve(html);
		});
	})
}

function onListen(){
	console.log('listening to server')
}