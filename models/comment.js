var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * @param member: 用户信息
 * @param like: 点赞数
 * @param dislike: 踩
 * @param message: 评论
 * @param ctime: 点评时间
 * @param vid: 视频id
 */

var commentSchema = new Schema({
    member: {
        type: Object,
        default: {}
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    message: {
        type: String,
        default: ''
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    vid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)