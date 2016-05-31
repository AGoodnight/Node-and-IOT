NodeJS to IOT Lessons
=======

<h5>Lesson 0</h5>
<p>We will develop a module that watches for a directories contents to change. Once it detects a change it will emit an event that will set update a text file. This text file will list the names of all the files in the directory. So when the directory changes, the file also updates.</p>

<ul>
<li>NodeJs File System Module: <a href='https://nodejs.org/api/fs.html'>https://nodejs.org/api/fs.html</a></li>
</ul>

<h5>Lesson 1</h5>
<p>We will begin writing in es6, since node supports it. We will develop a module that incorporates web sockets and promises.</p>

<ul>
<li>Bluebird ( promise node package ): <a href='http://bluebirdjs.com/docs/features.html'>http://bluebirdjs.com/docs/features.html</a></li>
<li>Socket.io: <a href='http://socket.io/docs/server-api/'>http://socket.io/docs/server-api/</a></li>
</ul>

<h5>Lesson 2</h5>
<p>We will develop a set of modules that will produce a single page app in jade, we will use express-generator to create the scaffolding and we will stick with es5, as the generator produces es5. We will extend the default application generated by express to have additional routes and to link those routes to node events.</p>

<ul>
<li>NodeJS Events: https://nodejs.org/api/events.html</a></li>
<li>Jade: <a href='http://jade-lang.com/api/'>http://jade-lang.com/api/</a></li>
<li>Express: <a href='http://expressjs.com/en/starter/generator.html'>http://expressjs.com/en/starter/generator.html</a></li>
</ul>

<h5>Lesson 3</h5>
<p>We will develop a simple angular one page app with the help of ui-router and express, Here we will modify our generated files to conform to es6 variable declaration best practices, we will introduce the concept of 'constants' and talk about how 'var' has become 'let' and how this affects our scopes. We will run the local server with Nodea also.</p>

<ul>
<li>Angular: <a href='http://jade-lang.com/api/'>http://jade-lang.com/api/</a></li>
<li>Angular-UI : ui-router: <a href='http://expressjs.com/en/starter/generator.html'>http://expressjs.com/en/starter/generator.html</a></li>
<li>RequireJS: <a href='http://expressjs.com/en/starter/generator.html'>http://expressjs.com/en/starter/generator.html</a></li>
<li>Bootstrap: <a href='http://expressjs.com/en/starter/generator.html'>http://expressjs.com/en/starter/generator.html</a></li>
</ul>

<h5>Lesson 4</h5>
<p>We will further develop our app from lesson 3.  We will utilize web sockets and capture input from the user and send the input to AWS Dynamo DB for our database. We will also utilize Nginx to serve static content and handle cacheing. We will end up with an alternative to the MEAN stack, a kind of DEAN stack coprised of DynamoDB, Express, Angular and Nginx.</p>

<h5>Lesson 5</h5>
<p>We will create an MQTT protocol broker (server/backend system) using a NodeJS package called 'mosca'. We will then also create an MQTT client using the node package 'mqtt'. The server will be setup to consume messages an the client will simply publish a topic and then subscribe to it as well.</p>

<h5>Lesson 6</h5>
<p>We will build an MQTT Network, MQTT
Sync Mosquito Broker (node) on a Raspberry Pi with AWS IOT and a Dynamo Database. Mosquito Client on Ethernet board - collects multiple client messages, and sends them to the raspberry. ( c++ ). Mosquito Client on Sensor Spike sends mutt information to ethernet board. ( c++ )
</p>
