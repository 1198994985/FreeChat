import io from 'socket.io-client'
import { storage } from '../utils/storage'
import { socketEmit, socketEmitAndGetResponse } from './socket'
import {
  setPrivateMsg,
  addPrivateMsg,
  setNewMsg,
} from '../containers/PrivatePage/store/actionCreators'
import {
  setUserInfoList,
  updateUserInfoList,
} from '../containers/userHomePage/store/actionCreators'
import store from '../redux/index'
class InitApp {
  constructor(props) {
    this._userInfo = JSON.parse(localStorage.getItem('freeUser'));
  }
  _listeningPrivateChatMsg = () => {
    console.log('_listeningPrivateChatMsg')

    window.socket.on('getPrivateMsg', async (data) => {
      console.log('initapp getPrivate', data)

      store.dispatch(addPrivateMsg(data))
    })
  }
  subscribeSocket() {
    window.socket.removeListener('getPrivateMsg')
    this._listeningPrivateChatMsg()
  }
  _initSocket = async () => {
    const { id, token } = this._userInfo;
    window.socket = io(`ws://localhost:3003/?token=${'Bearer ' + token}`)
    socketEmit('initSocket', id)
  }

  _initMessage = async () => {
    const { id } = this._userInfo
    let privateMessage = await socketEmitAndGetResponse('initMessage', id)
    console.log('idd', id, privateMessage)
    let userInfoList = []
    for (let item in privateMessage) {
      let temp = privateMessage[item]
      userInfoList.push({
        id: item,
        recentlyMsgTime: temp[0].time,
        recentlyMsg: temp[0].message
      })
    }
    store.dispatch(setPrivateMsg(privateMessage))
    store.dispatch(setUserInfoList(userInfoList))
    console.log('userInfoList ', userInfoList)
    console.log('privateMessage', privateMessage)
    console.log('initstore', store.getState())
  }


  _init = async () => {
    await this._initSocket()
    this.subscribeSocket()
    await this._initMessage()
  }
  async init() {
    if (this._userInfo) {
      await this._init()
      console.log('init app success');
    }
  }
}

export default InitApp;