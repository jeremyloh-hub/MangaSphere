var express = require("express");
var router = express.Router();
const mangaCtrl = require("../controllers/manga");

/* GET home page. */
router.get("/:id", mangaCtrl.showManga);

module.exports = router;
