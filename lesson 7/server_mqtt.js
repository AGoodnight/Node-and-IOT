(function(){
	"use strict"

	const config = require('./server_config.js');
	const io = require('./server_socket.js');
	const mosca = require('mosca');
	const StringDecoder = require('string_decoder').StringDecoder;
	const AWS = require('aws-sdk');
	const moment = require('moment');
	const mongo = require('mongodb');
	//const gpio = require('pi-gpio');
	

	let mongoPort = 27017;
	let mongoIP = '127.0.0.1';
	let brokerIP = config.brokerIP;
	let mongoCollection = "jessica";
	let mongoPublishIP = "mongodb://"+brokerIP+":"+mongoPort+"/"+mongoCollection;
	let mongoURL = 'mongodb://'+mongoIP+':'+mongoPort+'/'+mongoCollection;
	let _moscaLED = 7;
	let decoder = new StringDecoder('utf8');
	let awsRegion = 'us-east-1';

	// ------------ MQTT -------------
	// ===============================

	const database = {
	  type:'mongo',
	  url:mongoURL,
	  pubsubCollection:mongoCollection,
	  mongo:{}
	};

	const server_settings = {
		port:config.MQTTport,
		backend:database,
		persistence: {
		    factory: mosca.persistence.Memory
		}
	};

	// Declare MOSCA SERVER
	const mqtt_client = require('mqtt').connect('mqtt://'+brokerIP);
	const mosca_server = new mosca.Server(server_settings); // Local Storage for Local IP Dashboard
	const dynamoDocClient = new AWS.DynamoDB.DocumentClient({region: awsRegion}); // Remote Storage for Remote Dashboard (app)

	mosca_server.on('ready', () =>{
		
		// TODO: LED to indicate node is running, BLOCKING: 'permissions'
		// ----------------------------------------------------------------------------
		// gpio.open(_moscaLED, "output", function(err) {     // Open pin 16 for output
		//     gpio.write(_moscaLED, 1, function() {          // Set pin 16 high (1)
		//         gpio.close(_moscaLED);                     // Close pin 16
		//     });
		// });

		console.log('Mosca server is up and running');
	});

	// MOSCA On Publish Method
	mosca_server.published = function(packet, client, cb){

		let _length = 0;

		if(mongo){
			mongo.connect(mongoPublishIP,function(err,db){
				console.log(err);
				db.collection(mongoCollection,function(error,collection){
					collection.count({}, 
						function(error, numOfDocs) {
						    _length = numOfDocs+1;
						    publishTopic(packet, client, cb, _length);
					});
				});
			});
		}else{
			console.log('No Mongo Found, cannot work best');
		}
		
	}

	// MOSCA SERVER EVENTS
	// fired when a client is connected
	mosca_server.on('published', function(packet,client) {
	  console.log('= client published', client.id, packet);
	});

	mosca_server.on('clientConnected', function(client) {
	  console.log('+ client connected', client.id);
	});
	 
	// fired when a client subscribes to a topic
	mosca_server.on('subscribed', function(topic, client) {
	  console.log('>> subscribed : ', topic);
	});
	 
	// fired when a client subscribes to a topic
	mosca_server.on('unsubscribed', function(topic, client) {
	  console.log('<< unsubscribed : ', topic);
	});
	 
	// fired when a client is disconnecting
	mosca_server.on('clientDisconnecting', function(client) {
	  console.log('-- clientDisconnecting : ', client.id);
	});
	 
	// fired when a client is disconnected
	mosca_server.on('clientDisconnected', function(client) {
	  console.log('- clientDisconnected : ', client.id);
	});

	
	// SOCKET IO
	// -------------------------

	io.on('connection',function(socket){
		
		socket.on('subscribe',function(data){
			console.log('Subscribing to websocket');
			socket.join(data,topic);
			mqtt_client.subscribe(data.topic);
		});

		socket.on('publish',function(data){
			console.log('Publishing to websocket');
			socket.join(data,topic);
			mqtt_client.publish(data.topic,data.payload);
		});

	});

	mqtt_client.on('message', function (topic, payload, packet) {
	    console.log(topic+'='+payload);
	    io.sockets.emit('mqtt',{'topic':String(topic),
					            'payload':String(payload)});
	});


	// HELPERS
	function publishTopic(packet,client,cb,newID){

		if(decoder.write(packet.topic).indexOf('$SENSOR') > -1 ||
			decoder.write(packet.topic).indexOf('$DEVICE') > -1 ){

			let timestamp = moment().format('LLLL');

			let putItem = dynamoDocClient.put({
				Item:{
					id:newID,
					timestamp:timestamp,
					topic:decoder.write(packet.topic),
					payload:decoder.write(packet.payload)
				},
				TableName:"Jess"
			},function(err, data){
			    if (err !== null) {
				    console.log("!!! ERROR:",err); // an error occurred
			    } else {
				    console.log("^ Uploaded to --> AWS: "); // successful response
				    console.log("--------------------");
				    console.log("--------------------");
			    }
			});
			console.log('Published: ', packet.topic,' ||| ', decoder.write(packet.payload));
		}else{
		}
	}

	module.exports = mosca_server;

})();