const router = require("express").Router()

const Case = require("../models/Case.model")
const User = require("../models/User.model")
const Event = require("../models/Event.model")

const { isLoggedIn } = require("../middleware/route-guard")
const { userIsSelf, userIsEditor } = require("../utils")

// --- USER PROFILE & EDIT USER (GET)
router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    const user = req.session.currentUser
    const isEditor = userIsEditor(user)
    const isSelf = userIsSelf(id, req.session.currentUser._id)

    if (!isSelf) {
        res.redirect('back')
        return
    }

    const promises = [Case.find({ creator: id }).populate('creator'), User.findById(id).populate('events'), Event.find()]

    Promise.all(promises)
        .then(([allUserCases, user, allEvents]) => res.render('user/panel', { allUserCases, user, isEditor, allEvents }))
        .catch(err => console.log(err))
})

// --- EDIT USER (POST)
router.post('/:id/editar', (req, res, next) => {

    const { id, username, email } = req.body

    User
        .findByIdAndUpdate(id, { username, email })
        .then(() => res.redirect(`/usuario/${id}`))
        .catch(err => console.log(err))
})

module.exports = router

// -- DELETE USER ----- PENDIENTE HASTA TENER PANEL DEL ADMINISTRADOR
router.post('/:id/eliminar', (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})