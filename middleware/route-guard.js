const req = require("express/lib/request");

const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect('/iniciar-sesion')
        return
    }
    next();
}

const isCurrentUser = (req, res, next) => {
    if (req.session) {
        if (req.session.currentUser) {
            req.app.locals.what = req.session.currentUser
            next()
        } else if (!req.session.currentUser) {
            req.app.locals.what = undefined
            next()
        }
    } else {
        req.app.locals.what = undefined
        next()
    }
}

module.exports = {
    isLoggedIn,
    isCurrentUser
}

