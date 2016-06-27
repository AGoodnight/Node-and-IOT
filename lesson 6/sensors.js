(function(){

	// Sensors Module
	// This module handles all the GPIO sensor magic our RaspberryPi Server can manage!

	"use strict"

	const mqtt = require('mqtt');
	const gpio = require("rpi-gpio");
	const config = require('./server_config');

	let brokerIP = config.brokerIP;
	let port = config.MQTTPort;
	let client;

	// BOTTOM ROW
	let _moisture = 13;

	// COOL a class dude
	class sensorManager {
		
		constructor(){
			client = mqtt.connect('mqtt://'+brokerIP+':'+port,{clientId:"Jessica"});
		};

		start(){
			gpio.setup(_moisture, gpio.DIR_IN);
			gpio.on("change",function(channel,value){
				client = mqtt.connect('mqtt://'+brokerIP+':'+port,{clientId:"Jessica"});
			});

			client.on('connect',()=>{
				let _cm = 500+(Math.random()*200);
				let _ccm = 100+(Math.random()*100);

				let topic = '$DEVICE/Jessica/heap'
				let payload = '{';
				payload = payload.concat( new String( gpio.read(_moisture) ) )
				payload = payload.concat('}');

				client.subscribe(topic);
				client.publish(topic,payload);
				client.end();
			});
		};
	};

	// I just made a module!
	module.exports = new sensorManager;

})();