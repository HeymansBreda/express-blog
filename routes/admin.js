/**
 * Created by HeymansBreda on 2017/4/17.
 */
var express = require('express');
var router = express.Router();

router.get('/post', function (req, res, next) {

	res.render('./admin/post', {
		title: 'Express',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});


});



module.exports = router;
