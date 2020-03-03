const Koa = require("koa");
const bodyaprser = require("koa-bodyparser");
var path = require("path");
var koaBody = require("koa-body");
var koaStatic = require("koa-static");
const routers = require("./routers/api.js");
const { errorHandle, cors } = require("./middlewares/");
const chatSocket = require("./socket/chatSocket.js");
const { handleUpLoad } = require("./middlewares/fileUpLoad.js");
const app = new Koa();

const server = require("http").createServer(app.callback());
chatSocket(server);
app.use(
  koaBody({
    formidable: {
      //设置文件的默认保存目录，不设置则保存在系统临时目录下  os
      uploadDir: path.resolve(__dirname, "./static/uploads")
    },
    multipart: true // 开启文件上传，默认是关闭
  })
);
//开启静态文件访问
app.use(koaStatic(path.resolve(__dirname, "./static")));
app
  .use(errorHandle)
  .use(cors)
  .use(bodyaprser())
  .use(routers.routes())
  .use(routers.allowedMethods())
  .use(handleUpLoad);

server.listen(3003);
