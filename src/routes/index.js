//required file for require-directory.  Make it easier to setup routes to js files

var requireDirectory = require('require-directory');
module.exports = requireDirectory(module);