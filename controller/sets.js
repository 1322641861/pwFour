const BiBoNiu = require('../effect')
const { getTitleName } = require('./index')
var User = require('../models/user')
var fs = require('fs')
var path = require('path')

const getAccount = async (req, res) => {
    if (!req.session.user) {
        res.redirect('/login')
        return;
    }
    req.session.user = await User.findOne({_id: req.session.user._id})
    BiBoNiu.find((err, data) => {
        if (err) return res.render('404.html')
        res.render('sets/account.html', {
            title: getTitleName(req.path),
            user: req.session.user
        })
    })
}
const getMemberAccount = async (req, res) => {
}

const postSetsUpdate = async (req, res) => {
    const body = req.body
    const user = req.session.user
    try {
        let updateData = await User.updateOne({_id: user._id}, body)
        req.session.user = await User.findOne({_id: user._id})
        if (updateData && updateData.ok) {
            res.send({
                status: 200,
                msg: '修改成功'
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            msg: error.message
        })
    }
}
/**
 * 图片上传
 */
const imgUpload = (postData, len, callback) => {
    // 将字符串转换为一个字符串对象
    let postObjStr = JSON.stringify(Buffer.concat(postData, len).toString()) // 双重String

    // 转换base64
    // postObjStr单纯转一次string, 会报错... why???
    let postObj = JSON.parse(JSON.parse(postObjStr)) // type: object

    // 过滤, 可商量前端还是后端处理
    let base64Data = postObj.fileImg.replace(/^data:image\/\w+;base64,/, '');

    // 转换Buffer, 最终数据类似于: <Buffer 6d ab 1e ... 72811 more bytes>
    let imgBuffer = Buffer.from(base64Data, 'base64')
    fs.writeFile(path.join(__dirname, '../public/images/avatar/') + postObj.fileName,
        imgBuffer, 
        (err) => {
            if (err) {
                callback(null, err)
            } else {
                console.log('图片保存成功')
                callback(postObj)
            }
        })
}

const postAvatarUpdate = (req, res) => {
    const user = req.session.user
    let postData = []
    let len = 0
    // res.setHeader("Access-Control-Allow-Origin", "*")
    // 接受数据, 自动分段处理
    // 接受的数据类似于: <Buffer 6d ab 1e ... 72811 more bytes> * n 
    req.on('data',  (imgData) => {
        postData.push(imgData)
        len += imgData.length
    })

    req.on('end', () => {
        imgUpload(postData, len, async (data, err) => {
            if (err) return res.send(err)
            try {
                let updateAvatar = await User.updateOne(
                    {_id: user._id},
                    {$set: {
                        avatar: `/public/images/avatar/${data.fileName}`,
                        base64Avatar: data.fileImg
                    }}
                )
                if (updateAvatar && updateAvatar.ok) {
                    req.session.user = await User.findOne({_id: user._id})
                    res.send({
                        status: 200,
                        msg: '修改成功'
                    })
                }
            } catch (error) {
                res.send(error)
            }
        })
    })
}

exports.getAccount = getAccount
exports.getMemberAccount = getMemberAccount
exports.postSetsUpdate = postSetsUpdate
exports.postAvatarUpdate = postAvatarUpdate