/**
 * mongodb 运行文件
 * Created by HeymansBreda on 2017/4/2.
 */
var setting = require('../config').mongodb;
const mongodb = require('mongodb');
const DB = mongodb.Db,
    // Connection = mongodb.Connection,
    Server = mongodb.Server;

module.exports = new DB(setting.db, new Server(setting.host, setting.port), {
    safe: true
});