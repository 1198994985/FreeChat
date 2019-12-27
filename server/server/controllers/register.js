const md5 = require('md5')
const userInfo = require('../models/userInfo.js')
// 注册
exports.registerController = async (ctx, next) => {
  const { account, password } = ctx.request.body
  const res = await userInfo.findAccount(account);
  if (res.length) {
    ctx.body = {
      success: false,
      message: `用户名 ${account} 已存在`
    }
  } else {
    try {
      userInfo.insertUser(account, md5(password));
      ctx.body = {
        success: true,
        message: `${account} 注册成功`,
        account,
      }
      console.log(`${account} 注册成功`);

    } catch (err) { // FIXME: 这一步貌似多余
      ctx.status = 503;
      ctx.body = {
        success: false,
        message: `注册失败`
      }
      console.error(err);
    }
    
  }
}