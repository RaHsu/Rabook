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

    let result = radb.get('test','user.belongs');

    res.send(result);
});

// 删除所属的接口
app.post('/belongs/delete', function (req, res) {
    console.log(req.body.data);
    let result = radb.deleteValue('test','user.belongs',req.body.data);
    if(result.status === 'success'){
        res.send(result);
    }else{
        res.send(result);
    }
});

// 添加类型的接口
app.post('/types/add', function (req, res) {
    console.log(req.body.data);
    let result = radb.insertValue('test','user.types',req.body.data);
    if(result.status === 'success'){
        res.send(result);
    }else{
        res.send(result);
    }
});

// 查询全部类型
app.get('/types/get', function (req, res) {
    let result = radb.get('test','user.types');
    res.send(result);
});

// 删除某个类型
app.post('/types/delete', function (req, res) {
    console.log(req.body.data);
    let result = radb.deleteValue('test','user.types',req.body.data);
    if(result.status === 'success'){
        res.send(result);
    }else{
        res.send(result);
    }
});

// 添加一本书籍（未读）
app.post('/unreadbooks/add', function (req, res) {
    let store_data = {};
    store_data.bookName = req.body['data[book_name]'];
    store_data.auther = req.body['data[auther]'];
    store_data.belong = req.body['data[belong]'];
    store_data.type = req.body['data[type]'];


    console.log(store_data);
    let result = radb.insertValue('test','user.unreadbooks',store_data);
    if(result.status === 'success'){
        res.send(result);
    }else{
        res.send(result);
    }
});

// 获取书籍信息（未读）
app.get('/unreadbooks/get', function (req, res) {
    let result = radb.get('test','user.unreadbooks');
    res.send(result);
});

// 删除一本书籍（未读）
app.post('/unreadbooks/delete', function (req, res) {
    console.log(req.body.data);
    let result = radb.deleteValueByQuery("test",'user.unreadbooks','bookName','equal',req.body.data);

    if(result.status === 'success'){
        res.send(result);
    }else{
        res.send(result);
    }
});

// 将一本书的状态改为正在读
app.post('/unreadbooks/startread', function (req, res) {
    console.log(req.body);
    let store_data = {};
    store_data.bookName = req.body['data[bookName]'];
    store_data.auther = req.body['data[auther]'];
    store_data.belong = req.body['data[belong]'];
    store_data.type = req.body['data[type]'];


    // 删除未读书
    radb.deleteValueByQuery("test",'user.unreadbooks','bookName','equal',store_data.bookName);

    console.log(store_data);

    // 添加正在读的书
    let result = radb.insertValue('test','user.reading',store_data);
    if(result.status === 'success'){
        res.send(result);
    }else{
        res.send(result);
    }
});

// 将一本书添加到计划
app.post('/unreadbooks/addtoplan', function (req, res) {
    console.log(req.body);
    let store_data = {};
    store_data.bookName = req.body['data[bookName]'];
    store_data.auther = req.body['data[auther]'];
    store_data.belong = req.body['data[belong]'];
    store_data.type = req.body['data[type]'];


    let result = radb.insertValue('test','user.plans',store_data);
    if(result.status === 'success'){
        res.send(result);
    }else{
        res.send(result);
    }
});
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
