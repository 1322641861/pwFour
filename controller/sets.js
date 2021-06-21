const BiBoNiu = require('../effect')
const { getTitleName } = require('./index')
var User = require('../models/user')

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

const postAvatarUpdate = (req, res) => {
    console.log(req.body)
    res.send()
}

exports.getAccount = getAccount
exports.getMemberAccount = getMemberAccount
exports.postSetsUpdate = postSetsUpdate
exports.postAvatarUpdate = postAvatarUpdate