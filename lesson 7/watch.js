(function(){
	"use strict"
	const chokidar = require('chokidar');
	const websockets = require('./websockets.js');

	/*watch('stream/image*.jpg',onChange);*/
	let watcher = chokidar.watch('stream/*.jpg',{
	  ignored: /[\/\\]\./,
	  persistent: true,
	  usePolling:true,
	  inteval:100
	});

	watcher.on('change', (path) => {
		console.log('image ${path} changed !');
	});

	module.exports = watcher;
})