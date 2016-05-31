define(['../../app','../../views/views'],function(app,views){

	app.module.directive('jumbotron',init);
	
	init.$inject = [];
	
	function init(){
		return{
			controllerAs:'vm',
			template:views.jumbotron
		}
	}
	
});