var BiBoNiu = require('../effect')

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
        'account': temp,
    }
    return TITLE_NAME[path.split('/')[1]]
}

const getHome = (req, res) => {
    res.redirect('/index')
}
const getIndex = (req, res) => {
    BiBoNiu.find((err, data) => {
        if (err) return res.render('404.html')
        res.render('index.html', {
            title: getTitleName(req.path),
            user: req.session.user
        })
    })
}
const getCartoon = (req, res) => {
    BiBoNiu.find((err, data) => {
        if (err) return res.render('404.html')
        res.render('cartoon/cartoon.html', {
            user: req.session.user,
            title: getTitleName(req.path),
        })
    })
}
const getDrama = (req, res) => {
    BiBoNiu.find((err, data) => {
        if (err) return res.render('404.html')
        res.render('drama/drama.html', {
            title: getTitleName(req.path),
            user: req.session.user,
        })
    })
}
const getDemon = (req, res) => {
    BiBoNiu.find((err, data) => {
        if (err) return res.render('404.html')
        res.render('demon/demon.html', {
            title: getTitleName(req.path),
            user: req.session.user,
        })
    })
}
const getAmusement = (req, res) => {
    BiBoNiu.find((err, data) => {
        if (err) return res.render('404.html')
        res.render('amusement/amusement.html', {
            title: getTitleName(req.path),
            user: req.session.user,
        })
    })
}
const getMovie = (req, res) => {
    BiBoNiu.find((err, data) => {
        if (err) return res.render('404.html')
        res.render('movie/movie.html', {
            title: getTitleName(req.path),
            user: req.session.user,
        })
    })
}
const getDance = (req, res) => {
    BiBoNiu.find((err, data) => {
        if (err) return res.render('404.html')
        res.render('dance/dance.html', {
            title: getTitleName(req.path),
            user: req.session.user,
        })
    })
}

function exportsList() {
    const getList = {
        'getHome': getHome,
        'getAmusement': getAmusement,
        'getCartoon': getCartoon,
        'getDemon': getDemon,
        'getDrama': getDrama,
        'getIndex': getIndex,
        'getMovie': getMovie,
        'getDance': getDance,
        'getTitleName': getTitleName
    }
    for (const item in getList) {
        exports[item] = getList[item]
    }
}
exportsList()