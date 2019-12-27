const markInfo = require("../models/mark.js");
const time = require("../utils/time.js");
// 根据token获取用户信息，但不包括密码,ctx.header.authorization获取header中的token
exports.markInfoControllers = async ctx => {
  let res;
  let request = ctx.request;
  let req_query = request.query;

  if (req_query && req_query.id && req_query.type) {
    res = await markInfo.getMarkById(req_query.id, req_query.type);
  }
  if (res && res.length) {
    console.log("搜索评论", res);
    ctx.body = {
      success: true,
      data: res
    };
  } else {
    console.log("无评论", res);
    ctx.body = {
      success: false,
      message: "无评论"
    };
  }
};
// 根据token获取用户信息，但不包括密码,ctx.header.authorization获取header中的token
exports.insertMarkControllers = async ctx => {
  let res;
  const { theId, from_id, msg, type = 0 } = ctx.request.body;
   console.log("res", theId, from_id, msg, type);
  if (theId && from_id) {
    res = await markInfo.insertMark(theId, from_id,msg, time(), type);
     console.log("res", theId, from_id, msg, type);
  }
 
  if (res) {
    ctx.body = {
      success: true,
      data: res
    };
  } else {
    ctx.body = {
      success: false,
      message: ""
    };
  }
};
