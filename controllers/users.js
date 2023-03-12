const User = require("../models/user");
const Manga = require("../models/manga");
const bcrypt = require("bcrypt");

const SALTROUNDS = 10;

const showLogin = async (req, res) => {
  try {
    const message = "";
    res.render("users/index", { message });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { userid, password } = req.body;
  const user = await User.findOne({ userid }).exec();
  if (user === null) {
    const message = "No such user!";
    res.render("users/login", { message });
    return;
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      req.session.userid = user._id;
      res.redirect("/member");
    } else {
      const message = "password wrong";
      res.render("users/login", { message });
    }
  });
};

const showSignup = async (req, res) => {
  try {
    const message = "";
    res.render("users/add", { message });
  } catch (error) {
    console.log(error);
  }
};

const userRegister = async (req, res) => {
  try {
    const { userid, password, cpassword } = req.body;
    const checkUser = await User.findOne({ userid: userid });
    if (!userid || !password) {
      const message = "Please fill in all fields";
      return res.render("users/add", { message });
    } else if (checkUser === null && password === cpassword) {
      bcrypt.hash(password, SALTROUNDS, async (err, hash) => {
        const user = await User.create({ userid: userid, password: hash });
        user.save();
        const message = "Your account has been registered";
        res.render("users/index", { message });
      });
    } else {
      const message = "userid already exist or password does not match !";
      res.render("users/add", { message });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  showLogin,
  showSignup,
  userRegister,
  login,
};
