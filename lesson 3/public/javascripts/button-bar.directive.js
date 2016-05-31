define(['../../app','../../views/views'],function(app,views){
	
	app.module.directive('buttonBar',init);
	
	init.$inject = [];
	
	function init(){
		return{
			controllerAs:'vm',
			template:views.buttonBar
		}
	}

});