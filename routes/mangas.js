var express = require("express");
var router = express.Router();
const mangaCtrl = require("../controllers/manga");

/* GET home page. */
router.get("/:id", mangaCtrl.showManga);
router.post("/:id", mangaCtrl.addReview);

module.exports = router;
