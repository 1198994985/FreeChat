const Koa = require('koa');
const routers = require('./routers/api.js');
const bodyaprser = require('koa-bodyparser');

const { errorHandle, cors } = require('./middlewares/')
const chatSocket = require('./socket/chatSocket.js');
const app = new Koa();

const server = require('http').createServer(app.callback());
chatSocket(server)

app.use(errorHandle)
  .use(cors)
  .use(bodyaprser())
  .use(routers.routes()).use(routers.allowedMethods());


server.listen(3003)
