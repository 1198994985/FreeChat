const Koa = require('koa')
const router = require('koa-router')()
const { loginController } = require('../controllers/login.js');
const { registerController } = require('../controllers/register.js');
const { userInfoControllers } = require('../controllers/userInfo.js');
const { otherUserInfoControllers } = require('../controllers/otherUserInfo.js');
const {
  markInfoControllers,
  insertMarkControllers
} = require("../controllers/mark.js");
const { jwtSecret } = require('../config.js')

const jwt = require('koa-jwt')({ secret: jwtSecret });

const routers = router
  .post("/login", loginController) // 登陆
  .post("/register", registerController) // 注册
  .get("/userinfo", jwt, userInfoControllers)
  .get("/user/:account", jwt, otherUserInfoControllers)
  .get("/mvmark", markInfoControllers)
  .post("/markInfo", insertMarkControllers);
module.exports = routers