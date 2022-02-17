const router = require("express").Router()
const fileUploader = require("../config/cloudinary.config")

const User = require("../models/User.model")
const Event = require("../models/Event.model")

const { isLoggedIn } = require("../middleware/route-guard")
const { userIsEditor } = require("../utils")


// --- EVENTS LIST ROUTE
router.get('/', isLoggedIn, (req, res, next) => {

    Event
        .find()
        .then(allEvents => res.render('events/allEvents', { allEvents, user: req.session.currentUser }))
        .catch(error => next(error))
})

// --- CREATE EVENTS ROUTES
router.get('/crear', isLoggedIn, (req, res, next) => {

    const userId = req.session.currentUser._id

    res.render('events/create', { userId })
})

router.post('/crear', fileUploader.single('eventImg'), (req, res, next) => {

    const { title, type, description, address, URL, startTime, date, creator, eventImg } = req.body

    const location = {
        address: address,
        URL: URL
    }

    Event
        .create({ title, type, description, location, startTime, date, creator, eventImg: req.file.path })
        .then(() => res.redirect('/eventos'))
        .catch(err => console.log(err))
})

// --- EVENT DETAILS ROUTE 
router.get('/:id', (req, res, next) => {

    const { id } = req.params

    const user = req.session.currentUser
    const isEditor = userIsEditor(user)

    const promises = [Event.findById(id), User.find({ events: id }).populate('events')]

    Promise.all(promises)
        .then(([theEvent, assistants]) => {
            console.log(assistants)
            res.render('events/details', { theEvent, assistants, user: req.session.currentUser, isEditor })
        })
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
    const { title, type, description, address, URL, startTime, date, eventImg } = req.body

    console.log(id)

    const location = {
        address: address,
        URL: URL
    }

    Event
        .findByIdAndUpdate(id, { title, type, description, location, startTime, date, eventImg })
        .then(() => res.redirect('/mapa'))
        .catch(err => console.log(err))
})

module.exports = router
