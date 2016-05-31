(function(){

	"use strict"
	const express = require('express');
	const path    = require("path");
	const fs = require('fs');
	const AWS = require('aws-sdk');

	let awsRegion = 'us-east-1';
	let dynamo = new AWS.DynamoDB.DocumentClient({region: awsRegion});
	let app = express();

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
			TableName:"Jess",
			IndexName:"topic-index",
			KeyConditions:{
				topic:{
					ComparisonOperator:"EQ",
					AttributeValueList: [
				        "$DEVICE/Lenny/gas"
			        ]
				}
			}
		};	

		dynamo.query(params,(err,data)=>{
			response.send({
				title:"Lenny",
				description:"I detect gas",
				items:data.Items
			});
		});
	});

	app.get('/api/barry',(req,response)=>{

		let params = {
			TableName:"Jess",
			IndexName:"topic-index",
			KeyConditions:{
				topic:{
					ComparisonOperator:"EQ",
					AttributeValueList: [
				        "$SENSOR/office/plant/environment"
			        ]
				}
			}
		};	

		dynamo.query(params,(err,data)=>{
			response.send({
				title:"Barry",
				description:"I watch over a plant, see below",
				items:data.Items
			});
		});
		
	});

	app.get('/api/snoopy',(req,response)=>{

		let params = {
			TableName:"Jess",
			IndexName:"topic-index",
			KeyConditions:{
				topic:{
					ComparisonOperator:"EQ",
					AttributeValueList: [
				        "$DEVICE/Snoopy/environment"
			        ]
				}
			}
		};	

		dynamo.query(params,(err,data)=>{
			response.send({
				title:"I am snoopy",
				description:"I take care of a plant",
				items:data.Items
			});
		});
		
	});




	// EXPORTS =================

	module.exports = app;

})();