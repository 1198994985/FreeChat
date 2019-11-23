const userInfo = require('../models/userInfo.js')
const { authVerify } = require('../middlewares/verify.js')


// 根据token获取用户信息，但不包括密码,ctx.header.authorization获取header中的token
exports.userInfoControllers = async (ctx) => {
  const payload = authVerify(ctx.header.authorization)
  const id = payload.id
  if (id !== '') {
    const res = await userInfo.getUserInfoById(id)
    console.log(id, res);
    ctx.body = {
      success: true,
      message: '获取用户信息成功',
      userInfo: res,
    }
  } else {
    ctx.body = {
      success: false,
      message: '获取用户信息失败'
    }
  }
}