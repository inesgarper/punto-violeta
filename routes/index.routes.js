const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");


/* GET home page - landing*/
router.get("/",  (req, res, next) => {

    const user = req.session.currentUser

    if (!user) {
      res.render('index')

    } else {
      const id = req.session.currentUser._id
      res.render("index", { id, user: req.session.currentUser })
    }
})

// ---- MAP and Case Form
router.get("/mapa", (req, res, next) => {

  const user = req.session.currentUser

  if (!user) {
    res.render('map')

  } else {
    const id = req.session.currentUser._id
    res.render("map", { id, user: req.session.currentUser })
  }


})

module.exports = router;
