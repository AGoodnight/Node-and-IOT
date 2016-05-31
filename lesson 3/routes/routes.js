define(['../app','../../views/views'],function(app,views){
	
	config.$inject =['$stateProvider','$urlRouterProvider'];
	return config;

	function config($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home',{
				url:'',
				template:views.layout,
				controller:'AppController',
				controllerAs:'vm',
				resolve:{
					data:function(){
						return {
							message:'Welcome to the App!'
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
						return {
							message:'About Angular',
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
						return {
							message:'About Express',
							apiEndpoint:'/users/express'
						}
					}
				}
			
			})
	};
})