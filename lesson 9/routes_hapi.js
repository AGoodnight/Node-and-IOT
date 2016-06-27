(function(){
	'use strict'
	const server = require('./server_hapi');

	server.register(require('inert'), (err) => {
		if (err) {
	        throw err;
	    }
		// thanks to the arrow function:
		// 'server' is the same as server outside the anyonmous function, we are sharing the primary scope.
		// In ES5 you would need to declare/assign it to the scope of the anyonmous function
		server.route({ 
			method:'GET',
			path:'/',
			handler:function(request,reply){
				reply.file('./public/index.html');
			}
		});

	});

	server.route({
	    method: 'GET',
	    path: '/{name}',
	    handler: function (request, reply) {
	        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	    }
	});


	module.exports = server;

})();