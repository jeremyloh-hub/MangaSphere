const THIRTYMIN = 30 * 60;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
require("./config/database");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const mangasRouter = require("./routes/mangas");
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL,
  collectionName: "sessions",
  ttl: THIRTYMIN,
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/mangas", mangasRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
