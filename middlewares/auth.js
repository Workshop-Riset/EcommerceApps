const isLogin = (req, res, next) => {
    if (!req.session.userId) {
        const error = 'Please login first!'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}

const isAdmin = (req, res, next) => {
    if (!req.session.userId && req.session.role !== 'Admin') {
        const error = 'You have no access this page'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}

module.exports = {isLogin, isAdmin}