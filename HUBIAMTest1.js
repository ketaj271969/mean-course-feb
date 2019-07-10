// https://www.thepolyglotdeveloper.com/2017/10/consume-remote-api-data-nodejs-application/

var HUBIAMRequest = require("request");

console.log('Starting...');

var HUBIAMApplication = "HUBIAMTest1.js";
var HUBIAMAppFunction = "post3";
var HUBIAMRequestTicket = "673851";
var HUBIAMText = "This is example post #3 - June 6th, 2019";
var HUBIAMUserId = "tjayne3";
var HUBIAMRequestApprover = "3";
var HUBIAMRequestEnvironment = "dev3";

HUBIAMRequest.post({
  headers: { "content-type": "application/json" },
  url: "http://idam-dev-con01.iamdev.lcl:14328/api/auditpoints",
  body: JSON.stringify({
        "application" : HUBIAMApplication,
        "appFunction" : HUBIAMAppFunction,
        "requestTicket" : HUBIAMRequestTicket,
        "text" : HUBIAMText,
        "userId" : HUBIAMUserId,
        "requestApprover" : HUBIAMRequestApprover,
        "requestEnvironment" : HUBIAMRequestEnvironment
  })
}, (error, response, body) => {
  if(error) {
      return console.dir(error);
  }
  console.dir("Fisished successfyllliu");
});
console.log('Finished');
