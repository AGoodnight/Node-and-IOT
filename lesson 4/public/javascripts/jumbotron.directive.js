define(['../../app','../../views/views','socket'],function(app,views,socket){

	app.module.directive('jumbotron',init);
	
	init.$inject = ['$http','$state'];
	
	function init($http,$state){
		return{
			controllerAs:'vm',
			template:views.jumbotron,
			link:function(scope, element, attribute){

				init();

				function init(){
					scope.$watch(function(){
						// controller is vm and we don't want a new scope
						return scope.vm.inputModel
					},function(after){

						//console.log(after!==undefined && after.socketActive!==undefined && scope.vm.tag === 'web-sockets');
						console.log(after)
						//socket.emit('myEvent',{name:'Event'});
						
						if(scope.vm.tag === 'web-sockets' && 
							after!==undefined && 
							after.socketActive!==undefined){

							$http({
								method:'PUT',
								url:'/users/web-sockets/put',
								data:after.socketActive
							}).then(function(){
								console.log('Uploaded Sucessful!');
							},function(){
								console.log('Uploaded Failed!');
							});
						}
						
					},true);

				}
			}
		}
	}
	
});