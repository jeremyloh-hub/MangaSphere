var express = require("express");
var router = express.Router();
const mangaCtrl = require("../controllers/mangas");

/* GET home page. */
router.get("/:id", mangaCtrl.showManga);
router.get("/member/:id", mangaCtrl.showMangaMem);
router.post("/member/:id", mangaCtrl.addReview);
router.get("/member/:mangaID/:reviewID/:userID/edit", mangaCtrl.showEdit);
router.put("/member/:mangaID/:reviewID/:userID/edit", mangaCtrl.editReview);
router.delete("/member/:mangaID/:reviewID/:userID", mangaCtrl.deleteReview);

module.exports = router;
