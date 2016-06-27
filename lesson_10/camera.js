(function(){
	"use strict"
	const raspicam = require('raspicam');
	const five = require('johnny-five');
	const board = new five.Board();

	console.log("NODE: loading camera.js");

	class motionCamera {
		
		constructor(timeout){

			console.log('+++ Creating Camera');
			
			this.isRecording = false;
			this.timeout = timeout;

			this.camera = new raspicam({
				mode:'timelapse',
				output:'stream/image%06d.jpg',
				rotation:'270',
				encoding: "jpg",
				timelapse: 3000, // take a picture every 3 seconds
				timeout: timeout
			});

			board.on('ready', () => {
				var motion = new five.Motion(23);

				// "calibrated" occurs once, at the beginning of a session,
				motion.on("calibrated", function() {
					console.log("calibrated");
				});

				// "motionstart" events are fired when the "calibrated"
				// proximal area is disrupted, generally by some form of movement
				motion.on("motionstart", function() {
					
				});

				// "motionend" events are fired following a "motionstart" event
				// when no movement has occurred in X ms
				motion.on("motionend", function() {
					this.activate();
				});
			});

			console.log('OnChange Declared');
		}

		activate(){
			console.log(">>> Starting Camera for ", this.timeout, ' seconds');

			this.isRecording = true;
			this.camera.start();
			this.camera.on('exit',function(){
				console.log("=== Stopping Camera");
				this.camera.stop();
				this.isRecording = false;
				// upload to s3
			});
		}

	};

	module.exports = motionCamera;

})();