var session = require("express-session");
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

var express = require("express");
var hogan = require("hogan-express");
var path = require("path");

var app = express();

// session settings
app.use(session({
	name: "sess-id",
	cookie: {
		path: "/",
		httpOnly: true,
		maxAge: null
	},
	secret: "secret"
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ビューの設定
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", hogan);

app.get("/", function(req, res){
	// HTML のレンダリング (生成)
	res.render("template", {
		title: "template example",
		list: ["node.js", "express", "hogan"]
	});
});

app.get("/header", function(req, res){
	// User-Agent の取得
	var ua = req.headers["user-agent"];

	// X-Powered-By の設定
	res.set("X-Powered-By", "densan");

	// レスポンスの送信
	res.send("User-Agent: " + ua);
});

// 認証ページ
app.get("/auth", passport.authenticate("google"));

// 認証コールバックページ
app.get("/auth/callback", passport.authenticate("google", {
	successRedirect: "/auth/success",
	failureRedirect: "/auth/fail"
}));

// 認証成功ページ
app.get("/auth/success", function (req, res) {
	res.send("認証に成功しました。");
});

// 認証失敗ページ
app.get("/auth/success", function (req, res) {
	res.send("認証に失敗しました。");
});

app.listen(3000);