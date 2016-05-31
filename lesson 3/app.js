 define([

    'angular',
    './routes/routes.js'

], function(angular,routes,init){

    angular.module('lesson3', [ 'ui.router' ]);
    var app = angular.module('lesson3');

    // Setup Routes
    app.config(routes); // returns a configuration function 

    return{
        module:app
    }

});
