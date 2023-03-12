var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/users");

/* GET users listing. */
router.get("/", userCtrl.showLogin);
router.get("/add", userCtrl.showSignup);
router.post("/add", userCtrl.userRegister);
router.post("/", userCtrl.login);

module.exports = router;
