var BiBoNiu = require('../effect')
var User = require('../models/user')
var md5 = require('blueimp-md5')

const getTitleName = (path) => {
    const temp = 'pwFour动漫网站-您没看错,什么都没有(╥╯^╰╥)'
    const TITLE_NAME = {
        'index': `${temp}`,
        'amusement': `娱乐-${temp}`,
        'cartoon': `动画-${temp}`,
        'dance': `舞蹈-${temp}`,
        'demon': `鬼畜-${temp}`,
        'movie': `放映厅-${temp}`,
        'drama': `番剧-${temp}`,
        'login': `${temp}`,
        'registered': `${temp}`,
    }
    return TITLE_NAME[path.split('/')[1]]
}

const getLogin = (req, res) => {
    const user = req.session.user;
    if (user) {
        res.redirect('/index')
        return;
    }
    BiBoNiu.find((err, data) => {
        if (err) return res.render('404.html')
        res.render('auth/login.html', {
            title: getTitleName(req.path),
            user: req.session.user,
        })
    })
}
const getRegister = (req, res) => {
    const user = req.session.user;
    if (user) {
        res.redirect('/index')
        return;
    }
    BiBoNiu.find((err, data) => {
        if (err) return res.render('404.html')
        res.render('auth/registered.html', {
            title: getTitleName(req.path),
            user: req.session.user,
        })
    })
}
const getLogout = (req, res) => {
    req.session.user = null
    res.redirect('/login')
    // res.redirect('/index')
}
const postRegister =  async (req, res) => {
    /**
     * 1. 获取表单数据 req.body
     * 2. 操作数据库
     *      判断用户是否存在
     *      存在, 不允许注册
     *      不存在, 注册用户
     * 3. 发送响应
     */
    const body = req.body;
    try {
        if (await User.findOne({ phone: body.phone })) {
            return res.status(200).send({
                msg: '手机号已被注册',
                status: 1,
            })
        }

        // 对密码进行 md5 重复加密
        body.password = md5(md5(body.password))
        let user = await new User(body).save()
        // 注册成功, 使用session记录用户登录状态
        req.session.user = user
        res.status(200).send({
            status: 0,
            msg: '注册成功'
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            msg: error.message
        })
    }
}
const postLogin =  async (req, res) => {
    const body = req.body;
    try {
        const phone  = await User.findOne({ 
            phone: body.phone
        });
        const user = await User.findOne({ 
            phone: body.phone,
            password: md5(md5(body.password))
        });
        if (!phone) {
            return res.status(200).send({
                msg: '手机号未注册!',
                status: 1,
            })
        } else if (!user) {
            return res.status(200).send({
                msg: '手机号或密码错误',
                status: 1,
            })
        }

        // 注册成功, 使用session记录用户登录状态
        req.session.user = user
        res.status(200).send({
            status: 0,
            msg: '登录成功'
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            msg: error.message
        })
    }
}

exports.getLogin = getLogin
exports.getRegister = getRegister
exports.getLogout = getLogout
exports.postLogin = postLogin
exports.postRegister = postRegister
