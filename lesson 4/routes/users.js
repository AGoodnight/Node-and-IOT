"use strict";

const server = require('../bin/www');
const app = require('../server');
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const promise = require('bluebird');
const bodyParser = require('body-parser');

const dynamoConfig = {
	region:'us-east-1'
};

let dynamo = new AWS.DynamoDB(dynamoConfig);
let client = new AWS.DynamoDB.DocumentClient(dynamoConfig);
let jsonParser = bodyParser.json()
let currentID;

/* GET users listing. */

router.put('/web-sockets/put',(req, res, next) => {
	console.log(req.body)
	postItem('web-sockets').then(function(response){
		console.log('end')
		res.send(response);
		res.end()
	});
});

router.get('/angular', (req, res, next) => {
	getItem('angular').then(function(response){
		currentID = response[0].id;
		res.send(response);
	});
});

router.get('/dynamo-db', (req, res, next) => {
	getItem('dynamo-db').then(function(response){
		currentID = response[0].id;
		res.send(response);
	});
});

router.get('/web-sockets', (req, res, next) => {
	getItem('web-sockets').then(function(response){
		currentID = response[0].id;
		res.send(response);
	});
});

router.get('/express', (req, res, next) => {
	getItem('express').then(function(response){
		currentID = response[0].id;
		res.send(response);
	});
});

router.get('/home', (req, res, next) => {
	getItem('home').then(function(response){
		currentID = response[0].id;
		res.send(response);
	});
});

function postItem(tag){
	
	return new Promise(function(resolve){

		console.log('Post Item ', currentID);
		
		let params = {
			TableName:'nodeLesson4',
			Key:{
				'id':{'N':currentID}, // for whatever reason the number type is still considered a string.
			},
			UpdateExpression: "SET active=:active",
			ExpressionAttributeValues:{
				":active":{'BOOL':false}
			},

		};

		dynamo.updateItem(params,function(err,data){

			console.log('-------> Post Item');

			if(err){
				console.log('error:',err);
			}else{
				console.log('data:',data);
			}

			resolve(data);
		});
	});
}

function getItem(tag){

	return new Promise(function(resolve){
		var params = {
		  	TableName:'nodeLesson4',
			IndexName:"tag-index",
		  	ExpressionAttributeNames:{
	          "#tag":"tag"
		  	},
		  	ExpressionAttributeValues:{
		  		":query":{ 'S':tag }
		  	},
		  	KeyConditionExpression:"#tag = :query"
		};

		var _parsedResponse = {};

		dynamo.query(params,function(err,response){
			response.Items.map(function(item){
				var n = 0;
				_parsedResponse[n] = {}
				for( var key in item){
					for( var value in item[key] ){
						_parsedResponse[n][key] = item[key][value];
					}
				}
				n++;
			});
			
			//console.log(_parsedResponse)
			resolve(_parsedResponse);
		});
	});
}

module.exports = router;
