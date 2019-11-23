import io from 'socket.io-client'
import { storage } from '../utils/storage'

 //window.socket = io(`ws://localhost:3003/?token=${'Bearer ' + storage.getToken()}`)


// window.socket.on('connect', function (socket) {
//   console.log('成功连接服务器')
// })

// window.socket.on('initMessage', async (data) => {
//   console.log('initMessage', data)
// })



export const socketEmit = (emitName, data) => {
  console.log('发送消息', data)
  try {
    window.socket.emit(emitName, data);
  } catch (error) {
    console.log(error)
  }
}


export const socketEmitAndGetResponse = (emitName, data, onError) => {
  return new Promise((resolve, reject) => {
    try {
      window.socket.emit(emitName, data, (response) => {
        resolve(response);
      });
    } catch (error) {
      if (onError) {
        onError(error);
      }
      reject(error);
    }
  });
}

/**
 * 发送点对点视频
 * @param {string | number} otherId 对方id
 * @param {string | number} ownId 自己的id
 */
export const p2pApply = (otherId, ownId) => socketEmit('apply', { account: otherId, self: ownId }) 

/**
 * 发送私聊信息
 * @param {string} inputMsg 
 * @param {string | number} otherId 对方id
 * @param {string | number} ownId 自己的id
 */
export const sendPrivateMsg = (inputMsg,otherId,ownId)=>socketEmitAndGetResponse('sendPrivateMsg', { message: inputMsg, to_user: otherId, from_user: ownId })

