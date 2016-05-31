define(['../app','host','hostname','../../mqtt'],function(app,host,hostname,mqtt){
	
	app.module.controller('AppController',init);
	
	init.$inject = ['$http','data'];
	
	function init($http,data){

		//console.log($state.get());

		console.log('VM INIT',data);
		
		var vm = this, apiGet;
		var socket = io.connect();

		if(data && data.apiEndpoint){
			
			apiGet = $http({
				method:'GET',
				url:data.apiEndpoint
			})
			.then(vmConfigure,
				function(){
					console.log('< ! > -- API call failed ( invalid endpoint / timeout )');
				}
			);

		}else{
			apiGet = undefined;
			vmConfigure();
		}

		function vmConfigure(response){

			var apiData = response || {};
			apiData = apiData.data || {};

			vm.topic = "$DEVICE/Lenny/hello";
			vm.title = apiData.title || "Lenny";
			vm.description = apiData.description || "Lenny Connected";
			vm.showInput = ( apiData.active !== undefined );
			vm.tag = apiData.tag;
			vm.active = apiData.active || false;
			vm.inputModel = {
				socketActive:vm.active
			};	

			if(data){
				vm.nested = data.nested || false;
			}

			console.log("App Controller, vmConfigure: ", arguments);
			console.log('App Controller is establishing connection to: ','ws://'+hostname+':'+host.port_fe);

			console.log( socket.emit('subscribe',{topic:'$DEVICE/Lenny/test'}) );

			vm.buttons = [
				{
					name:'Lenny',
					where:'lenny'
				},
				{
					name:'Snoopy',
					where:'snoopy'
				},
				{
					name:'Barry',
					where:'barry'
				}
			];

			var itemValues = function(){
				values = {};
				var i = 0;
            	for( i = 0 ; i<apiData.items.length ; i++){

            		console.log(apiData.items[i])
            		
            		var payload = apiData.items[i].payload;
		            var json = angular.fromJson(payload);
            		
            		for( stat in json ){
            			if(values[stat] === undefined){
            				values[stat] = [];
            			}
            			values[stat].push(json[stat]);
	            	}
            	}
            	return values;
            }

            var timeValues = function(){
            	values = [];
				var i = 0;
            	for( i = 0 ; i<apiData.items.length ; i++){
            		var timestamp = apiData.items[i].timestamp;
            		values.push('')
            	}
            	return values;
            }

            // TODO ---- Make below dynamic, or more controllers
            // Option 1: Template
            /*
				<body ng-app="MyApp">
				  <div ng-controller="MyCtrl">
				    <label>Primitive</label>
				    <input type="text" ng-model="name">

				    <label>Object</label>
				    <input type="text" ng-model="user.name">

				    <div class="nested" ng-controller="MyNestedCtrl">
				      <label>Primitive</label>
				      <input type="text" ng-model="name">

				      <label>Primitive with explicit $parent reference</label>
				      <input type="text" ng-model="$parent.name">

				      <label>Object</label>
				      <input type="text" ng-model="user.name">
				    </div>
				  </div>
				</body>
            */

            // Option 2: Componetize With A Directive
            // chart.directive
            

            if(apiData.items){
				vm.chartData = {
				    labels: timeValues(),
				    datasets: [
				        {
				            label: 'temperature',
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
				            data:itemValues().temperature
				        },
				        {
				            label: 'pressure',
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
				            data:itemValues().pressure
				        },
				        {
				            label: 'moisture',
				            fill: true,
				            lineTension: 0.1,
				            backgroundColor: "rgba(75,192,192,0.4)",
				            borderColor: "rgba(75,192,192,1)",
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
				            data:itemValues().moisture
				        }
				    ]
				}
			}
		}
	}

});