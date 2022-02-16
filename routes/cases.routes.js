const router = require("express").Router();

const { path } = require("express/lib/application");
const { isLoggedIn } = require("../middleware/route-guard");
const Case = require("../models/Case.model");
// const User = require("../models/User.model");
const { userIsSelf, userIsEditor } = require("../utils");


// ----------- CREATE CASE POST
router.post('/:id/crear-caso', (req, res, next) => {
    const { lat, lng, description, creator, admiteComments } = req.body

    console.log(admiteComments)
    console.log(req.body)

    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    if (!lat || !lng) {

        const user = req.session.currentUser
        const id = req.session.currentUser._id

        res.render('map', { errorMessage: 'introduce la localización del suceso', user, id })
        return
    }
    Case
        .create({ creator, description, location, admiteComments })
        .then(() => res.redirect('/mapa'))
        .catch(err => console.log(err))

})


// ---- Case Details
router.get('/:id/:casoId', isLoggedIn, (req, res, next) => {

    const { id, casoId } = req.params
    const isSelf = userIsSelf(req.session.currentUser._id, id)
    const isEditor = userIsEditor(req.session.currentUser)


    console.log('es el mismo',isSelf,'es editor', isEditor )

    Case
        .findById(casoId)
        .populate('creator')
        .populate({
            path: 'comments',
            populate: [
                {path:'creator'}
            ]  
         })
        .then(caso => res.render('case', { id, caso, isSelf, isEditor, user:req.session.currentUser }))
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
