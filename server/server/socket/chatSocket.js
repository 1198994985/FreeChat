const socketIo = require("socket.io");
const UserInfo = require("../models/userInfo.js");
const ChatInfo = require("../models/ChatInfo.js");
const { authVerify } = require("../middlewares/verify.js");
const time = require("../utils/time.js");

//const io = require('socket.io')(server);

// 先存在内存中，以后再改
const users = {}; // 保存用户
const sockS = {}; // 保存客户端对应的socket

const chatSocket = server => {
  const io = socketIo(server);

  io.use((socket, next) => {
    const token = socket.handshake.query.token;
    console.log("token", token);
    if (authVerify(token)) {
      console.log("token 验证成功");
      return next();
    }
    return next(new Error(`Authentication error! time =>${time()}`));
  });

  io.on("connection", socket => {
    const socketId = socket.id;
    console.log("socketId ", socketId);

    // 初始化,获得socketid并保存到数据库中,也可以保存到redis中
    socket.on("initSocket", async user_id => {
      console.log("initSocket   ", user_id);
      try {
        await UserInfo.saveUserSocketId(user_id, socketId);
      } catch (error) {
        console.log("error", error.message);
        io.to(socketId).emit("error", { code: 500, message: error.message });
      }
    });

    /**  初始化， 获取群聊和私聊的数据*/
    socket.on("initMessage", async (user_id, fn) => {
      console.log("initmeassage", user_id);

      try {
        const privateMsg = await ChatInfo.getAllPrivateMsg(user_id);
        const privateList = await UserInfo.getPrivateList(user_id);

        let res = {},
          result = {};
        for (let i in privateList) {
          res[privateList[i].user_id] = [];
        }
        privateMsg.forEach((item, index) => {
          if (item.from_user == user_id) {
            if (res[item.to_user]) {
              res[item.to_user].push(item);
            } else {
              res[item.to_user] = [];
              res[item.to_user].push(item);
            }
          } else {
            if (res[item.from_user]) {
              res[item.from_user].push(item);
            } else {
              res[item.from_user] = [];
              res[item.from_user].push(item);
            }
          }
        });
        for (let i in res) {
          if (res[i].length !== 0) {
            result[i] = res[i];
          }
        }
        fn(result);
      } catch (error) {
        console.log("error", error.message);
        io.to(socketId).emit("error", { code: 500, message: error.message });
      }
    });

    /**发送私聊信息 */
    socket.on("sendPrivateMsg", async (data, fn) => {
      try {
        if (!data) return;
        data.time = time();
        await Promise.all([ChatInfo.savePrivateMsg({ ...data })]);
        const socketid = await UserInfo.getUserSocketId(data.to_user);
        // io.to(socketid).emit('getPrivateMsg', data); // 发送给对方

        io.to(socketid[0].socketid).emit("getPrivateMsg", data); // 发送给对方

        console.log(data.to_user, " ", socketid[0].socketid);
        fn(data); // 返回给自己
      } catch (error) {
        console.log("error", error.message);
        io.to(socketId).emit("error", { code: 500, message: error.message });
      }
    });
    sokcet.on("initGroupChat", async (user_id, fn) => {
      try {
        const groupList = await UserInfo.getGroupList(user_id);
        groupList.forEach(item => {
          socket.join(item.to_group_id);
        });

        fn("init GroupChat success");
      } catch (err) {
        console.log("error", error.message);
        io.to(socketId).emit("error", { code: 500, message: error.message });
      }
    });



    
    socket.on("join", data => {
      // roomid 设为发起人的id ？
      socket.join(data.roomid, () => {
        if (!users[data.roomid]) {
          users[data.roomid] = [];
        }
        let obj = {
          account: data.account,
          id: socket.id
        };
        let arr = users[data.roomid].filter(v => v.account === data.account);
        if (!arr.length) {
          users[data.roomid].push(obj);
        }
        sockS[data.account] = socket;
        io.in(data.roomid).emit(
          "joined",
          users[data.roomid],
          data.account,
          socket.id
        ); // 发给房间内所有人
        // socket.to(data.roomid).emit('joined',data.id);
      });
    });
    socket.on("offer", data => {
      // console.log('offer', data);
      socket.to(data.roomid).emit("offer", data);
    });
    socket.on("answer", data => {
      // console.log('answer', data);
      socket.to(data.roomid).emit("answer", data);
    });
    socket.on("__ice_candidate", data => {
      // console.log('__ice_candidate', data);
      socket.to(data.roomid).emit("__ice_candidate", data);
    });
    // 1 v 1
    socket.on("apply", data => {
      // 转发申请
      console.log("apply", data);
      if (!sockS[data.account]) {
        return;
      }
      sockS[data.account].emit("apply", data);
    });
    socket.on("reply", data => {
      // 转发回复
      if (!sockS[data.account]) {
        return;
      }
      sockS[data.account].emit("reply", data);
    });
    socket.on("1v1answer", data => {
      // 转发 answer
      if (!sockS[data.account]) {
        return;
      }
      sockS[data.account].emit("1v1answer", data);
    });
    socket.on("1v1ICE", data => {
      // 转发 ICE
      if (!sockS[data.account]) {
        return;
      }
      sockS[data.account].emit("1v1ICE", data);
    });
    socket.on("1v1offer", data => {
      // 转发 Offer
      if (!sockS[data.account]) {
        return;
      }
      sockS[data.account].emit("1v1offer", data);
    });
    socket.on("1v1hangup", data => {
      // 转发 hangup
      if (!sockS[data.account]) {
        return;
      }
      sockS[data.account].emit("1v1hangup", data);
    });
  });
};

module.exports = chatSocket;
