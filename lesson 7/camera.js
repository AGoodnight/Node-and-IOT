(function(){
	"use strict"
	const raspicam = require('raspicam');
	//const motion = require('node-motion');

	let camera = new raspicam({
		mode:'timelapse',
		output:'stream/image%06d.jpg',
		rotation:'270',
		encoding: "jpg",
		timelapse: 3000, // take a picture every 3 seconds
		timeout: 3600000
		// 1 hr 
	});

	// check for storage space
	// then repeat if free, otherwise upload and erase, then repeat
	// capture images only on motion

	camera.start();

	camera.on('exit',function(){
		camera.stop();
		// upload to s3
	})

	module.exports = camera;
})();