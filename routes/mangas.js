var express = require("express");
var router = express.Router();
const mangaCtrl = require("../controllers/mangas");

/* GET home page. */
router.get("/:id", mangaCtrl.showManga);
router.get("/member/:id", mangaCtrl.showMangaMem);
router.post("/member/:id", mangaCtrl.addReview);
router.delete("/:id");
router.put("/:id");
router.get("/member/:mangaID/:reviewID/:userID/edit", mangaCtrl.showEdit);

module.exports = router;
