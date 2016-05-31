(function(){
  "use strict";

  const mqtt = require("mqtt");
  const fs = require('fs');
  const Path = require('path');
  const awsIot = require('aws-iot-device-sdk');
  //const camera = require('./camera.js');

  // AWS Device Shadows
  // ---------------------------------------------------------------
  //  Device Shadows make it easier to build applications that 
  //  interact with your devices by providing always available 
  //  REST APIs. In addition, applications can set the desired 
  //  future state of a device without accounting for the devices 
  //  current state. AWS IoT will compare the difference between 
  //  the desired and last reported state, and command the device 
  //  to make up the difference.
  //
  //  The AWS IoT Device SDK makes it easy for your device to 
  //  synchronize its state with its shadow, and to respond to 
  //  desired future states set via the shadow.  

  // AWS IoT using the MQTT, HTTP, or WebSockets protocols.

  // Replace the values of '<YourUniqueClientIdentifier>' and '<YourAWSRegion>'
  // with a unique client identifier and the AWS region you created your
  // certificate in (e.g. 'us-east-1').  NOTE: client identifiers must be
  // unique within your AWS account; if a client attempts to connect with a
  // client identifier which is already in use, the existing connection will
  // be terminated.

  let device = awsIot.device({
     keyPath: 'aws_cert/9c937f2e5a-private.pem.key',
    certPath: 'aws_cert/9c937f2e5a-certificate.pem.crt',
      caPath: 'aws_cert/rootCA.pem',
    clientId: '18981',
      region: 'us-east-1'
  });

  //
  // Device is an instance returned by mqtt.Client(), see mqtt.js for full
  // documentation.
  //
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
    });

  device
    .on('message', function(topic, payload) {
      console.log('message', topic, payload.toString());
    });


})();