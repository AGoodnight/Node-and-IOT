define(['../app','host','hostname'],function(app,host,hostname){
	
	app.module.controller('AppController',init);
	
	init.$inject = ['$http','data'];
	
	function init($http,data){

		//console.log($state.get());

		console.log('VM INIT',data);
		
		var vm = this, apiGet;
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

			//console.log("App Controller, vmConfigure: ", arguments);
			//console.log('App Controller is establishing connection to: ','ws://'+hostname+':'+host.port_fe);

			//console.log( socket.emit('subscribe',{topic:'$DEVICE/Lenny/test'}) );

			vm.buttons = [
				/*{
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
				}*/
			];
			// For Charts
            vm.data = apiData;
            console.log(vm.data);

            console.log('VM COnfigured');
      
		}
	}

});