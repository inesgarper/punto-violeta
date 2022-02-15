const { isLoggedIn } = require("../middleware/route-guard");

const router = require("express").Router();

/* GET home page */
router.get("/",
  (req, res, next) => {
    const user = req.session.currentUser

    if (!user) {
      res.render('index')

    } else {
      const id = req.session.currentUser._id
      res.render("index", { id, user: req.session.currentUser })
    }


  });

// ---- MAP and CREATE CASE GET
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
