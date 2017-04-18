var express = require('express');
var router = express.Router();
var User = require('../module/mongodb/user');

const md5 = require('md5');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('admin/login', {
		title: 'Express',
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/to', function (req, res, next) {
	const user = req.body.user;
	const pwd = md5(req.body.passwd);

	User.get(user, function (err, user) {
		console.log(user);

		if (!user) {
			req.flash('error', '用户名不存在');
			return res.redirect('/login');
		}else if (user.password != pwd) {
			req.flash('error', '密码错误');
			return res.redirect('/login');
		}else {
			req.session.user = user;
			req.flash('success', '登录成功');
			res.redirect('/');
		}


	});

});

router.get('/out', function (req, res) {
	req.session.user = null;
	req.flash('success', '登出成功');
	res.redirect('/');
});

module.exports = router;
