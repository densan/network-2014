var express = require("express");
var router = express.Router();

var passport = require("passport");
var GoogleStrategy = require("passport-google").Strategy;

passport.use(new GoogleStrategy({
  returnURL: "http://localhost:3000/auth/callback",
  realm: "http://localhost:3000/"
}, function (id, profile, done) {
  console.log("id:", id);
  console.log("profile:", profile);

  profile.id = id;

  done(null, profile);
}));

var users = {};

passport.serializeUser(function (user, done) {
  users[user.id] = user;
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  var user = users[id];

  if (user) {
    done(null, user);
  } else {
    done("user is not exists");
  }
});

// 認証ページ
router.get("/", passport.authenticate("google"));

// 認証コールバックページ
router.get("/callback", passport.authenticate("google", {
  successRedirect: "/auth/success",
  failureRedirect: "/auth/fail"
}));

// 認証成功ページ
router.get("/success", function (req, res) {
  res.send("認証に成功しました。");
});

// 認証失敗ページ
router.get("/success", function (req, res) {
  res.send("認証に失敗しました。");
});

module.exports = router;
