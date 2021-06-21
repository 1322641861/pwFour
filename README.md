### MongoDB

注意环境变量配置就行:

>  E:\mongoDB\mongodb\bin

![image-20210308174201714](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20210308174201714.png)

不然mongod命令找不到

连接启动:

```shell
# mongodb 默认使用执行 mongod 命令所处盘符跟目录下的 /data/db 作为自己的数据存储目录
# 所以第一次执行改命令前先手动创建一个 /data/db 文件夹(根目录)
mongod
# 然后直接命令行启动:
mongo
# 退出
exit
```

![image-20210308180748003](C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20210308180748003.png)

如果想修改默认的数据存储目录, 可以:

```shell
# 先连接
mongod --dbpath=数据存储目录路径
# 然后启动
mongo
# 退出
exit
```

**注意: 修改了默认数据存储目录之后, 每次开启都要执行上述两行代码(分开cmd执行)**


### token的方式登录

#### jwt(json web token)生成token

**npm install jsonwebtoken**

```shell
# 公钥和私钥不一样, 俗称非对称加密
# 生成私钥
> openssl 
Openssl > genrsa -out private_key.pem 2048
# 生成公钥
Openssl > rsa -in private_key.pem -pubout -out public_key.pem
```

```js
// 生成token 
var privateKey = fs.readFileSync(path.join(__dirname, '../public/assets/keys/private_key.pem'));
var token = jwt.sign(user.toJSON(), privateKey, { algorithm: 'RS256'}, {expiresIn: "2h"});
res.status(200).send({
    status: 0,
    msg: '登录成功',
    token: token
})

// 解密
var publicKey = fs.readFileSync(path.join(__dirname, '../public/assets/keys/public_key.pem'));
const get_token = jwt.verify(token, publicKey)
```

### node项目一般要安装的插件:
> 1. express
> 2. body-parser  // post请求必须
> 3. art-template express-art-template // html页面渲染

> 后台:
>
> 1. mongoose
> 2. nodemon // node热重载, 1.18.0亲测正常(最新版的包含剩余参数符号..., js可能无法识别部分es6)
> 3. blueimp-md5 // 数据库数据加密
> 4. express-session // session状态
> 5. jsencrypt  node-jsencrypt // JSEncrypt 加密

> 其他:
>
> 1. bootstrap@3.3.7  // bootstrap-css-only
> 2. jquery
> 3. cheerio  // 爬虫
> 4. jsonwebtoken  // 生成token
> 5. layui-laydate // 日历组件


### 自己编写的步骤

- 处理模板
- 配置开放资源文件
- 配置express模板引擎
- 简单路由: 渲染静态页面出来
- 路由设计
- 提取路由模块
- 由于接下来一系列的操作都需要处理文件数据, 所以我们需要封装一个effect.js文件
- 先写好effect.js文件
  - 查询所有列表数据的Api find
  - findById
  - save
  - updateById
  - deleteById..
- 实现具体功能
  - 通过路由收到请求
  - 接收请求中的数据(get, post)
  - 调用api处理数据
  - 根据操作结果给客户端发送响应