import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  UserChatItem,
} from './component'
import { setUserInfoList, updateUserInfoList } from './store/actionCreators'
import { Input } from 'antd';
import store from '../../redux/';

const { Search } = Input;
const scrollToBottom = () => {
  //const scroll = document.getElementById('chatInfoList')
  // scroll.scrollTop = scroll.scrollHeight;
  // document.getElementById('chat-bottom').scrollIntoView({ block: "end", behavior: "smooth" })
  document.getElementById('chat-bottom').scrollIntoView({ block: "end", behavior: "instant" })
}

function UserHomePage({ myId, userInfoList, setNowChatId }) {
  const userClick = (id) => {
    setNowChatId(id)
  }

  const getUserList = useMemo(() => {
    if (userInfoList) {
      let res = [];
      for (let index in userInfoList) {
        let item = userInfoList[index]
        res.push(<UserChatItem
          key={item.id}
          id={item.id}
          recentlyMsgTime={item.recentlyMsgTime}
          recentlyMsg={item.recentlyMsg}
          userItemClick={userClick.bind(undefined, item.id)}
        />)
      }
      return res
    }
  }, [userInfoList])


  return (
    <div className="free-chat-left" style={{ "overflow": "auto" }}>
      <Search
        placeholder="搜 索"
        onSearch={value => console.log(value)}
        style={{
          'width': '200px',
          'display': 'block',
          'margin': '20px auto',
          'marginBottom': '0',
          'borderRadius': '25px',
          'textAlign': 'center'
        }}
      />
      <br />
      {getUserList}
    </div>
  )
}

UserHomePage.propTypes = {
  userInfoList: PropTypes.array,
  nowChatId: PropTypes.string,
  myId: PropTypes.string,
  setUserInfoList: PropTypes.func,
  updateUserInfoList: PropTypes.func,
  setNowChatId: PropTypes.func,
}
UserHomePage.defaultProps = {
  userInfoList: [],
  nowChatId: '',
  myId: '',
  setUserInfoList: undefined,
  updateUserInfoList: undefined,
  setNowChatId: undefined,
}

const mapStateToProps = state => ({
  userInfoList: state.userInfoListState.userInfoList,
})

const mapDispatchToProps = dispatch => ({
  setUserInfoList(arg) {
    dispatch(setUserInfoList(arg))
  },
  updateUserInfoList(arg) {
    dispatch(updateUserInfoList(arg))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage)
