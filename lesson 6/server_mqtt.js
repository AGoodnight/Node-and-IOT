#!/usr/bin/env node
(function(){
	"use strict"

	const app = require("./app.js");
	const config = require("./server_config.js");
	//const sensors = require("./sensors.js");

	const mosca = require("mosca");
	const StringDecoder = require("string_decoder").StringDecoder;
	const AWS = require("aws-sdk");
	const moment = require("moment");
	const mongo = require("mongodb");
	//const gpio = require("rpi-gpio");
	

	let mongoPort = 27017;
	let mongoIP = "127.0.0.1";
	let brokerIP = config.brokerIP;
	let mongoCollection = "jessica";
	let mongoPublishIP = "mongodb://"+brokerIP+":"+mongoPort+"/"+mongoCollection;
	let mongoURL = "mongodb://"+mongoIP+":"+mongoPort+"/"+mongoCollection;
	let decoder = new StringDecoder("utf8");
	let awsRegion = "us-east-1";

	// TOP ROW
	let _moscaLED = 20;
	//gpio.setup(_moscaLED, gpio.DIR_OUT);

	// ------------ MQTT -------------
	// ===============================

	const database = {
	  type:"mongo",
	  url:mongoURL,
	  pubsubCollection:mongoCollection,
	  mongo:{}
	};

	const server_settings = {
		port:config.MQTTport,
		backend:database,
		logger:{
			//level:'debug'
		},
		persistence: {
		    factory: mosca.persistence.Memory
		}
	};

	// Declare MOSCA SERVER
	const mqtt_client = require("mqtt").connect("mqtt://"+brokerIP);
	const mosca_server = new mosca.Server(server_settings); // Local Storage for Local IP Dashboard
	const dynamoDocClient = new AWS.DynamoDB.DocumentClient({region: awsRegion}); // Remote Storage for Remote Dashboard (app)

	mosca_server.on("ready", () =>{
		//gpio.write(_moscaLED,true);
		//sensors.start();
 		console.log("Mosca server is up and running");
	});

	// MOSCA On Publish Method
	mosca_server.published = function(packet, client, cb){

		let _length = 0;

		if(mongo){
			mongo.connect(mongoPublishIP,function(err,db){

				if(err){
					console.log("ERROR: ");
					console.log(err);
				}else{
					console.log("DB: ");
					console.log(db);
				}

				db.collection(mongoCollection,function(error,collection){
					collection.count({topic:{
						$in:[
							/\$DEVICE\//,
							/\$SENSOR\//
							]
						}},
						function(error, numOfDocs) {
						    _length = numOfDocs+1;
						    console.log("NUMBER OF LOGS MONGO LOCAL: ",numOfDocs);
						    publishTopic(packet, client, cb, _length);
					});
				});
			});
		}else{
			console.log("No Mongo Found, cannot work best");
		}
		
	}

	// MOSCA SERVER EVENTS
	// fired when a client is connected
	mosca_server.on("published", function(packet,client) {
	  console.log("= client published", client.id, packet);
	});

	mosca_server.on("clientConnected", function(client) {
	  console.log("+ client connected", client.id);
	});
	 
	// fired when a client subscribes to a topic
	mosca_server.on("subscribed", function(topic, client) {
	  console.log(">> subscribed : ", topic);
	});
	 
	// fired when a client subscribes to a topic
	mosca_server.on("unsubscribed", function(topic, client) {
	  console.log("<< unsubscribed : ", topic);
	});
	 
	// fired when a client is disconnecting
	mosca_server.on("clientDisconnecting", function(client) {
	  console.log("-- clientDisconnecting : ", client.id);
	});
	 
	// fired when a client is disconnected
	mosca_server.on("clientDisconnected", function(client) {
	  console.log("- clientDisconnected : ", client.id);
	});



	// HELPERS
	function publishTopic(packet,client,cb,dblength){

		//console.log("AWS Inactive, not publishing to remote");
		if(decoder.write(packet.topic).indexOf("$SENSOR") > -1 ||
			decoder.write(packet.topic).indexOf("$DEVICE") > -1 ){

			let timestamp = moment.utc().format();

			let putItem = dynamoDocClient.put({
				Item:{
					id:dblength,
					client:client.id,
					timestamp:timestamp,
					topic:decoder.write(packet.topic),
					payload:decoder.write(packet.payload)
				},
				TableName:"jessica"
			},function(err, data){
			    if (err !== null) {
			    	console.log("====================");
				    console.log("!!! ERROR:",err); // an error occurred
				    console.log("====================");
			    } else {
			    	console.log("====================");
				    console.log("^ Uploaded to --> AWS: "); // successful response
				    console.log("====================");

			    }
			});
			console.log("Published: ", packet.topic," ||| ", decoder.write(packet.payload));
		}else{
		}
	}

	app.listen(config.FEport);

	module.exports = mosca_server;

})();