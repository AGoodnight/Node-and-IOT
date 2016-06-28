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
		})
		.state('lenny',{
			url:'/lenny',
			controller:'AppController',
			controllerAs:'vm',
			template:views.layout,
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
			url:'/barry',
			controller:'AppController',
			controllerAs:'vm',
			template:views.layout,
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
			url:'/snoopy',
			controller:'AppController',
			controllerAs:'vm',
			template:views.layout,
			resolve:{
				data:function(){
					console.log('UI ROUTER - connecting to server');
					return {
						apiEndpoint:'/api/snoopy'
					}
				}
			}
		});
	};
})