const router = require("express").Router()

const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require("../models/User.model")

// --- SING IN ROUTES
router.get('/registro', (req, res, next) => res.render('auth/sign-in'))

router.post('/registro', (req, res, next) => {

    const { password } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})

// --- LOG IN ROUTES
router.get('/iniciar-sesion', (req, res, next) => res.render('auth/log-in'))

router.post('/iniciar-sesion', (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/log-in', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/log-in', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})

// --- LOG OUT ROUTE
router.post('/cerrar-sesion', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})


module.exports = router