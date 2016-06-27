define(['../app','../views/views'],function(app,views){

	app.module.directive('jumbotron',init);
	
	init.$inject = ['$http','$state','$timeout'];
	
	function init($http,$state,$timeout){
		return{
			controllerAs:'vm',
			template:views.jumbotron,
			link:postLink
		}

		function postLink(scope,element){

			$timeout(init);

			function init(){

				scope.$watch('vm.data',onData,true);
			
				function onData(now,then){
					
					if(now !== undefined && now.items !== undefined){
						scope.dataset = scope.vm.data;
						console.log(scope.vm.data)
						
						if(scope.dataset.items){

							var newSet = [];

							angular.forEach(itemValues(),function(set,index){
								
								var markup = {
									label:index,
									fill: false,
						            lineTension: 0.1,
						            backgroundColor: "rgba(230,192,192,0.4)",
						            borderColor: "rgba(230,192,192,1)",
						            borderCapStyle: 'butt',
						            borderDash: [],
						            borderDashOffset: 0.0,
						            borderJoinStyle: 'miter',
						            pointBorderColor: "rgba(50,50,50,1)",
						            pointBackgroundColor: "#fff",
						            pointBorderWidth: 1,
						            pointHoverRadius: 5,
						            pointHoverBackgroundColor: "rgba(89,75,75,1)",
						            pointHoverBorderColor: "rgba(89,75,75,1)",
						            pointHoverBorderWidth: 2,
						            pointRadius: 1,
						            pointHitRadius: 10,
									data:set
								};

								newSet.push(markup);
								console.log(newSet);

							});

							scope.type = 'line';

							scope.chartData = {
								labels: timeValues(),
								datasets: newSet
							}

							var ctx = element.find('.ctx');
							var mychart = new Chart(ctx,{
								type:scope.type,
								data:scope.chartData
							});
						}
					}
				}
			}

			// METHODS
			// --------------------
			function itemValues(){
				values = {};
				var i = 0;
		    	for( i = 0 ; i<scope.dataset.items.length ; i++){
		    		console.log(scope.dataset.items.length)
		    		
		    		var payload = scope.dataset.items[i].payload;
		            var json = angular.fromJson(payload);
		    		
		    		for( stat in json ){
		    			if(values[stat] === undefined){
		    				values[stat] = [];
		    			}
		    			console.log(json)
		    			values[stat].push( parseInt(json[stat]) );
			    	}
			    }
			    return values;
			}

		    function timeValues(){
		    	values = [];
				var i = 0;
		    	for( i = 0 ; i<scope.dataset.items.length ; i++){
		    		var timestamp = scope.dataset.items[i].timestamp;
		    		values.push('')
		    	}
		    	return values;
		    }
			
		}
	}
	
	
});