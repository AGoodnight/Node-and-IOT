(function(){
	"use strict"
	const raspicam = require('raspicam');
	//const gpio = require('rpi-gpio');
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
			
			gpio.setMode(gpio.MODE_BCM);
			gpio.setup(23, gpio.DIR_IN, gpio.EDGE_BOTH); // motion

			gpio.on('change', (channel, value) => {
				console.log('--> Change on Channel ' + channel + ' value is now ' + value);
				
				if(channel === 23 && value === true && !this.isRecording){
					this.activate();
				}

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