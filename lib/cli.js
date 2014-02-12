#!/usr/bin/env node --harmony

var path = require("path");

require("./noda.js");

require(path.join(process.env.PWD, process.argv[2]));


