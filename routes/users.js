var express = require('express');
var md5 = require('md5');
var router = express.Router();
var User = require('../module/mongodb/user')

router.get('/reg', function (req, res) {
  res.render('reg', {})
});

/* GET users listing. */
router.post('/reg', function (req, res) {

  const user = req.body.username;
  const password = req.body.password;
  const password_re = req.body['password-repeat'];

  // 检查两次输入的密码是否一致
  if (password != password_re) {
    req.flash('err', '两次输入的密码不一致');
    return res.redirect('./reg');
  }

  // 需要存储的用户信息
  const NewUser = new User({
    name: user,
    password: md5(password),
    email: req.body.email,
    date: Date.now()
  });

  // 将用户信息保存的数据库
  User.get(NewUser, function (err, user) {

    if (err) {
      req.flash('error', err);
      res.redirect('/reg');
    }

    // 判断用户名是否重复
    if (user != null) {
      req.flash('用户已存在');
      res.redirect('/reg');
    }

    /**
     * 保存数据
     * 将注册的用户名存储在session
     */
    NewUser.save(function (err, user) {

      if (err) {
        res.flash('err:' + err);
        //console.log(err)
      }

      req.session.user = user;
      req.flash('success', '注册成功');
      res.redirect('/');
    });

  });


});

module.exports = router;
