const router = require("express").Router();

const { isLoggedIn } = require("../middleware/route-guard");
const Case = require("../models/Case.model");
// const User = require("../models/User.model");
const { userIsSelf, userIsEditor } = require("../utils");


// ----------- CREATE CASE POST
router.post('/:id/crear-caso', (req, res, next) => {
    const { lat, lng, description, creator } = req.body

    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    ///////////// NO FUNCIONA no pinta el mensaje

    if (!lat || !lng) {

        const user = req.session.currentUser
        const id = req.session.currentUser._id
        
        res.render('map', { errorMessage: 'introduce la localización del suceso', user,id })
        return
    }
        Case
            .create({ creator, description, location })
            .then(() => res.redirect('/mapa'))
            .catch(err => console.log(err))
    
})


// ---- Case Details
router.get('/:id/:casoId', isLoggedIn, (req, res, next) => {

    const { id, casoId } = req.params
    const isSelf = userIsSelf(req.session.currentUser._id, id)

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


module.exports = router;