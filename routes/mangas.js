var express = require("express");
var router = express.Router();
const mangaCtrl = require("../controllers/mangas");

const isAuth = async (req, res, next) => {
  if (req.session.userid) {
    const user = await User.findById(req.session.userid).exec();
    res.locals.user = user;
    next();
  } else {
    res.status(403).send(req.session);
  }
};

router.get("/:id", isAuth, mangaCtrl.showManga);
router.get("/member/:id", isAuth, mangaCtrl.showMangaMem);
router.post("/member/:id", isAuth, mangaCtrl.addReview);
router.get(
  "/member/:mangaID/:reviewID/:userID/edit",
  isAuth,
  mangaCtrl.showEdit
);
router.put(
  "/member/:mangaID/:reviewID/:userID/edit",
  isAuth,
  mangaCtrl.editReview
);
router.delete(
  "/member/:mangaID/:reviewID/:userID",
  isAuth,
  mangaCtrl.deleteReview
);

module.exports = router;
