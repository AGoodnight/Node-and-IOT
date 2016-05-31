(function(){
	"use strict"
	
	const mqtt = require('mqtt');
	const config = require('./server_config');

	let brokerIP = config.brokerIP;
	let port = config.MQTTPort;
	let client = mqtt.connect('mqtt://'+brokerIP+':'+port,{clientId:"Lenny"});

	client.on('connect',()=>{
		let _cm = 500+(Math.random()*200);
		let _ccm = 100+(Math.random()*100);

		let topic = '$DEVICE/Lenny/gas'
		let payload = '{ "MQ4":{ "type":"Methane","current":"'+_cm+'" }, "MQ7B":{ "type":"CarbonMonoxide","current":"'+_ccm+'" } }'
		
		client.subscribe(topic);
		client.publish(topic,payload);
		client.end();
	});

})();