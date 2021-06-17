var proxy = require('http-proxy-middleware')
var fs = require('fs')
var path = require('path')
var jwt = require('jsonwebtoken')
var User = require('../models/user')

/**
 * 从proxyRes获取body数据，返回json对象
 * @param {*} proxyRes 
 * @param {*} res 
 */
 function getBody(proxyRes) {
    return new Promise((resolve, reject) => {
        let body = []
        let len = 0
        proxyRes.on('data', function (chunk) {
            body.push(chunk)
            len += chunk.length
        })
        proxyRes.on('end', function () {
            body = Buffer.concat(body, len).toString()
            const bodyLength = body.length
            if (body.length > 41) {
                body = body.slice(41, bodyLength - 1)
                resolve(JSON.parse(body))
            } else {
                reject('error')
            }
        })
    })
}

const getBaidu = (req, res) => {
    // if (/\/sugrec/.test(req.url))
    const createProxy = proxy('/sugrec', {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        selfHandleResponse : true,
        onProxyRes: async (proxyData, proxyReq, proxyRes) => {
            // 获取接口返回的数据
            let body = {}
            const responseBody = await getBody(proxyData)
            if ((typeof responseBody) !== String) {
                body.data = responseBody.g
                proxyRes.json(body)
            }
        }
    })
    createProxy(req, res)
}

const getToken = (req, res, next) => {
    if (req.url !== '/login' && req.url !== '/registered') {
        let token = req.headers.token || req.query.token || req.body.token;
        if (token) {
            var publicKey = fs.readFileSync(path.join(__dirname, '../public/assets/keys/public_key.pem'));
            jwt.verify(token, publicKey, (err, decoded) => {
                if (err) {
                  return res.send({ 
                    code: 1, 
                    msg: '请先登录' 
                  });
                } else {
                  req.session.user = decoded;  
                //   console.log('other.js getToken token: 验证成功', decoded);
                  next()
                }
            }) 
        } else {
            // return res.status(403).send({
            //     code: 500,
            //     msg: '没有提供token！'
            // });
            return res.send({ 
                code: 1, 
                msg: '请先登录' 
            });
        }
    }
}
const get404Page = (req, res) => {
    res.render('404.html')
}
const getSendResult = ({code, msg, query}) => {
    return {
        status: code,
        message: msg ? msg : '',
        data: query ? query : null
    }
}

const getLoginNav = async (req, res) => {
    req.session.user = await User.findOne({_id: req.session.user._id})
    let navAndLogin = { 
        code: 0, 
        isLogined: true,
        msg: '已登录',
        user: req.session.user
    }
    res.send(navAndLogin)
}

exports.getBaidu = getBaidu
exports.getToken = getToken
exports.get404Page = get404Page
exports.getLoginNav = getLoginNav
exports.getSendResult = getSendResult