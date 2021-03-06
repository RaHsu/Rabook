## Rabook
个人使用的书籍管理工具。

### 介绍
Rabook是我个人使用的一个书籍管理工具，我因为买太多书没时间读，导致书籍堆积，不看又太可惜，但是又记不住自己哪些书没看，所以写个应用来管理一下。

软件分为两个部分，客户端由vue.js框架写成并使用iview的UI组件，后台使用node.js，数据库部分是我自己写的一套微型的基于JSON的文件数据库，好处就是不用再安装数据库系统了，部署起来十分简便。

### 功能
- 未读书籍
    - 增加未读书籍
    - 查看未读书籍（可以按所属查询）
    - 删除未读书籍
    - 开始读书（将未读书籍加入正在阅读书籍）


- 正在读的书籍
    - 查看正在阅读的书籍
    - 完成书籍阅读（将正在读的书籍加入已读书籍，并添加评论）
    - 放弃书籍阅读（将正在读的书籍加入未读书籍）


- 已读书籍
    - 查看已读书籍


- 愿望单
    - 添加想读的书籍
    - 查看想读的书籍
    - 删除想读的书籍


- 所属管理
    - 添加所属
    - 查看所属
    - 删除所属


- 类型管理
    - 添加类型
    - 查看类型
    - 删除类型


### 部署
由于服务器是基于node.js的，所以在部署前你需要安装node。（具体安装方法请自行搜索）

首先从github上克隆项目：
```
$ git clone https://github.com/RaHsu/Rabook.git
```
进入项目目录：
```
$ cd Rabook
```
进入服务器端安装依赖：
```
$ cd server
$ npm install
```

启动服务器端（服务器端默认运行在3000端口）：
```
$ node server
```

进入客户端目录安装依赖：
```
$ cd ..
$ cd client
$ npm install
```

构建客户端：
```
$ npm run build
```

启动客户端（客户端默认运行在3333端口）：
```
$ node server
```

启动完毕，你就可以在http://localhost:3333 看到这个应用了。

**注意：**如果你想在其他的电脑上访问这个应用，请在src/assets/js/url.js文件中将你的服务器端口路径写为绝对路径（不能写成localhost），如：
```js
var Server = {
    server: "123.123.123.123:3000"
};
```

### License
MIT
