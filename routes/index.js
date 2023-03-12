var express = require("express");
var router = express.Router();
const mangaCtrl = require("../controllers/manga");

/* GET home page. */
router.get("/", mangaCtrl.showHome);

module.exports = router;
