define(['./public/javascripts/app.controller',
    './public/javascripts/button-bar.directive',
    './public/javascripts/jumbotron.directive'],function(){

	function init(){
	    angular.bootstrap(document, ['lesson3']);
	}

	return init;

})