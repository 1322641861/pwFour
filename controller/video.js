var User = require('../models/user')

const getVideo = (req, res) => {
    res.render('video/video.html')
}

exports.getVideo = getVideo