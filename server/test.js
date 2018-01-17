var request = require('request');
var radb = require("./radb");

//radb.insertField('test','user','books',"fdsa");

request.post(
    'http://localhost:3000/types/add',
    {form:{data:'hhhkkkokoko'}}
);
// or

// request('http://localhost:3000', function (error, response) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('status:', response.body); // Print the response status code if a response was received
//
// });
