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
		console.log(db);
		console.log('插入成功');
		return {status:"success",message:"插入成功"};
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


	if(!current){
		throw Error("要插入的字段不存在");
		return false;
	}else if(current.includes(value)){
		return {status:'failed',message:'不可插入重复值'}
	}
	else{
		current.push(value);
		console.log(db);
		let writeStream = JSON.stringify(db);
		fs.writeFileSync(file_name,writeStream);
		console.log('数据插入成功');
		return {status:"success",message:"添加成功"};
	}







}

// 简单查询
radb.get = function(dbName,field){
	let file_name = dbName + ".json";
	let db = JSON.parse(fs.readFileSync(file_name));

	let array = field.split(".");
	var current = db;
	for(let i = 0;i<array.length;i++){
		current = current[array[i]];
	}

	if(!current){
		throw Error("要查找的字段不存在");
		return false;
	}
	return current;
}

// 删除属性

radb.daleteField = function(dbName,field){
	let file_name = dbName + ".json";
	let db = JSON.parse(fs.readFileSync(file_name));

	let array = field.split(".");
	let last = array.length-1;
	var current = db;
	for(let i = 0;i<array.length-1;i++){
		current = current[array[i]];
	}

	if(!current[array[last]]){
		throw Error("要删除的字段不存在");
		return false;
	}else{
		delete current[array[last]];
		let writeStream = JSON.stringify(db);
		fs.writeFileSync(file_name,writeStream);
		console.log(db);
		console.log("删除成功");
		return {status:'success',message:'删除成功'};
	}
}

// 删除值
radb.deleteValue = function(dbName,field,value){
	let file_name = dbName + ".json";
	let db = JSON.parse(fs.readFileSync(file_name));

	let array = field.split(".");
	var current = db;
	for(let i = 0;i<array.length;i++){
		current = current[array[i]];
	}

	if(!current){
		throw Error("要删除的字段不存在");
		return false;
	}else if(!(current instanceof Array)){
		throw Error("删除字段的类型错误");
		return false;
	}
	else{
		for(let i=0;i<current.length;i++){
			if(current[i] === value){
				console.log("删除了一条记录");
				current.splice(i,1);
			}
		}
		let writeStream = JSON.stringify(db);
		fs.writeFileSync(file_name,writeStream);
		console.log(db);
		console.log("删除成功");
		return {status:'success',message:'删除成功'};
	}
}

// 按条件删除值
radb.deleteValueByQuery = function(dbName,field,keyword,condition,value){
	let file_name = dbName + ".json";
	let db = JSON.parse(fs.readFileSync(file_name));

	let array = field.split(".");
	let delete_field = db;
	//console.log(delete_field);
	for(let i = 0;i<array.length;i++){
		//console.log(array[i]);
		delete_field = delete_field[array[i]];

	}


	if(!delete_field){
		throw Error("要删除的字段不存在");
		return false;
	}

	let keyword_array =  keyword.split(".");
	let keyword_field;


	//在查找领域中查找
	// equal情况
	if(condition === 'equal'){
		for(let i = 0;i<delete_field.length;i++){
			keyword_field = delete_field[i];
			for(let i = 0;i<keyword_array.length;i++){
				keyword_field = keyword_field[keyword_array[i]];
			}
			if(!keyword_field){
				throw Error("要查找的字段不存在");
				return false;
			}
			if(keyword_field === value){
				delete_field.splice(i,1);
				console.log("删除成功");
			}
		}
	}

	let writeStream = JSON.stringify(db);
	fs.writeFileSync(file_name,writeStream);

	console.log(db);
	return {status:'success',message:'删除成功'};


}
