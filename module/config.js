/**
 * 系统配置文件
 * Created by HeymansBreda on 2017/4/2.
 */
module.exports = {
  mongodb: {
    cookieSecret: "myblog",
    db: "blog",
    host: "localhost",
    port: "27017"
  },
  qiniu: {
    AK: 'XxzTAWb2rlr1EEyDDocpBq5Zz9zLWdYRdn8HAsBi',
    SK: 'tcfAQuH0yNdDCdKXwAR6OmN0k7Qno4atfQMIeEBZ',
    bucket: 'markdown'
  }
};