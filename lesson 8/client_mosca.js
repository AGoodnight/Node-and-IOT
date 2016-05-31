(function(){
  "use strict";

  const mqtt = require("mqtt");
  const fs = require('fs');
  const Path = require('path');

  //
  // Device is an instance returned by mqtt.Client(), see mqtt.js for full
  // documentation.
  //

  // const device = mqtt.connect('192.168.1.79:3000'); // HOME
  const device = mqtt.connect('192.168.77.164:3000'); // RBN
  // const device = mqtt.connect('192.168.1.79:1883');

  device
    .on('connect', function() {
      console.log('connect');
      device.subscribe('events/motion');
      device.publish("events/motion",
        JSON.stringify({
          message:"Darling there's something moving in your house.",
          who:"Jessica"
        }) 
      )
      mqtt.disconnect()
    });

  device
    .on('message', function(topic, payload) {
      console.log('message', topic, payload.toString());
    });


})();