const router = require("express").Router()

const { userIsSelf, userIsEditor, commentsAreEnable, commentsAreDisable, commentIsOwner } = require("../utils")
const { isLoggedIn } = require("../middleware/route-guard")

const Case = require("../models/Case.model")
const { find } = require("../models/Case.model")


// --- CREATE CASE (POST)
router.post('/:id/crear-caso', (req, res, next) => {

    const { lat, lng, description, creator, enableComments } = req.body

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
        .create({ creator, description, location, enableComments })
        .then(() => res.redirect('/mapa'))
        .catch(err => console.log(err))

})


// ---- CASE DETAILS ROUTE
router.get('/:id/:casoId', isLoggedIn, (req, res, next) => {

    const { id, casoId } = req.params

    const isSelf = userIsSelf(req.session.currentUser._id, id)
    const isEditor = userIsEditor(req.session.currentUser)


    Case
        .findById(casoId)
        .populate('creator')
        .populate({
            path: 'comments',
            populate: [
                { path: 'creator' }
            ]
        })
        .then(caso => {

            const comments = caso.comments.map(comment => {
                return {
                    comment,
                    isOwned: comment.creator._id == req.session.currentUser._id
                }
            })

            res.render('case', {
                id,
                caso,
                isSelf,
                isEditor,
                comments,
                user: req.session.currentUser,
                includesComments: commentsAreEnable(caso),
                disableComments: commentsAreDisable(caso)
            })

        })
        .catch(err => console.log(err))
})

// --- EDIT CASE ROUTES
router.get('/:id/:casoId/editar', isLoggedIn, (req, res, next) => {

    const { id, casoId } = req.params



    Case
        .findById(casoId)
        .then(caso => {
            res.render('edit-case', {
                id,
                caso,
                includesComments: commentsAreEnable(caso),
                disableComments: commentsAreDisable(caso)
            })
        })
        .catch(err => console.log(err))
})

router.post('/:id/:casoId/editar', (req, res, next) => {

    const { lat, lng, description, creator, enableComments } = req.body
    const { casoId } = req.params

    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    Case
        .findByIdAndUpdate(casoId, { creator, description, location, enableComments })
        .then(() => res.redirect('/mapa'))
        .catch(err => console.log(err))
})

// --- DELETE CASE
router.post('/:id/:casoId/eliminar', (req, res, next) => {

    const { id, casoId } = req.params

    Case
        .findByIdAndDelete(casoId)
        .then(() => res.redirect(`/usuario/${id}`))
        .catch(err => console.log(err))
})


module.exports = router
