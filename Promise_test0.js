var request = require('request-promise');

request({
  "method":"GET",
  "uri": "https://api.github.com/",
  "json": true,
  "headers": {
    "User-Agent": "My little demo app"
  }
}).then(console.log, console.log);
