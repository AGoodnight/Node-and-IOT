(function(){

	const http = require('./server_start.js')
	const websockets = require('socket.io').listen(http);

	websockets.sockets.on('connection', (socket) => {
	  socket.on('sendImage', (data) => {
	    socket.broadcast.emit('getImage',data);
	  });
	});

	module.exports = websockets;

})();