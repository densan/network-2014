var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var ect = require("ect");
var path = require("path");

var register = require("./register");

var app = express();

// body parser の設定
app.use(bodyParser.urlencoded({extended: false}));

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

// ビューの設定
app.set("view engine", "ect");
app.engine("ect", ect({
	watch: true,
	root: path.resolve(__dirname, "views"),
	ext: ".ect"
}).render);

// ルートの読み込み
app.use("/register", register);

app.listen(3000);
