// Transpile ES6 to ES5
require('babel/register');

var chalk = require('chalk');
var Promise = require('bluebird');

var port = (process.env.PORT || 4545);
// Start the server
var app = require('./app');

(new Promise(function(resolve, reject) {
  app.listen(port, function() {
    console.log('The server is listening on port', chalk.green.bold(port), 'and loves you very much.');
    return resolve();
  });
}))    
.catch(function(err) {
  console.log('Problem starting up!', chalk.red(err.message));
  console.log('I\'m out!');
  process.kill(1);
});