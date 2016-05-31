(function(){
  "use strict";

  const mqtt = require("mqtt");
  const fs = require('fs');
  const Path = require('path');
  const io  = require('socket.io').listen(5000);

  /*ws://myHost:8080/foobar?clientId=myClient&username=foo&password=myPassword&qos=1*/

  //
  // Device is an instance returned by mqtt.Client(), see mqtt.js for full
  // documentation.
  //

  // const device = mqtt.connect('192.168.1.79:3000'); // HOME
  const device = mqtt.createClient(3000,'192.168.77.163:3000'); // RBN
  // const device = mqtt.connect('192.168.1.79:1883');

  device
    .on('connect', (connack) => {
      console.log('connect');
      device.subscribe('seismic/reading');
      device.publish("seismic/reading",2040550);
      mqtt.disconnect()
  });

  device
    .on('message', (topic, payload, packet) => {
      io.sockets.in(topic).emit('mqtt',{'topic': String(topic), 'payload':String(message)});
      console.log('message', topic, payload.toString());
      console.log('packet', packet);
  });

  device
    .on('error', (error) => {
      console.log('error: ', error);
  });


})();