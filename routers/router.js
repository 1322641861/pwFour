
var express = require('express')
var proxy = require('http-proxy-middleware')
const {
    getLogin,
    getRegister,
    getLogout,
    postLogin,
    postRegister
} = require('../controller/auth')
const {
    getHome, getAmusement,
    getCartoon, getDemon,
    getDrama, getIndex,
    getMovie, getDance
} = require('../controller/index')

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

const router = express.Router()

router.get('/', getHome)

router
    .get('/index', getIndex)
    .get('/cartoon', getCartoon)
    .get('/drama', getDrama)
    .get('/dance', getDance)
    .get('/demon', getDemon)
    .get('/amusement', getAmusement)
    .get('/movie', getMovie)
    .get('/login', getLogin)
    .get('/registered', getRegister)
    .get('/logout', getLogout)
    .get('/sugrec', (req, res) => {
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
    })

router
    .post('/registered', postRegister)
    .post('/login', postLogin)

module.exports = router