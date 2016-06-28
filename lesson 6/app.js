(function(){

	"use strict"
	const express = require('express');
	const path    = require("path");
	const fs = require('fs');
	const AWS = require('aws-sdk');
	const moment = require('moment');
	const _ = require('underscore');
	//const rpi = require('rpi-gpio');


	let awsRegion = 'us-east-1';
	let dynamo = new AWS.DynamoDB.DocumentClient({region: awsRegion});
	let app = express();
	let maxItemsReturned = 40;

	// GPIO Setup
	// ----------------------
	//rpi.setMode(rpi.MODE_BCM);
	//rpi.setup(19,rpi.DIR_OUT);

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

		let client = "Lenny";
		let params = {
			TableName:"jessica",
			IndexName:"client-timestamp-index",
			KeyConditions:{
				client:{
					ComparisonOperator:"EQ",
					AttributeValueList: [
				        client
			        ]
				}
			}
		};	

		dynamo.query(params,(err,data)=>{

			onAPILog(err,data,req.url);
			let chunk = limitResults(maxItemsReturned,data.Items);
			
			response.send({
				title:"Lenny",
				description:"I detect gas",
				items:chunk,
				client:client
			});
		});
	});

	app.get('/api/barry',(req,response)=>{

		let client = "Barry";
		let params = {
			TableName:"jessica",
			IndexName:"client-timestamp-index",
			KeyConditions:{
				client:{
					ComparisonOperator:"EQ",
					AttributeValueList: [
				        client
			        ]
				}
			}
		};	

		dynamo.query(params,(err,data)=>{

			onAPILog(err,data,req.url);
			let chunk = limitResults(maxItemsReturned,data.Items)

			response.send({
				title:"Barry",
				description:"I watch over a plant, see below",
				items:chunk,
				client:client
			});
		});
		
	});

	app.get('/api/snoopy',(req,response)=>{

		let client = "Snoopy";
		let params = {
			TableName:"jessica",
			IndexName:"client-timestamp-index",
			KeyConditions:{
				client:{
					ComparisonOperator:"EQ",
					AttributeValueList: [
				        client
			        ]
				}
			}
		};	

		dynamo.query(params,(err,data)=>{
			
			onAPILog(err,data,req.url);
			let chunk = limitResults(maxItemsReturned,data.Items)

			response.send({
				title:"I am snoopy",
				description:"I take care of a plant",
				items:chunk,
				client:client
			});

		});
		
	});

	function limitResults(threshold,items){
		let _all = [];
		for ( var item of items ){
			/* for-of offers a loop like angular.each, 
			   order of the array/object is maintainted */

			// console.log( moment().from(item.timestamp) ); // get the time since log
			_all.push(item.id);
		};

		let chunk = _.last( _.sortBy(items,(thisItem)=>{
			return thisItem.id;
		}),threshold);

		//console.log(chunk)

		return chunk;
	}

	function onAPILog(err,data,endpoint){
		
		//rpi.write(19,true);
		//setTimeout(1000,rpi.write(19,false))

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