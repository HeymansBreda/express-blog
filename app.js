var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./module/config');
var mongodb = config.mongodb;
var flash = require('connect-flash');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 快闪数据
app.use(flash());

// 将session存储到mongodb数据库中
app.use(session({
    secret: mongodb.cookieSecret,
    key: mongodb.db,//cookie name
    // cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        // db: mongodb.db,
        // host: mongodb.host,
        // port: mongodb.port
        url: 'mongodb://localhost/blog',
        ttl: 14*24*60*60
    })
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/status', express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/users', users);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
