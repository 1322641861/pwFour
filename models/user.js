var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        // 注意: 写Date.now() 会即刻调用, 相当于写死了时间
        // 如果你没有传递此参数, 则mongoose就回调用default指定的函数
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/images/avatar_default.png'
    },
    description: {
        type: String,
        default: ''
    },
    sex: {
        type: Number,
        default: -1, // 0女, 1男, -1保密
        enum: [-1, 0, 1]
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        enum: [0, 1, 2], // 0正常 1禁言 2账号封禁
        default: 0
    },
    keep: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)