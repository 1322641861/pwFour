var mongoose = require('mongoose')
var Schema = mongoose.Schema

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
    oid: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)