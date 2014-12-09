var router = require('express').Router();

var model = require('./model');
var User  = model.User;

router.get('/', function(req, res) {
  res.render('register/index', {
    title: 'ユーザ登録',
    nickname: '',
    email: '',
    errors: {}
  });
});

// POSTでフォームから飛んできたデータをモデルに保存、失敗したらフォームに戻す
router.post('/confirm', function(req, res) {
  console.log(req.body);

  var newUser = new User(req.body);
  newUser.save(function(err){
    if (err) {
      res.render('register/index', {
        title: 'ユーザ登録エラー',
        errors: err.errors
      });
    } else {
      req.session.name = req.body.name;
      req.session.email = req.body.email;
      res.redirect('/register/complete');
    }
  });
});

router.get('/complete', function(req, res) {
  res.render('register/complete', {
    title: 'ユーザ登録完了',
    name: req.session.name,
    email: req.session.email
  });
});

module.exports = router;
