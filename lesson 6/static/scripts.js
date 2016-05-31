'use strict'

(function(){
	var scriptTag = document.getElementByTagName('script')[0];
	var matches = scriptTag.src.match(/^http[s]?\:\/\/([^\/?#]+)(?:[\/#?]|$)/i);
	var host = matches[0];
	var body = document.getElementByTagName('body')[0];
	var head = document.getElementByTagName('head')[0];

	// Create the link styles
	createLinkTag('bower_components/bootstrap/dist/css/bootstrap.css');
	createLinkTag('static/styles.css');

	var ui = document.createElement('ui-view');
	ui.setAttribute('class', 'container');
	body.appendChild(ui);

	createRequireTag('static/bower_components/requirejs/require.js','static/index');

	function createLinkTag(src){
		var link = document.createElement('link');
		link.setAttribute('rel','stylesheet');
		link.setAttribute('type','text/css');
		link.setAttribute('href',host+'/'+src);
		head.appendChild(link);
	}

	function createScriptTag(src,async){
		var script = document.createElement('script');
		script.setAttribute('src', host+'/'+src);
		script.async = async || false ;
		head.appendChild(script);
	}

	function createRequireTag(src,init){
		var script = document.createElement('script');
		script.setAttribute('src', host+'/'+src);
		script.setAttribute('data-main',host+'/'+init);
		body.appendChild(script);
	}
})();

