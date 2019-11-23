/**
 * @example
 * 关键点：
 * 1、如果需要支持 cookies,
 *    Access-Control-Allow-Origin 不能设置为 *,
 *    并且 Access-Control-Allow-Credentials 需要设置为 true
 *    (注意前端请求需要设置 withCredentials = true)
 * 2、当 method = OPTIONS 时, 属于预检(复杂请求), 当为预检时, 可以直接返回空响应体, 对应的 http 状态码为 204
 * 3、通过 Access-Control-Max-Age 可以设置预检结果的缓存, 单位(秒)
 * 4、通过 Access-Control-Allow-Headers 设置需要支持的跨域请求头
 * 5、通过 Access-Control-Allow-Methods 设置需要支持的跨域请求方法
 */
exports.cors = async (ctx, next) => {
  ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Origin,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Range,Content-Length,Accept");// 表明服务器支持的所有头信息字段.
  ctx.set('Access-Control-Allow-Origin', ctx.header.origin); // 允许来自所有域名请求
  ctx.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');// 设置所允许的HTTP请求方法
  ctx.set('Access-Control-Allow-Credentials', true);// 字段可选。布尔值，表示是否允许发送Cookie。默认Cookie不包括在CORS请求之中

  // 字段可选，用来指定本次预检请求的有效期，单位为秒。
  // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  ctx.set('Access-Control-Max-Age', 3600 * 24);

  /*
    CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
        Cache-Control、
        Content-Language、
        Content-Type、
        Expires、
        Last-Modified、
        Pragma。
    */
  // 需要获取其他字段时，使用Access-Control-Expose-Headers，
  // getResponseHeader('fb')可以返回我们所需的值
  // https://www.rails365.net/articles/cors-jin-jie-expose-headers-wu
  // ctx.set("Access-Control-Expose-Headers", "fb");

  // 使用场景：对于一些提交到服务器处理的数据，只需要返回是否成功的情况下，可以考虑用状态码204来作为返回信息，从而省略多余的数据传输。
  // 使用ajax时，当只需要知道响应成功或失败的情况，可以用204来代替200，件数多余的数据传输。
  if (ctx.request.method === 'OPTIONS') {
    ctx.status = 204
  } else {
    await next();
  }
}




//const cors = require('koa2-cors')
// app.use(cors({
//   origin:(ctx)=>{
//       return ctx.header.origin;
// }
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
//   allowHeaders: ['WWW-Authenticate', 'Server-Authorization','Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Requested-With' , 'yourHeaderFeild',"Access-Control-Allow-Headers"],
//   keepHeadersOnError:true
// }));



