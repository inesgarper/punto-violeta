const router = require("express").Router()

const User = require("../models/User.model")
const Event = require("../models/Event.model")

const { isLoggedIn } = require("../middleware/route-guard")
const { userIsEditor } = require("../utils")


// --- EVENTS LIST ROUTE
router.get('/', isLoggedIn, (req, res, next) => {

    const user = req.session.currentUser
    const isEditor = userIsEditor(user)

    Event
        .find()
        .then(allEvents => res.render('events/allEvents', { allEvents, user: req.session.currentUser, isEditor }))
        .catch(error => next(error))
})

// --- CREATE EVENTS ROUTES
router.get('/crear', isLoggedIn, (req, res, next) => {

    const userId = req.session.currentUser._id

    res.render('events/create', { userId })
})

router.post('/crear', (req, res, next) => {

    const { title, type, description, address, URL, start, end, creator, eventImg } = req.body

    const location = {
        address: address,
        URL: URL
    }

    Event
        .create({ title, type, description, location, start, end, creator, eventImg })
        .then(() => res.redirect('/eventos'))
        .catch(err => console.log(err))
})

// --- JOIN EVENT ROUTE
router.post('/:id/unirse', isLoggedIn, (req, res, next) => {

    const userId = req.session.currentUser._id
    const { id } = req.params

    User
        .findByIdAndUpdate(userId, { $addToSet: { events: id } })
        .then(() => res.redirect('/eventos'))
        .catch(err => console.log(err))
})

// --- UNJOIN EVENT ROUTE
router.post('/:id/desunirse', isLoggedIn, (req, res, next) => {

    const userId = req.session.currentUser._id
    const { id } = req.params

    User
        .findByIdAndUpdate(userId, { $pull: { events: id } })
        .then(() => res.redirect('/eventos'))
        .catch(err => console.log(err))
})

// --- DELETE EVENT ROUTE
router.post('/:id/eliminar', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const userId = req.session.currentUser._id

    const promises = [Event.findByIdAndDelete(id), User.findByIdAndUpdate(userId, { $pull: { events: id } })]

    Promise.all(promises)
        .then(() => res.redirect('/eventos'))
        .catch(err => console.log(err))
})


// --- EDIT EVENT ROUTES
router.get('/:id/editar', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .then(theEvent => res.render('events/edit', theEvent))
        .catch(err => console.log(err))
})

router.post('/:id/editar', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const { title, type, description, address, URL, start, end, creator, eventImg } = req.body

    const location = {
        address: address,
        URL: URL
    }

    Event
        .findByIdAndUpdate(id, { title, type, description, location, start, end, creator, eventImg })
        .then(() => res.redirect('back'))
        .catch(err => console.log(err))
})

module.exports = router
