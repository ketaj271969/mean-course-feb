var HUBIAMRequest = require('request');

const HUBIAMData = new FormData();
HUBIAMData.append("application", "mean-course-feb");
HUBIAMData.append("appFunction", "addPost");
HUBIAMData.append("requestTicket", "");
HUBIAMData.append("text", "This is description");

HUBIAMRequest.post<{ message: string; post: Post }>(
  "http://idam-dev-con01.iamdev.lcl:14328/api/auditpoints",
  HUBIAMData
);
