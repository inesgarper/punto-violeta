const router = require("express").Router();

const { isLoggedIn } = require("../middleware/route-guard");
const Case = require("../models/Case.model");
const User = require("../models/User.model");
const { userIsSelf, userIsEditor } = require("../utils");
 
// ------ User Panel & User Edit GET
router.get('/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const promises = [Case.find({ creator: id }).populate('creator'), User.findById(id)]
    
    const user = req.session.currentUser
    const isEditor = userIsEditor(user)

    Promise.all(promises)
        .then(([allUserCases, user]) => {
           
            console.log(isEditor)
            res.render('user/panel', { allUserCases, user, isEditor })

        })
        .catch(err => console.log(err))
})
///// Edit User POST

router.post('/:id/editar', (req, res, next) => {

    const { id, username, email } = req.body

    User
        .findByIdAndUpdate(id, { username, email })
        .then(() => res.redirect(`/usuario/${id}`))
        .catch(err => console.log(err))



})



module.exports = router;
