const router = require("express").Router();

const Case = require("../models/Case.model");
const Comment = require("../models/Comment.model")

// ---- Create Comment

router.post('/:id/caso/comentar', (req, res, next) => {

    const { content, caseId } = req.body

    const creator = req.session.currentUser._id

    Comment
        .create({ content, creator, caseId })
        .then((comment) => {
            return Case.findByIdAndUpdate(caseId, { $addToSet: { comments: comment } })
        })

        .then(() => res.redirect('back'))
        .catch(err => console.log(err))
})

// ---- Delete Comment

router.post('/:id/eliminar-comentario', (req, res, next) => {


    const { id } = req.params

    Comment
        .findByIdAndDelete(id)
        .then(() => res.redirect('back'))
        .catch(err => console.log(err))
})



module.exports = router;
