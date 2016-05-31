var mqtt = require('mqtt');

var client = mqtt.connect({ port:2885, host:'localhost'});

client.on('connect',function(){
  client.subscribe('presence');
  client.publish('presence','I am a ham sandwich');
});

client.on('message',function(topic,message ){
  //console.log(message); -- returns a Buffer
  console.log(message.toString()); // interprets Buffer to string
  client.end(); // closes client connection
});
