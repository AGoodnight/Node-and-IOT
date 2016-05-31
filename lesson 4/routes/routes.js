define(['../app','../../views/views'],function(app,views){
	
	config.$inject =['$stateProvider','$urlRouterProvider'];
	return config;

	function config($stateProvider, $urlRouterProvider, mockJson){
		$stateProvider
			.state('home',{
				url:'',
				template:views.layout,
				controller:'AppController',
				controllerAs:'vm',
				resolve:{
					data:function(){
						console.log('UI ROUTER - getting data');
						return {
							apiEndpoint:'/users/home'
						}
					}
				}
			})
			.state('angular',{
				url:'/angular',
				template:views.layout,
				controller:'AppController',
				controllerAs:'vm',
				resolve:{
					data:function(){
						console.log('UI ROUTER - getting data');
						return {
							apiEndpoint:'/users/angular'
						}
					}
				}
			
			})
			.state('express',{
				url:'/express',
				template:views.layout,
				controller:'AppController',
				controllerAs:'vm',
				resolve:{
					data:function(){
						console.log('UI ROUTER - getting data');
						return {
							apiEndpoint:'/users/express'
						}
					}
				}
			
			})
			.state('web-sockets',{
				url:'/web-sockets',
				template:views.layout,
				controller:'AppController',
				controllerAs:'vm',
				resolve:{
					data:function(){
						console.log('UI ROUTER - getting data');
						return {
							apiEndpoint:'/users/web-sockets'
						}
					}
				}
			
			})
			.state('dynamo-db',{
				url:'/dynamo-db',
				template:views.layout,
				controller:'AppController',
				controllerAs:'vm',
				resolve:{
					data:function(){
						console.log('UI ROUTER - getting data');
						return {
							apiEndpoint:'/users/dynamo-db'
						}
					}
				}
			});
	};
})