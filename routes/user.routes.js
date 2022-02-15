const router = require("express").Router();

const { isLoggedIn } = require("../middleware/route-guard");
const Case = require("../models/Case.model");
const User = require("../models/User.model");
const { userIsSelf, userIsEditor } = require("../utils");

// ------ User Panel
router.get('/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const promises = [Case.find({ creator: id }).populate('creator'), User.findById(id)]
    const user = req.session.currentUser
    
    const isEditor = userIsEditor(user)

    console.log(isEditor)

    Promise.all(promises)
        .then(([allUserCases, user]) => {
            console.log(isEditor, "abajo")
            res.render('user/panel', { allUserCases, user, isEditor })

        })
        .catch(err => console.log(err))
})


// ----------- CREATE CASE POST
router.post('/:id/crear-caso', (req, res, next) => {
    const { lat, lng, description, creator } = req.body
    // const { id } = req.params
    console.log('creador', creator)
    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    /////////////

    if (!lat || !lng) {
        const error = { errorMessage: 'introduce la localización del suceso' }

        router.get('/mapa', (req, res, next) => res.render('map', { error }))



    } else {

        /////////////

        Case
            .create({ creator, description, location })
            .then(element => console.log(element))
            .then(res.redirect('/mapa'))
            .catch(err => console.log(err))
    }
})


// ---- Case Details
router.get('/:id/:casoId', (req, res, next) => {

    const { id, casoId } = req.params
    const isSelf = userIsSelf(req.session.currentUser._id, id)

    console.log(isSelf)

    Case
        .findById(casoId)
        .then(caso => res.render('case', { id, caso, isSelf }))
        .catch(err => console.log(err))
})

// ------ Edit Case
router.get('/:id/:casoId/editar', isLoggedIn, (req, res, next) => {
    const { id, casoId } = req.params


    Case
        .findById(casoId)
        .then(caso => res.render('edit-case', { id, caso }))
        .catch(err => console.log(err))
})

router.post('/:id/:casoId/editar', (req, res, next) => {
    const { lat, lng, description, creator } = req.body
    const { casoId } = req.params

    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    Case
        .findByIdAndUpdate(casoId, { creator, description, location })
        .then(() => res.redirect('/mapa'))
        .catch(err => console.log(err))
})

// ------- Delete Case
router.post('/:id/:casoId/eliminar', (req, res, next) => {
    const { id, casoId } = req.params

    Case
        .findByIdAndDelete(casoId)
        .then(() => res.redirect(`/usuario/${id}`))
        .catch(err => console.log(err))
})

// ---------Edit User
router.get('/:id/editar', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => req.render('user/edit', { user }))
        .catch(err => console.log(err))

})

router.post('/:id/editar', (req, res, next) => {

    const { id, username, email } = req.body

    User
        .findByIdAndUpdate(id, { username, email })
        .then(() => res.redirect(`/usuario/${id}`))
        .catch(err => console.log(err))



})

module.exports = router;
