var express = require('express');
var radb = require("./radb");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 添加所属的接口
app.post('/belongs/add', function (req, res) {
    console.log(req.body.data);
    let result = radb.insertValue('test','user.belongs',req.body.data);
    if(result.status === 'success'){
        res.send(result);
    }else{
        res.send(result);
    }
});

// 查询全部所属
app.get('/belongs/get', function (req, res) {
    console.log(req.body.data);
    let result = radb.get('test','user.belongs');
    let response_text=[];
    for(let i = 0;i<result.length;i++){
        response_text.push({data:result[i]});
    }
    res.send(response_text);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
