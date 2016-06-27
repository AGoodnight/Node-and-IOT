define(['../app','../views/views'],function(app,views){
	
	config.$inject =['$stateProvider','$urlRouterProvider'];
	return config;

	function config($stateProvider, $urlRouterProvider, mockJson){
		
		var i;
		var commonLayout = {
			template:views.layout,
			controller:'AppController',
			controllerAs:'vm'
		}

		$stateProvider.state('home',{
			url:'',
			template:views.layout,
			controller:'AppController',
			controllerAs:'vm',
			resolve:{
				data:function(){
					console.log('UI ROUTER - connecting to server');
					return {
						apiEndpoint:'api/barry'
					}
				}
			}
		})
		.state('clients',{
			url:'clients',
			abstract:true,
			controller:'AppController',
			controllerAs:'vm',
			template:views.layout,
			resolve:{
				data:function(){
					nested:true
				}
			}
		})
		.state('admin',{
			url:'admin',
			abstract:true,
			controller:'AppController',
			controllerAs:'vm',
			template:views.layout,
			resolve:{
				data:function(){
					nested:true
				}
			}
		})/*
		.state('lenny',{
			parent:'clients',
			url:'/lenny',
			controller:'AppController',
			controllerAs:'vm',
			template:views.chart,
			resolve:{
				data:function(){
					console.log('UI ROUTER - connecting to server');
					return {
						apiEndpoint:'/api/lenny'
					}
				}
			}
		})
		.state('barry',{
			parent:'clients',
			url:'/barry',
			controller:'AppController',
			controllerAs:'vm',
			template:views.chart,
			resolve:{
				data:function(){
					console.log('UI ROUTER - connecting to server');
					return {
						apiEndpoint:'/api/barry'
					}
				}
			}
		})
		.state('snoopy',{
			parent:'clients',
			url:'/snoopy',
			controller:'AppController',
			controllerAs:'vm',
			template:views.chart,
			resolve:{
				data:function(){
					console.log('UI ROUTER - connecting to server');
					return {
						apiEndpoint:'/api/snoopy'
					}
				}
			}
		});*/
	};
})