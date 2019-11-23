import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import {
  InputAera
} from '../RightView/component'

import { ChatItem } from '../../components/chatItem'
import { addPrivateMsg } from './store/actionCreators'
import { updateUserInfoList} from '../userHomePage/store/actionCreators'
import {
  p2pApply,
  sendPrivateMsg
} from '../../ajax/socket'
import Vedio from './video.js'
import './index.less'
const scrollToBottom = () => {
  //const scroll = document.getElementById('chatInfoList')
  // scroll.scrollTop = scroll.scrollHeight;
  document.getElementById('chat-bottom').scrollIntoView({ block: "end", behavior: "smooth" })
  // document.getElementById('chat-bottom').scrollIntoView({ block: "end", behavior: "instant" })
}

function PrivateChat({ myId, privateMsgs, nowChatId, addPrivateMsgs, updateUserInfoLists }) {
  const [videoVisible, setVideoVisible] = useState(false)

  const sendClick = async (inputMsg = "") => {
    if (inputMsg === '') return;
    let msg = await sendPrivateMsg(inputMsg, nowChatId, myId)
    let templist = privateMsgs[nowChatId]
    const data = {
      id: templist[0].id + 1, // 消息的id
      to_user: nowChatId, // 对方id
      from_user: myId,
      message: inputMsg,
      time: msg.time // 发送消息的时间
    }
    addPrivateMsgs(data)
    updateUserInfoLists({ id: nowChatId, recentlyMsgTime: data.time, recentlyMsg:data.message})
    // TODO： 更新用户聊天列表消息的值
  }

  const videoApply = useCallback(
    () => {
      // FIXEME: 放到redux中
      window.loading = true;
      window.loadingText = '呼叫中';
      p2pApply(nowChatId, myId)
      setVideoVisible(c => !c)
    },
    [nowChatId, myId],
  )
  const getUserMsg = useMemo(() => {
    let MsgInfo = privateMsgs[nowChatId]
    let res = []

    for (let index in MsgInfo) {
      let item = MsgInfo[index]
      res.unshift(<ChatItem
        key={item.id}
        myself={item.from_user === myId}
        msg={item.message}
        name={item.from_user === myId ? myId : item.from_user}
      />)
    }
    setTimeout(() => { scrollToBottom() }, 0)
    return res
  }, [nowChatId, privateMsgs, myId])
  return (
    <div className="free-chat-right" >
      <div className="chat-info-list" id='chatInfoList' style={{ "overflow": "auto" }}  >
        {nowChatId && getUserMsg}
        <div className='chat-bottom-line' id='chat-bottom'><span> ——————  我也是有底线的 —————— </span></div>
      </div>
      <InputAera
        sendClick={sendClick}
        videoApply={videoApply}
      />
      <Vedio
        visible={videoVisible}
        toId={nowChatId}
        myId={myId}
      />
    </div>
  )
}

PrivateChat.propTypes = {
  privateMsgs: PropTypes.object,
  nowChatId: PropTypes.string,
  myId: PropTypes.number,
  addPrivateMsgs: PropTypes.func
}

PrivateChat.defaultProps = {
  privateMsgs: {},
  nowChatId: undefined,
  addPrivateMsgs: undefined
}


const mapStateToProps = state => ({
  privateMsgs: state.privateChatsState.privateMsgs
})
const mapDispatchToProps = dispatch => ({
  addPrivateMsgs(args) {
    dispatch(addPrivateMsg(args))
  },
  updateUserInfoLists(args) {
    dispatch(updateUserInfoList(args))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PrivateChat))