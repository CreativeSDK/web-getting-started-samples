var http = require('http');
var uuid    = require('node-uuid');
var crypto  = require('crypto');

var apiKeys = require('../../apiKeys.js');


module.exports = {
	creativesdk: function(req, res) {

		// console.log(apiKeys.creativeSdkKey);

		// res.send(apiKeys.creativeSdkKey);
	}
}


function getAuth() {

    var authObj = {
        apiKey: apiKeys.creativeSdkKey,
        secret: apiKeys.creativeSdkSecret,
        salt: getSalt(),
        timestamp: getUnixTimestamp().toString(),
        encryptionMethod: "sha1"
    };

    authObj.signature = getSignature(authObj.apiKey, authObj.secret, authObj.salt, authObj.timestamp, authObj.encryptionMethod);

    return authObj;
}

function getSalt() {
	return uuid.v4();
}

function getUnixTimestamp() {
	return (new Date()).getTime() / 1000;
}

function getSignature(key, secret, salt, timestamp, encryptionMethod) {

	let sig = key + secret + timestamp + salt;

	return crypto.createHash(encryptionMethod).update(sig).digest('hex');
}