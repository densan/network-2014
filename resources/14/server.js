var express = require("express");
var session = require("express-session");
var hogan = require("hogan-express");
var passport = require("passport");
var path = require("path");

var routes = require("./routes");

var app = express();

// session の設定
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

// ルートの読み込み
app.use(routes);

app.listen(3000);
