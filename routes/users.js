/**
 * user 路由
 * @type {*}
 */

var express = require('express');
var md5 = require('md5');
var router = express.Router();
var User = require('../module/mongodb/user');

router.get('/reg', function (req, res) {
	res.render('admin/reg', {
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

/* GET users listing. */
router.post('/reg', function (req, res) {

	const user = req.body.username;
	const password = req.body.password;
	const password_re = req.body['password-repeat'];

	// 检查两次输入的密码是否一致
	if (password != password_re) {
		req.flash('error', '两次输入的密码不一致');
		return res.redirect('/users/reg');
	}

	// 需要存储的用户信息
	const NewUser = new User({
		name: user,
		password: md5(password),
		email: req.body.email,
		date: Date.now()
	});

	// 将用户信息保存的数据库
	User.get(NewUser.name, function (err, user) {

		if (err) {
			req.flash('error', err);
			res.redirect('/users/reg');
		}

		// console.log(user);

		// 判断用户名是否重复
		if (user != null) {
			req.flash('error', '用户已存在');
			res.redirect('/users/reg');
		} else {
			/**
			 * 保存数据
			 * 将注册的用户名存储在session
			 */
			NewUser.save(function (err, user) {
				if (err) {
					res.flash('error:' + err);
					res.redirect('/users/reg');
				}
				req.session.user = user;
				req.flash('success', '注册成功');
				res.redirect('/');
			});
		}
	});
});

module.exports = router;
