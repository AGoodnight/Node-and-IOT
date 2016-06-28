// RequireJS Configuration
var  __bowerdir = '../bower_components/';
var __nodedir = '../node_modules/';

require.config({
  waitSeconds: 20000,
  paths: {
    'jquery':__bowerdir+'jquery/dist/jquery.min',
    'text':__bowerdir+'text/text',
    'angular': __bowerdir+'angular/angular',
    'ui-router': __bowerdir+'angular-ui-router/release/angular-ui-router',
    'bootstrap': __bowerdir+'bootstrap/dist/js/bootstrap',
    'chartjs':__bowerdir+'chart.js/dist/Chart',
    //'angular-websocket':__bowerdir+'angular-websocket/dist/angular-websocket'//,
    'ws':__nodedir+'ws/lib/WebSocket',
    'underscore':__bowerdir+'underscore/underscore-min'
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
    // "angular-websocket":{
    //   deps:['jquery','angular'],
    //   exports:"angular-websocket"
    // }
    "ws":{
      exports:'ws'
    }
  }
});

define('host',{

  // CONSTANT EVERYWHERE
  // Assigned by Router
  
  local:'http://localhost:7070',
  jessica:'192.168.1.79',
  home:'192.168.1.66',
  rbn:'192.168.77.171',
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
    'underscore'

], function(app,init){
    'use strict';
    init();
});
