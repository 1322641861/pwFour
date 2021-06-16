var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var router = require('./routers/router')
var session = require('express-session')
const { get404Page } =require('./controller/others')

var app = express()

// 模板引擎
app.set('views', path.join(__dirname, './views/')) // 默认就是views目录
app.engine('html', require('express-art-template'))
app.engine('art', require('express-art-template'))

// post 是node后台支持以下两种请求体
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 开放静态资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 添加Session数据: req.session.foo = 'bar'
// 访问Seesion数据: req.session.foo
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat', // 增加密码复杂度(安全性,防止伪造), 别人不知道你的密码还加了什么东西
    resave: false,
    saveUninitialized: true, // 无论你是否使用session, 我都默认给你一把钥匙
    // cookie: { secure: true }
}))

// 使用路由管理, 把路由挂载到app中
// app.use(express.Router())
// 设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    next();  
});  
app.use(router)
app.use(get404Page)

app.listen(80, () => {
    console.log('80 server is running')
})