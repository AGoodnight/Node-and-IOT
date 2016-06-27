(function(){

	"use strict"
	const express = require('express');
	const path    = require("path");
	const fs = require('fs');
	const AWS = require('aws-sdk');
	const rpi = require('rpi-gpio');


	let awsRegion = 'us-east-1';
	let dynamo = new AWS.DynamoDB.DocumentClient({region: awsRegion});
	let app = express();

	// GPIO Setup
	// ----------------------
	rpi.setMode(rpi.MODE_BCM);
	rpi.setup(19,rpi.DIR_OUT);

	// Express Setup
	// ----------------------

	app.use('/',express.static('/'));
	app.use('/static',express.static(__dirname + '/static'));
	app.use('/routes',express.static(__dirname + '/static/routes'));
	app.use('/bower_components',express.static(__dirname + '/static/bower_components'));
	app.use(express.static(path.dirname(require.resolve("mosca")) + "/public"));

	
	// Routes
	// ---------------------

	app.get('/',(req,response)=>{
		response.sendFile(path.join(__dirname+'/static/index.html'));

	});

	app.get('/api/lenny',(req,response)=>{
		let params = {
			TableName:"jessica",
			IndexName:"client-timestamp-index",
			KeyConditions:{
				client:{
					ComparisonOperator:"EQ",
					AttributeValueList: [
				        "Lenny"
			        ]
				}
			}
		};	

		dynamo.query(params,(err,data)=>{

			onAPILog(err,data,req.url);
			
			response.send({
				title:"Lenny",
				description:"I detect gas",
				items:data.Items
			});
		});
	});

	app.get('/api/barry',(req,response)=>{

		let params = {
			TableName:"jessica",
			IndexName:"client-timestamp-index",
			KeyConditions:{
				client:{
					ComparisonOperator:"EQ",
					AttributeValueList: [
				        "Barry"
			        ]
				}
			}
		};	

		dynamo.query(params,(err,data)=>{

			onAPILog(err,data,req.url);

			response.send({
				title:"Barry",
				description:"I watch over a plant, see below",
				items:data.Items
			});
		});
		
	});

	app.get('/api/snoopy',(req,response)=>{

		let params = {
			TableName:"jessica",
			IndexName:"client-timestamp-index",
			KeyConditions:{
				client:{
					ComparisonOperator:"EQ",
					AttributeValueList: [
				        "Snoopy"
			        ]
				}
			}
		};	

		dynamo.query(params,(err,data)=>{
			
			onAPILog(err,data,req.url);

			response.send({
				title:"I am snoopy",
				description:"I take care of a plant",
				items:data.Items
			});

		});
		
	});

	function onAPILog(err,data,endpoint){
		
		rpi.write(19,true);
		setTimeout(1000,rpi.write(19,false))

		if(err){
			console.log("!! --> ERROR on Query for " + endpoint);
			//console.log(err);
		}else{
			console.log("--> Successful Query on " + endpoint);
			//console.log(data);
		}
	}




	// EXPORTS =================

	module.exports = app;

})();