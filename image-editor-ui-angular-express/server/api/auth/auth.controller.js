var http = require('http');
var apiKeys = require('../../apiKeys.js');

module.exports = {
	creativesdk: function(req, res) {

		console.log(apiKeys.creativeSdkKey);

		res.send(apiKeys.creativeSdkKey);
	}
}