(function(){

	const app = require('./app.js');
	const config = require('./server_config.js');
	const http = require('http').Server(app);
	const io = require('socket.io').listen(http);

	http.listen(config.FEport);

	module.exports = io;

})();