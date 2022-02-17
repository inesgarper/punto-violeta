const req = require("express/lib/request");

const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect('/iniciar-sesion')
        return
    }
    next();
}


const checkRole = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.render('/iniciar-sesion', {
        errorMessage: `Desautorizado, solo rol ${admittedRoles}`
    })
}


module.exports = { isLoggedIn, checkRole }

