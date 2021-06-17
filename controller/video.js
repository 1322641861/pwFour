var User = require('../models/user')
var Comment = require('../models/comment')
var { getSendResult } = require('../controller/others')

const getVideo = (req, res) => {
    res.render('video/video.html', {
        user: req.session.user,
        vid: req.query.vid,
    })
}

/**
 * 新增评论 body:
 * @param member: 用户信息
 * @param like: 点赞数
 * @param dislike: 踩
 * @param message: 评论
 * @param ctime: 点评时间
 * @param vid: 视频id
 */
const postCommentAdd = async (req, res) => {
    let body = req.body;
    let user = req.session.user;
    body.member = {
        avatar: user.avatar,
        sex: user.sex,
        name: user.name,
        uid: user._id,
    }
    const comment = await Comment(body).save()
    console.log('comment ==> ', comment)
    res.send({
        status: 0,
        data: comment,
        message: 'ok'
    })
}

/**
 * 所有评论
 * @param vid: String
 * @param type: Number  0热度排序 1时间排序
 * @param page: Number 页面
 * @param size: Number 每页的数据量
 */
const getCommentAll = async (req, res) => {
    let query = req.query;
    try {
        let rangeComment = await Comment.find()
            .sort({ctime: Number(query.type)})
            .skip(Number(query.page))
            .limit(Number(query.size)); // 查询表数据 分页查询
        res.send(getSendResult({code: 0, msg: 'ok', query: rangeComment}))
    } catch (error) {
        res.send(getSendResult({code: 1, msg: 'Not Found.'}))
    }
    
}

exports.getVideo = getVideo
exports.postCommentAdd = postCommentAdd
exports.getCommentAll = getCommentAll