var express = require("express");
var router = express.Router();
const mangaCtrl = require("../controllers/mangas");

/* GET home page. */
router.get("/", mangaCtrl.showHome);
router.get("/member", mangaCtrl.showHomeMem);

module.exports = router;
