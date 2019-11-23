import React from 'react';
import './index.less'
import { Avatar } from 'antd';

export function ChatItem({ myself, img, name, time, msg, clickImg, clickAvatar }) {
  return (
    <div className="chat-item">
      {
        <div className={myself ? "otherchat mychat" : "otherchat"}>
          <div className="chat-avatar">
            <Avatar src="https://tvax1.sinaimg.cn/crop.0.0.996.996.180/63885668ly8fjf57kfmgfj20ro0ro0u7.jpg?KID=imgbed,tva&Expires=1572245072&ssig=X%2BRhAqbJfm" />
          </div>
          <div className="chat-info">
            <div className="chat-name">{name && <span> {name} </span>} </div>
            <div className="chat-msg">
              {<p>{msg}</p>}
            </div>
          </div>
        </div>
      }
    </div>
  )
}



// ChatItem.PropTypes = {
//   myself: PropTypes.bool,
//   img: PropTypes.bool,
//   name: PropTypes.string,
//   time: PropTypes.string,
//   msg: PropTypes.string,
//   clickImg: PropTypes.func,
//   clickAvatar: PropTypes.func,
// }

// ChatItem.defaultProps = {
//   myself: undefined,
//   img: undefined,
//   name: '',
//   time: undefined,
//   msg: '',
//   clickAvatar: undefined,
//   clickImg() { },
// }








