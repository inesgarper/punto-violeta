const router = require("express").Router();
const Case = require("../models/Case.model")

router.get("/cases", (req, res, next) => {

    Case
        .find()
        .then(cases => res.json(cases))
        .catch(err => console.log(err))
})

module.exports = router;