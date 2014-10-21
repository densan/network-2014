var express = require("express");
var router = express.Router();

var auth = require("./auth");

// トップページ
router.get("/", function(req, res){
  // HTML のレンダリング (生成)
  res.render("template", {
    title: "template example",
    list: ["node.js", "express", "hogan"]
  });
});

// 認証ページ
router.use("/auth", auth);

module.exports = router;
