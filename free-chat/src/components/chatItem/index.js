import React from "react";
import "./index.less";
import { Avatar } from "antd";
// type == 1代表图片
export function ChatItem({
  myself,
  img,
  name,
  time,
  msg,
  clickImg,
  clickAvatar,
  type = 1
}) {
  const handleMsg = () => {
    if ([2,'2'].includes(type)) {
      return (
        <p>
          <img style={{width:100,height:100}} src={msg} alt="" />
        </p>
      );
    } else if ([3, '3'].includes(type)) {
      
      return (<p>
         <audio controls={true} className="player">
          <source src={msg} type="audio/mpeg" />
        </audio>
        </p>)
    
    }
    else return <p>{msg}</p>;
  };
  return (
    <div className="chat-item">
      {
        <div className={myself ? "otherchat mychat" : "otherchat"}>
          <div className="chat-avatar">
            <Avatar src="https://tvax1.sinaimg.cn/crop.0.0.996.996.180/63885668ly8fjf57kfmgfj20ro0ro0u7.jpg?KID=imgbed,tva&Expires=1572245072&ssig=X%2BRhAqbJfm" />
          </div>
          <div className="chat-info">
            <div className="chat-name">{name && <span> {name} </span>} </div>
            <div className="chat-msg">{handleMsg()}</div>
          </div>
        </div>
      }
    </div>
  );
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
