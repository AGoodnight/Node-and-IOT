define(['./public/javascripts/app.controller',
    './public/javascripts/button-bar.directive',
    './public/javascripts/jumbotron.directive'],function(){

	function init(){
	    angular.bootstrap(document, ['app.lesson4']);
	}

	return init;

})