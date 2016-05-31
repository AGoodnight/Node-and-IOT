define(['../../app','../../views/views'],function(app,views){
	
	app.module.controller('AppController',init);
	
	init.$inject = ['$http','data'];
	
	function init($http,data){
		
		var vm = this, apiGet;

		if(data.apiEndpoint){
			
			apiGet = $http({
				method:'GET',
				url:data.apiEndpoint
			})
			.then(vmConfigure);

		}else{
			apiGet = undefined;
			vmConfigure();
		}

		function vmConfigure(response){

			var apiData = response || {} ;
		
			vm.buttons = [
				{
					name:'Angular',
					where:'angular'
				},
				{
					name:'Express',
					where:'express'
				}
			];

			vm.apiResponse = apiData.data || 'No API Call'
			vm.message = data.message || "Welcome to the App!";

		}
	}

});