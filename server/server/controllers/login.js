const userInfo = require('../models/userInfo.js')
const JWT = require('jsonwebtoken')
const md5 = require('md5')
const { jwtSecret } = require('../config.js')
// 密码错误格式不对的情况，状态码依然是200，返回一个标志，表示是否登陆成功
// 永远不要相信前端传过来的数据，即使前端做过校验
exports.loginController = async (ctx, next) => {
  const { account = '', password = '' } = ctx.request.body
  console.log(ctx.request.body,`/login  ${account} 被请求`)
  if (account === '' || password === '') {
    ctx.body = {
      success: false,
      message: '用户或密码不能为空'
    }
    return;
  }
  console.log(`/login  ${account} 被请求`)

  // TODO :密码加密解密比较
  const res = await userInfo.findActPwd(account)
  if (res.length > 0) {
    // 验证成功后, 签发一个token，把 token 发送给客户端
    ctx.set('Content-Type','application/json')
    if (md5(password) === res[0].password) {
      const { id, account } = res[0]
      const payload = { id }
      console.log(payload);
      console.log('jwtSecret',jwtSecret);
      let token = JWT.sign(payload, jwtSecret, {
        expiresIn: '1day'
      })
      console.log(JWT.verify(token,jwtSecret));
      ctx.body = {
        success: true,
        message: '用户登录成功',
        userInfo: {
          id,
          account,
          token
        }
      }
    } else {
      ctx.body = {
        success: false,
        message:'密码错误'
      }
    }
  } else {
    ctx.body = {
      success: false,
      message:'用户名错误'
    }
  }
}
// (async () => {
//   const a = await userInfo.findActPwd('1198994985',)
//   console.log(a, a instanceof Array, a[0].account)
// })()
