import React, { useEffect } from 'react';
import { Avatar } from 'antd';
import './index.less'

const testImageUrl = `https://tvax3.sinaimg.cn/crop.0.0.1080.1080.50/a58523cbly8g3t56dz5wcj20u00u0jtf.jpg?KID=imgbed,tva&Expires=1572271062&ssig=ZtPWhBFdS0`
function nowDate(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 10).replace('T', ' '); // 2019-11-07
}
// TODO: CSS重构, 获取用户的姓名和头像
/**
 * 消息列表item
 * @param {string} recentlyMsg 最新消息
 * @param {string} recentlyMsgTime 最新消息时间
 * @param {number} id 用户id号
 * @param {function} userItemClick 点击的回调函数,用于点击消息列表
 */
export function UserChatItem({ recentlyMsg, recentlyMsgTime, id, userItemClick }) {
  useEffect(() => {
    console.log('ChatInfoItem 创建了');
    return () => {
      console.log('ChatInfoItem 销毁了');
    }
  }, [])
  const getTime = () => {
    // recentlyMsgTime 格式: 2019-11-07 15:42:47
    let day = recentlyMsgTime.split(' ')[0]
    let time = recentlyMsgTime.split(' ')[1]
    let now = nowDate()
    if (day === now) {
      return time
    } else if ((+now.split('-')[2]) - (+day.split('-')[2]) === 1) {
      return '昨天'
    } else {
      return day
    }
  }
  return (
    <>
      <div className="free-chat" onClick={userItemClick}>
        <div className='free-chat-Item'>
          <div className="free-chat-avatar">
            <Avatar src={testImageUrl} />
          </div>
          <div className='free-Info-content'>
            <div className='free-Info-content-user'>
              <span className='free-Info-content-user-name'>{id}</span>
              <span className='free-Info-content-user-time'>{getTime()}</span>
            </div>
            <div className='free-Info-content-info'>
              {recentlyMsg}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}