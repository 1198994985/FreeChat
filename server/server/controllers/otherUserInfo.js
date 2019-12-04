const userInfo = require('../models/userInfo.js')


// 根据token获取用户信息，但不包括密码,ctx.header.authorization获取header中的token
exports.otherUserInfoControllers = async (ctx) => {
  const res = await userInfo.findDataByAccount(ctx.params.account)
  // TODO:判断自己account与要搜索的account是否相同
  if (res.length) {
    console.log('搜索好友', res);
    ctx.body = {
      success: true,
      message: `用户存在`,
      userInfo: res,
    }
  } else {
    console.log('用户不存在', res);
    ctx.body = {
      success: false,
      message: '用户不存在'
    }
  }
}
