var request = require('request');
var radb = require("./radb");

//radb.insertField("test",'user','age',432);
//radb.deleteValue('test','user.belongs','惊悚');


request.post(
    'http://localhost:3000/types/delete',
    {form:{data:'你好'}}
);
// or

// request('http://localhost:3000', function (error, response) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('status:', response.body); // Print the response status code if a response was received
//
// });
