// Required Packages

// We will require node's built-in FileSystemManager module.
var fs = require('fs');

/*  
	'list' will become a string. The string will
	be produced by parsing the buffer returned 
	by node's FileSystemManager watch method
*/
var list = '';

/* 
	the watch method does exactly what it sounds like, it watches 
	a file ore directory for changes and then returns a buffer 
	of those changes
*/
fs.watch('./files',onDirChange);

/*  
	In Javascript functions are initialized before any other declarations, 
	so it can be declared under the fs.watch declaration.
*/
function onDirChange(){
	
	list = "Items in the files folder \n\n";

	/* 
		readdirSYnc is a synchrounous version of readdir. For our purposes 
		it's easier to use it then try to manage the asynchronous nature 
		of readdir with promises
	*/
	var $filenames = fs.readdirSync('./files').forEach( item=> {

		// we are using an excape character here to make our list document more list like.
		list = list.concat("\u2022 "+item+"\n");

	});

	fs.writeFile('manifest.txt', list);
}