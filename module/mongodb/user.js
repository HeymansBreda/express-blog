/**
 * 用户管理模块
 * Created by HeymansBreda on 2017/4/4.
 */
const mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

// 存储用户信息
User.prototype.save = function (callback) {
    // 要存储的用户文档
    const user = {
        name: this.name,
        password: this.password,
        email: this.email,
        date: Date.now()
    };

    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        // 读取user集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            // 将用户插入集合
            collection.insert(user, {safe: true}, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user[0]); // 成功，将err 为 Null， 并且返回user信息
            })
        })


    })
};

User.get = function (name, callback) {
    // 打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        // 读取数据库user集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 查找用户名
            collection.findOne({
                name
            },function(err, user){
                console.log('name', name);
                mongodb.close();
                if(err){
                    return callback(err);
                }else{
                    return callback(null, user);
                }
            })
        });
    })
};


















