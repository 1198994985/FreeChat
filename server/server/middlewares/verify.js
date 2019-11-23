const JWT = require('jsonwebtoken')
const { jwtSecret } = require('../config.js')

/**
 * 进行身份认证
 * @param {string} token 客户端存储的token码
 * @return {boolean} 是否认证成功
 */
exports.authVerify = (token) => {
  try {
    const payload = JWT.verify(token.split(' ')[1], jwtSecret)
    console.log('payload', payload);
    return payload;
  } catch (err) {
    console.error(err);
    return false;
  }
}
