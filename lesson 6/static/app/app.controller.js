define(['../app','host','hostname'],function(app,host,hostname){
	
	app.module.controller('AppController',init);
	
	init.$inject = ['$http','data','$interval'];
	
	function init($http,data,$interval){

		//console.log($state.get());

		console.log('VM INIT',data);
		
		var vm = this, apiGet;
		var apiData;
		//var socket = io.connect();

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

		function refreshData(){
			
			var _newData;

			$http({
				method:'GET',
				url:'api/'+vm.data.client
			}).then(success,failure);

			function success(response){
				vm.data = response.data;
			}

			function failure(response){
				console.log("Failed to refresh data");
			}

		}

		function vmConfigure(response){

			apiData = response || {};
			apiData = apiData.data || {};

			console.log(apiData.title)

			vm.topic = "$DEVICE/Lenny/hello";
			vm.title = apiData.title || "Lenny";
			vm.description = apiData.description || "Lenny Connected";
			vm.showInput = ( apiData.active !== undefined );
			vm.tag = apiData.tag;
			vm.active = apiData.active || false;

			if(data){
				vm.nested = data.nested || false;
			}

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

            vm.data = apiData;
            $interval(refreshData,500);
      
		}
	}

});