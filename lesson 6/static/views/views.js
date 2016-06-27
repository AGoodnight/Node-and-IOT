define([
	'text!./button-bar.html',
	'text!./jumbotron.html',
	'text!./layout.html',
	'text!./chart.html'
],function( button_bar, jumbotron, layout, chart){
	return{
		layout:layout,
		jumbotron:jumbotron,
		buttonBar:button_bar,
		chart:chart
	}
});