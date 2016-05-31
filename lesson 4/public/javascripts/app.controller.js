define(['../../app','../../views/views'],function(app,views){
	
	app.module.controller('AppController',init);
	
	init.$inject = ['$http','data'];
	
	function init($http,data){

		console.log('VM INIT',data);
		
		var vm = this, apiGet;

		if(data.apiEndpoint){
			
			apiGet = $http({
				method:'GET',
				url:data.apiEndpoint
			})
			.then(vmConfigure,function(){
				console.log('failed');
			});

		}else{
			apiGet = undefined;
			vmConfigure();
		}

		function vmConfigure(response){

			var apiData = response || {} ;
			var apiData = apiData.data || {};
			var apiData = apiData[0] || {};
		
			vm.buttons = [
				{
					name:'Angular',
					where:'angular'
				},
				{
					name:'Express',
					where:'express'
				},
				{
					name:'Web Sockets',
					where:'web-sockets'
				},
				{
					name:'DynamoDB',
					where:'dynamo-db'
				}
			];

			vm.title = apiData.title || "No Title";
			vm.description = apiData.description || "No Description";
			vm.showInput = ( apiData.active !== undefined );
			vm.tag = apiData.tag;
			vm.active = apiData.active || false;
			vm.inputModel = {
				socketActive:vm.active
			};
			
		}
	}

});