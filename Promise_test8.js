var https = require('https');
/**
 * HOW TO Make an HTTP Call - POST
 */
// do a POST request
// create the JSON object
jsonObject = JSON.stringify({
  "headers": { "content-type": "application/json"},
        "url": "http://idam-dev-con01.iamdev.lcl:14328/api/auditpoints",
        "body": JSON.stringify({
          "application" : HUBIAMApplication,
          "appFunction" : HUBIAMAppFunction,
          "requestTicket" : HUBIAMRequestTicket,
          "text" : HUBIAMText,
          "userId" : HUBIAMUserId,
          "requestApprover" : HUBIAMRequestApprover,
          "requestEnvironment" : HUBIAMRequestEnvironment
}),

// prepare the header
var postheaders = {
  'Content-Type' : 'application/json',
  'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};

// the post options
var optionspost = {
  host : 'http://idam-dev-con01.iamdev.lcl',
  port : 14328,
  path : '/api/auditpoints',
  method : 'POST',
  headers : postheaders
};

console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST call');

// do the POST call
var reqPost = https.request(optionspost, function(res) {
  console.log("statusCode: ", res.statusCode);
  // uncomment it for header details
//  console.log("headers: ", res.headers);

  res.on('data', function(d) {
      console.info('POST result:\n');
      process.stdout.write(d);
      console.info('\n\nPOST completed');
  });
});

// write the json data
reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
  console.error(e);
});
