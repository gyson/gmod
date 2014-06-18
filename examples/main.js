
var gmod = require('gmod');

gmod.import(__dirname + '/bar.js')
	.then(function (bar) {
		console.log("bar:", bar);
	}, function (err) {
		console.log("err:", err);
	});

