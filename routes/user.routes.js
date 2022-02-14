const router = require("express").Router();
const Case = require("../models/Case.model")

//-------------- New Case


router.post('/:id/crear-caso', (req, res, next) => {
    const { lat, lng, description } = req.body
    const { id } = req.params

    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }
    console.log(location, id, description)
    Case
        .create({ description, location })
        .then(element => console.log(element))
        .then(res.redirect('/'))
        .catch(err => console.log(err))
})


module.exports = router;
