var mongoose = require('mongoose')
var Schema = mongoose.Schema

var indexVSchema = new Schema({
    uid: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        default: ''
    },
    videoUrl: {
        type: String,
        default: ''
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    collect: {
        type: Number,
        default: 0
    },
    share: {
        type: Number,
        default: 0
    },
    video_desc: {
        type: String
    },
})