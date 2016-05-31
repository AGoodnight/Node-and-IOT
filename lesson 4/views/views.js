define([
	'text!./button-bar.html',
	'text!./jumbotron.html',
	'text!./layout.html'
],function( button_bar, jumbotron, layout){
	return{
		layout:layout,
		jumbotron:jumbotron,
		buttonBar:button_bar
	}
});