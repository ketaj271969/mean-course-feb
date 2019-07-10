// https://stackoverflow.com/questions/42331058/nodejs-good-way-to-write-multiple-api-calls-in-serial
var request = require('request');

getRequest('http://idam-dev-con01.iamdev.lcl:14328/api/auditpoints').then(function (body1) {
    // do something with body1
    return getRequest('http://localhost:3100/api/jobs');
}).then(function (body2) {
    // do something with body2
    return getRequest('http://www.test.com/api3');
}).then(function (body3) {
    // do something with body3
    //And so on...
});

function getRequest(url) {
    return new Promise(function (success, failure) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                success(body);
            } else {
                failure(error);
            }
        });
    });
}
