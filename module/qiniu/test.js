const qiniu = require('./index');


    var qi = new qiniu('./1.jpg');

    qi.uploadFile(qi.token(), qi.key);