require.config({
  paths: {
    "jquery":'../bower_components/jquery/dist/jquery.min',
    'text':'../bower_components/text/text',
    'angular': '../bower_components/angular/angular',
    'ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'socketio': '../../socket.io/socket.io',
  },
  shim:{
    "socketio":{
      exports:'io'
    },
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
    }
  }
});

define('host',{local:'http://localhost:7070'});

define('socket',['socketio','host'],function(io,host){
  return io.connect(host.local);
});

require([

    // Our Angular App
    './app',
    './init',
    'socket',

    // package
    'socketio',
    'host',
    'angular',
    'ui-router',
    'bootstrap',
    'text'

], function(app,init){
    'use strict';
    init();
});
