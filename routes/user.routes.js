const router = require("express").Router();
const Case = require("../models/Case.model");
const User = require("../models/User.model");

// ------ User Panel
router.get('/:id', (req, res, next) => {
    const { id } = req.params
    const promises = [Case.find({ creator: id }).populate('creator'), User.findById(id)]

    Promise.all(promises)
        .then(([allUserCases, user]) => {
            res.render('user/panel', { allUserCases, user })

        })
        .catch(err => console.log(err))
})


//-------------- New Case
router.post('/:id/crear-caso', (req, res, next) => {
    const { lat, lng, description, creator } = req.body
    const { id } = req.params

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

    Case
        .findById(casoId)
        .then(caso => {
            console.log(caso)
            res.render('case', { id, caso })
        })
        .catch(err => console.log(err))

})

// ------ Edit Case
router.get(':/id/:casoId/editar', (req, res, next) => {
    const { id, casoId } = req.params

    User
        .findById(id)
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
module.exports = router;
