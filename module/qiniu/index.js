const qiniu = require('qiniu');
const config = require('../config').qiniu;

// Access KEY Secret KEY
qiniu.conf.ACCESS_KEY = config.AK;
qiniu.conf.SECRET_KEY = config.SK;

/**
 * 初始化七牛
 * @param pathfile 需要上传的文件
 * @constructor
 */
var Qi = function (pathfile) {
  this.bucket = config.bucket;
  this.key = Date.now() + '.jpg';
  this.pathFile = pathfile;
};

// 构建上传策略
Qi.prototype.token = function () {
  const bucket = this.bucket;
  const key = this.key;

  const putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  return putPolicy.token();
};

/**
 * 上传函数
 * @param uptoken 上传的token 值
 * @param key     上传之后需要保存的文件名
 */
Qi.prototype.uploadFile = function (uptoken, key) {
  var localFile = this.pathFile;  // 需要上传的文件
  var extra = new qiniu.io.PutExtra();

  qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(ret.hash, ret.key, ret.persistentId);
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
    }
  });
};


module.exports = Qi;