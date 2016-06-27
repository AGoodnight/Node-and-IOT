define(['../app','../views/views'],function(app,views){
	
	app.module.directive('clientChart',init);
	
	init.$inject = [];
	
	function init(){

		return{
			scope:{
				dataset:'='
			},
			link:{
				pre:preLink,
				post:postLink
			},
			controllerAs:'vm'
		}

	}

	function preLink(scope){
		
		if(scope.dataset.items){

			/*scope.$watch(function(){

			},function(after){*/

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

				scope.chartData = {
					labels: timeValues(),
					datasets: newSet
					/*datasets:[
					{
			            fillColor : "rgba(220,220,220,0.5)",
			            strokeColor : "rgba(220,220,220,1)",
			            pointColor : "rgba(220,220,220,1)",
			            pointStrokeColor : "#fff",
			            data : [65,59,90,81,56,55,40]
			        },
			        {
			            fillColor : "rgba(151,187,205,0.5)",
			            strokeColor : "rgba(151,187,205,1)",
			            pointColor : "rgba(151,187,205,1)",
			            pointStrokeColor : "#fff",
			            data : [28,48,40,19,96,27,100]
			        }]*/
				}

			//});
		}

		// METHODS
		// --------------------
		function itemValues(){
			values = {};
			var i = 0;
	    	for( i = 0 ; i<scope.dataset.items.length ; i++){
	    		
	    		var payload = scope.dataset.items[i].payload;
	            var json = angular.fromJson(payload);
	    		
	    		for( stat in json ){
	    			if(values[stat] === undefined){
	    				values[stat] = [];
	    			}
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

	function postLink(scope,element){

		console.log("---> I AM A CHART");

		var myLineChart;
		if(!myLineChart && scope.chartData){

			console.log(scope.chartData);

			var ele = element.find('.ctx');

			myLineChart = new Chart(ele[0], {
			    type: 'line',
			    data: scope.chartData,
			    options:{/*
				     xAxes: [{
			            display: false
			        }]*/
			    }
			});

		}

		console.log(myLineChart)
		
	}

});