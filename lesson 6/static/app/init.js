define(['host',
		'./app.controller',
	    './button-bar.directive',
	    './jumbotron.directive'],function(host){

	function init(){
	    
	    angular.bootstrap(document, ['app.lesson6']);
	    
	}

	return init;

})