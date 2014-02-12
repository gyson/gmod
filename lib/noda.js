
var Module = require("module");

//console.log(Module);

var compile = Module.prototype._compile;

// override _compile in native module
Module.prototype._compile = function (content, filename) {

	// console.log("In _compile, filename: " + filename);

	content = content.replace(/^\#\!.*/, '');

	content = "var _f = (function* (_f, _r) {" 
			+ 		content 
			+ "}(undefined, undefined));"
	      	+ "var _r = _f.next();"
	      	+ "while (!_r.done) {"
	      	+ "		_r = _f.next(require(_r.value));"
	      	+ "}"
	      	+ "if (_r.value !== undefined) "
	      	+ "		module.exports = _r.value;";
	
	return compile.call(this, content, filename);
}



