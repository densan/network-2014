var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://localhost/hoge');

var userSchema = mongoose.Schema({
  name: { type: String, required: 'ニックネームを入力してください'},
  email : { type: String, required: 'メールアドレスを入力してください', unique: true }
});
userSchema.plugin(uniqueValidator, { message: 'すでに登録されているメールアドレスです' });
var User = mongoose.model('User', userSchema);

exports.User = User;
