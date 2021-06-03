const mongoose = require('mongoose')
const schema = mongoose.Schema

// 连接数据库
mongoose.connect('mongodb://localhost/biboniu',  { useNewUrlParser: true, useUnifiedTopology: true })
// 定义数据结构
const commentSchema = new schema({

})

module.exports = mongoose.model('BiBoNiu', commentSchema)