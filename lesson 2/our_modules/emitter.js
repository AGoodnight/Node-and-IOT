var EventEmitter = require('events');
var util = require('util');

function NewEmitter(){
	EventEmitter.call(this);
}

util.inherits(NewEmitter,EventEmitter);

module.exports = NewEmitter;