var express = require('express');
var router = express.Router();
var User = require('../module/mongodb/user');

const md5 = require('md5');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/to', function(req, res, next) {
    const user = req.body.email;
    const pwd = md5(req.body.passwd);

    User.get(user, function(err, user){
        if(!user){
            req.flash('用户名不存在');
            return res.redirect('/login');
        }

        if(user.password != pwd){
            req.flash('密码错误');
            return res.redirect('/login');
        }

        req.session.user = user;
        req.flash('登录成功');
        req.redirect('/');

    });

});

module.exports = router;
