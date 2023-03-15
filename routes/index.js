var express = require("express");
var router = express.Router();
const mangaCtrl = require("../controllers/mangas");
const User = require("../models/user");

const isAuth = async (req, res, next) => {
  if (req.session.userid) {
    const user = await User.findById(req.session.userid).exec();
    res.locals.user = user;
    next();
  } else {
    res.status(403).send(req.session);
  }
};

/* GET home page. */
router.get("/", mangaCtrl.showHome);
router.get("/member", isAuth, mangaCtrl.showHomeMem);
router.get("/fetchdata", mangaCtrl.fetchData);

module.exports = router;
