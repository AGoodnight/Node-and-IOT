"use strict"

const mosca = require('mosca');

// Storage Layer ---------
const pubsub = {
  type:'mongo',
  url:'mongodb://127.0.0.1:27017/jessica',
  pubsubCollection:'rabbit',
  mongo:{}
};
// -----------------------

const settings = {
	port:2885,
	backend:pubsub,
	persistence: {
	    factory: mosca.persistence.Memory
	},
};

const server = new mosca.Server(settings);
server.on('ready',setup);

function setup(){
	console.log('Mosca server is up and running');
}

// Realtime Layer -----------------
server.published = function(packet, client, cb){
	if(packet.topic.indexOf('echo') === 0){
		return cb();
	}

	var newPacket = {
		topic:'echo/' + packet.topic,
		payload:packet.payload,
		retain:packet.retain,
		qos:packet.qos
	};

	console.log('New Packet: ',newPacket);
	server.publish(newPacket,cb);
}
// -----------------------

 // fired whena  client is connected
server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});
 
// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published : ', packet.payload);
});
 
// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
  console.log('subscribed : ', topic);
});
 
// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
  console.log('unsubscribed : ', topic);
});
 
// fired when a client is disconnecting
server.on('clientDisconnecting', function(client) {
  console.log('clientDisconnecting : ', client.id);
});
 
// fired when a client is disconnected
server.on('clientDisconnected', function(client) {
  console.log('clientDisconnected : ', client.id);
});