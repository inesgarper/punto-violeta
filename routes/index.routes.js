const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// ---- MAP
router.get("/mapa", (req, res, next) => {
  
  const user = req.session.currentUser 
  
  if (!user) {
    res.render('map')
  
  } else {
    
    const id = req.session.currentUser._id
    console.log(req.session.currentUser._id)
    res.render("map", { id, user: req.session.currentUser })
  }
  
 
})

module.exports = router;
