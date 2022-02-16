const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const Case = require("../models/Case.model");
const User = require("../models/User.model");
const Event = require("../models/Event.model")
const { userIsSelf } = require("../utils");
const { findByIdAndUpdate } = require("../models/Case.model");
const { redirect } = require("express/lib/response");

// ------- Create events
router.get('/crear', isLoggedIn, (req, res, next) => {

    //const { id } = req.params

    const userId = req.session.currentUser._id

    res.render('events/create', { userId })
})

// ----------Join Event

router.post('/:id/unirse', (req, res, next) => {

    const userId = req.session.currentUser._id

    const { id } = req.params

   

    User
        .findByIdAndUpdate(userId, { $addToSet: { events:id } })
        .then(() => res.redirect('/eventos'))
        .catch(err => console.log(err))


})

// ------- CASO
// const user = req.session.currentUser

// if (!user) {
//     res.render('map')

// } else {
//     const id = req.session.currentUser._id
//     res.render("map", { id, user: req.session.currentUser })
// }

router.post('/:id/crear', (req, res, next) => {
    const { title, type, description, address, URL, start, end, creator, eventImg } = req.body
    const { id } = req.params

    const location = {
        address: address,
        URL: URL
    }

    Event
        .create({ title, type, description, location, start, end, creator, eventImg })
        .then(() => res.redirect('/eventos'))
        .catch(err => console.log(err))
})

// ------- All Events
router.get('/', (req, res, next) => {

    const userId = req.session.currentUser._id

    Event
        .find()
        .then(allEvents => res.render('events/allEvents', { allEvents, userId }))
        .catch(error => next(error))
})

// ------ Delete Events

router.post('/:id/borrar', (req, res, next) => {

    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.redirect('/eventos'))
        .catch(err => console.log(err))

})

//------- Edit Events 

router.get('/:id/editar', (req, res, next) => {
    const { id } = req.params

    Event
        .findById(id)
        .then(theEvent => res.render('events/edit', theEvent))
        .catch(err => console.log(err))
})

router.post('/:id/editar', (req, res, next) => {
    const { title, type, description, location, start, end, creator, eventImg } = req.body
    const { id } = req.params

    Event
        .findByIdAndUpdate(id, { title, type, description, location, start, end, creator, eventImg })
        .then(() => res.redirect('events/allEvents'))
        .catch(err => console.log(err))
})


module.exports = router;

// router.get('/:id/:casoId/editar', isLoggedIn, (req, res, next) => {
//     const { id, casoId } = req.params


//     Case
//         .findById(casoId)
//         .then(caso => res.render('edit-case', { id, caso }))
//         .catch(err => console.log(err))
// })

// router.post('/:id/:casoId/editar', (req, res, next) => {
//     const { lat, lng, description, creator } = req.body
//     const { casoId } = req.params

//     const location = {
//         type: 'Point',
//         coordinates: [lat, lng]
//     }

//     Case
//         .findByIdAndUpdate(casoId, { creator, description, location })
//         .then(() => res.redirect('/mapa'))
//         .catch(err => console.log(err))