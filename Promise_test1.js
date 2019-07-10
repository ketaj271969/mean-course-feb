var request = require('request-promise');

var github = {
  token: null,

  getUser: function() {
    return request({
      "method":"GET",
      "uri": "https://api.github.com/user",
      "json": true,
      "headers": {
        "Authorization": "Bearer " + github.token,
        "User-Agent": "My little demo app"
      }
    });
  }
}

function main(params) {
  github.token = params.token;
  return github.getUser();
}

main({"token": process.argv[2]}).then(function(result) {
  console.log(result);
});
