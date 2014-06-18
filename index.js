
var co = require('co');
var fs = require('fs');
var path = require('path');
var Module = require('module');
var Promise = require('es6-promise').Promise;

var gmod = module.exports = {};

gmod.modules = {};

gmod.import = function (filename) {
	var $filename = filename;
	var $dirname = path.dirname(filename);

	if (filename in gmod.modules) return gmod.modules[filename];

	var promise = new Promise(function (resolve, reject) {
		fs.readFile(filename, "utf8", function (err, file) {
			if (err) reject(err);

			var script = new Function(
				"__dirname", "__filename", "require", 
				"return (function* () {" + file + "}());");

			var module = new Module(filename);
			
			var gen = script($dirname, $filename, module.require.bind(module));

			co(function* () {
				var result = gen.next();
				while (!result.done) {
					var obj = result.value;
					if (typeof obj === "string") {
						// check if it's relative path
						var fpath = (obj[0] === ".") ? path.join($dirname, obj) : obj;
						
						obj = gmod.import(fpath);
					}
					result = gen.next(yield obj);
				}
				return result.value;
			})(function (err, ret) {
				err ? reject(err) : resolve(ret);
			});
		});
	});

	// register promise
	gmod.modules[filename] = promise;

	return promise;
};


