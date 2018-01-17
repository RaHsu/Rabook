const fs = require('fs');

var radb = {};

module.exports = radb;

// 创建数据库（创建一个名为dbName的json文件）
radb.createDb = function(dbName){
	let init_string = "{}";
	let file_name = dbName + ".json";
	fs.writeFileSync(file_name,init_string);
	console.log("数据库" + dbName + "已经创建");

}

// 销毁数据库
radb.destoryDb = function(dbName){
	let file_name = dbName + ".json";
	fs.unlinkSync(file_name);
	console.log('数据库' + dbName + '删除成功');
}

// 插入属性
radb.insertField = function(dbName,field,new_field,value){
	let file_name = dbName + ".json";
	let db = JSON.parse(fs.readFileSync(file_name));

	// 解构字段

	let array = field.split(".");
	var current = db;
	for(let i = 0;i<array.length;i++){
		current = current[array[i]];
	}
	if(current[new_field]){
		throw Error("该字段已经存在");
		return false;
	}else{
		current[new_field] = value;

		let writeStream = JSON.stringify(db);
		fs.writeFileSync(file_name,writeStream);
		console.log('插入成功');
	}



}

// 插入值
radb.insertValue = function(dbName,field,value) {
	let file_name = dbName + ".json";
	let db = JSON.parse(fs.readFileSync(file_name));

	let array = field.split(".");
	var current = db;
	for(let i = 0;i<array.length;i++){
		current = current[array[i]];
	}
	console.log(current);

	if(!current){
		throw Error("要插入的字段不存在");
		return false;
	}else{
		current.push(value);
		let writeStream = JSON.stringify(db);
		fs.writeFileSync(file_name,writeStream);
		console.log('插入成功');

	}





}
