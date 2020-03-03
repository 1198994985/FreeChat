const Koa = require("koa");
const socketIo = require("socket.io");
const app = new Koa();

const server = require("http").createServer(app.callback());

const chatSocket = server => {
  const io = socketIo(server);
  io.use((socket, next) => {
       return next();

  });
  io.on("connection", socket => {
    console.log("连接成功");
    socket.on("test", async () => { 
      console.log("test")
    })
  });
};
chatSocket(server);

server.listen(8090);
