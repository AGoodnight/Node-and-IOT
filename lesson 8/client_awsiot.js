(function(){
  "use strict";

  const mqtt = require("mqtt");
  const iot = require('aws-iot-device-sdk');
  const fs = require('fs');
  const Path = require('path');
  const topic = 'state/update';

  const iot_creds = {
    keyPath: './aws_cert/0a51cf0ae2-private.pem.key',
    certPath: 'aws_cert/0a51cf0ae2-certificate.pem.crt',
    caPath: './aws_cert/rootCA.pem',
    clientId: 'Jessica',
    region: 'us-east-1'
  };

  let device = iot.device(iot_creds);
  /*let shadow = iot.thingShadow(iot_creds);*/

  device.on("connect",() => {
    device.subscribe(topic);
    console.log('connect');
    // We can send JSON data by simply stringifying it.
    device.publish(
      topic,
      JSON.stringify({
      "message":"Darling there's something moving in your house.",
      "who":"Jessica"
    }));
  });
  
  device.on('error', () => {
    console.log('error');
    console.log(arguments);
  });

  device.on('reconnect', () => {
    console.log('reconnecting');
  });

  device.on("message", (topic,message) => {
    
    //console.log(message); --> returns a Buffer, so we convert it below:
    console.log(message.toString()); // interprets Buffer to string
    console.log(topic.toString());
    
    //client.end(); // closes client connection
  });

  /*shadow.on('connect',() => {
    console.log('connected shadow');
    console.log(arguments);
  });

  shadow.on('status',() => {
    console.log('shadow status');
    console.log(arguments);
  });

  shadow.on('delta',() => {
    console.log('shadow delta');
    console.log(arguments);
  });*/


})();
