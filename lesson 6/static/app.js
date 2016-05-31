// Angular App Instance

 define([

    'angular',
    './routes/routes.js'

], function(angular,routes,init){

    angular.module('app.lesson6', [ 'ui.router' ]);
    var app = angular.module('app.lesson6');    

    // Setup Routes
    app.config(routes); // returns a configuration function 

    return{
        module:app
    }

});
