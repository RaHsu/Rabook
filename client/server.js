var express = require('express');
var app = express();
var history = require('connect-history-api-fallback');

app.use(history());
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use(express.static('dist'));

var server = app.listen(3333, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
