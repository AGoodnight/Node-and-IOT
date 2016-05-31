define(['../app','../views/views'],function(app,views){

	app.module.directive('jumbotron',init);
	
	init.$inject = ['$http','$state'];
	
	function init($http,$state){
		return{
			controllerAs:'vm',
			template:views.jumbotron,
			link:function(scope, element, attribute){

				init();

				var myLineChart;

				function init(){
					scope.$watch(function(){
						// controller is vm and we don't want a new scope
						return scope.vm.inputModel
					},function(after){

						if(!myLineChart && scope.vm.chartData){
							myLineChart = new Chart(element.find('.ctx'), {
							    type: 'line',
							    data: scope.vm.chartData,
							    options:{
								     xAxes: [{
							            display: false
							        }]
							    }
							});
						}
						
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