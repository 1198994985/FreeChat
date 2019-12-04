const Koa = require('koa');
const routers = require('./routers/api.js');
const bodyaprser = require('koa-bodyparser');
const time = require('./utils/time.js')
const { errorHandle, cors } = require('./middlewares/')
const chatSocket = require('./socket/chatSocket.js');
const app = new Koa();

const server = require('http').createServer(app.callback());
chatSocket(server)

app.use(errorHandle) // 401 处理
app.use(cors); //跨域
app.use(bodyaprser()) // 获取post请求体

app.use(routers.routes()).use(routers.allowedMethods())



server.listen(3003)
