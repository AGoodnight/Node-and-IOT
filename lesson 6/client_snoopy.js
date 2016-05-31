(function(){
	"use strict"
	
	const mqtt = require('mqtt');
	const config = require('./server_config');

	let brokerIP = config.brokerIP;
	let port = config.MQTTPort;
	let client = mqtt.connect('mqtt://'+brokerIP+':'+port,{clientId:"Snoopy"});

	client.on('connect',()=>{
		
		let _ct = 15+(Math.random()*15);
		let _cm = 400+(Math.random()*200);
		let _cp = 100+(Math.random()*20);

		let topic = '$DEVICE/Snoopy/environment'
		let payload = '{ "temperature":"'+_ct+'","moisture":"'+_cm+'","pressure":"'+_cp+'" }'
		
		client.subscribe(topic);
		client.publish(topic,payload);
		client.end();
	});

})();