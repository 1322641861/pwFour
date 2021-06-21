
var express = require('express')
const {
    getLogin,
    getRegister,
    getLogout,
    postLogin,
    postRegister,
    getTitleName
} = require('../controller/auth')
const {
    getHome, getAmusement,
    getCartoon, getDemon,
    getDrama, getIndex,
    getMovie, getDance
} = require('../controller/index')
const { getBaidu, getToken, getLoginNav } = require('../controller/others')
const { getAccount, postSetsUpdate, postAvatarUpdate } = require('../controller/sets')
const { getVideo, postCommentAdd, getCommentAll } = require('../controller/video')

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
    .get('/sugrec', getBaidu)
    .get('/account/setting', getAccount)
    .get('/account/home', getAccount)
    .get('/account/avatar', getAccount)
    // .get('/member/account', getToken, getMemberAccount)
    .get('/video', getVideo)
    .get('/comment/all', getCommentAll)

router
    .post('/registered', postRegister)
    .post('/login', postLogin)
    .post('/sets/update', getToken, postSetsUpdate)
    .post('/login_nav', getToken, getLoginNav)
    .post('/comment/add', getToken, postCommentAdd)
    .post('/sets/avatar', getToken, postAvatarUpdate)

module.exports = router