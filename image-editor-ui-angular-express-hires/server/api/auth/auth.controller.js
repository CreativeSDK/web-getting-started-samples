var http = require('http');
var uuid    = require('node-uuid');
var crypto  = require('crypto');

var apiKeys = require('../../apiKeys.js');


module.exports = {
	creativesdk: function(req, res) {
		res.send(getAuthObj());
	}
}


function getAuthObj() {
    var authObj = {
        apiKey: apiKeys.creativeSdkKey,
        salt: getSalt(),
        timestamp: getUnixTimestamp().toString(),
        encryptionMethod: "sha1"
    };

    authObj.signature = getSignature(authObj.apiKey, apiKeys.creativeSdkSecret, authObj.salt, authObj.timestamp, authObj.encryptionMethod);

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