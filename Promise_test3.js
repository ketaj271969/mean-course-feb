var request = require('request');

async.series([
  function(callback) {
    request('http://www.test.com/api1', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        return callback(null, response);
      }
      return callback(error || new Error('Response non-200'));
    }
  },
  function(callback) {
    request('http://www.test.com/api2', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        return callback(null, response);
      }
      return callback(error || new Error('Response non-200'));
    }
  }
],
// optional callback
function(err, results) {
  if (err) {
    // Handle or return error
  }
  // results is now array of responses
});
