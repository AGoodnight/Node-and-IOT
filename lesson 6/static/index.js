// RequireJS Configuration

require.config({
  waitSeconds: 20000,
  paths: {
    "jquery":'../bower_components/jquery/dist/jquery.min',
    'text':'../bower_components/text/text',
    'angular': '../bower_components/angular/angular',
    'ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'chartjs':'../bower_components/Chart.js/dist/chart',
    'socketio':'../bower_components/socket-io/build/library'
  },
  shim:{
    "angular":{
      deps:['jquery'],
      exports:'angular'
    },
    "ui-router":{
      deps:['angular'],
      exports:'ui-router'
    },
    "bootstrap":{
      deps:['jquery'],
      exports:'bootstrap'
    },
    "chartjs":{
      deps:['jquery'],
      exports:"chartjs"
    },
    "socketio":{
      deps:['jquery'],
      exports:"socketio"
    }
  }
});

define('host',{

  // CONSTANT EVERYWHERE
  // Assigned by Router
  
  local:'http://localhost:7070',
  jessica:'192.168.1.79',
  home:'192.168.1.66',
  rbn:'192.168.77.176',
  port_mqtt:1883,
  port_websocket:8080,
  port_fe:8080

});

define('hostname',['host'],function(host){
  return host.rbn;
});

require([

    // Our Angular App
    './app',
    './app/init',

    // package
    'host',
    'angular',
    'ui-router',
    'bootstrap',
    'text',
    'chartjs',
    'socketio'

], function(app,init){
    'use strict';
    init();
});
