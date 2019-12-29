import React, { useEffect, useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { Button, Icon, Card, Upload, message, Modal } from "antd";
import PropTypes from "prop-types";
import { InputAera } from "../RightView/component";

import { ChatItem } from "../../components/chatItem";
import { addPrivateMsg } from "./store/actionCreators";
import { updateUserInfoList } from "../userHomePage/store/actionCreators";
import { p2pApply, sendPrivateMsg } from "../../ajax/socket";
import Vedio from "./video.js";
import "./index.less";
const props = {
  name: "f1",
  action: "http://localhost:3003",
  headers: {
    authorization: "authorization-text"
  }
};
const scrollToBottom = () => {
  document
    .getElementById("chat-bottom")
    .scrollIntoView({ block: "end", behavior: "smooth" });
};

function PrivateChat({
  myId,
  privateMsgs,
  nowChatId,
  addPrivateMsgs,
  updateUserInfoLists
}) {
  const [videoVisible, setVideoVisible] = useState(false);
  const [upLoadVisible, setUpLoadVisible] = useState(false);
  const sendClick = async (inputMsg = "") => {
    if (inputMsg === "") return;
    let msg = await sendPrivateMsg(inputMsg, nowChatId, myId);
    let templist = privateMsgs[nowChatId];
    const data = {
      id: templist[0].id + 1, // 消息的id
      to_user: nowChatId, // 对方id
      from_user: myId,
      message: inputMsg,
      time: msg.time // 发送消息的时间
    };
    addPrivateMsgs(data);
    updateUserInfoLists({
      id: nowChatId,
      recentlyMsgTime: data.time,
      recentlyMsg: data.message
    });
    // TODO： 更新用户聊天列表消息的值
  };

  const videoApply = useCallback(() => {
    // FIXEME: 放到redux中
    window.loading = true;
    window.loadingText = "呼叫中";
    p2pApply(nowChatId, myId);
    setVideoVisible(c => !c);
  }, [nowChatId, myId]);

  const getUserMsg = useMemo(() => {
    let MsgInfo = privateMsgs[nowChatId];
    let res = [];

    for (let index in MsgInfo) {
      let item = MsgInfo[index];
      console.log("item.type", item.type);
      res.unshift(
        <ChatItem
          key={item.id}
          myself={item.from_user === myId}
          msg={item.message}
          name={item.from_user === myId ? myId : item.from_user}
          type={item.type}
        />
      );
    }
    setTimeout(() => {
      scrollToBottom();
    }, 0);
    return res;
  }, [nowChatId, privateMsgs, myId]);
  const sendPic = async (url, type = 2) => {
    let msg = await sendPrivateMsg(url, nowChatId, myId, type);
    let templist = privateMsgs[nowChatId];
    const data = {
      id: templist[0].id + 1, // 消息的id
      to_user: nowChatId, // 对方id
      from_user: myId,
      message: url,
      time: msg.time, // 发送消息的时间
      type
    };
    addPrivateMsgs(data);
    updateUserInfoLists({
      id: nowChatId,
      recentlyMsgTime: data.time,
      recentlyMsg: data.message,
      type
    });
    // TODO： 更新用户聊天列表消息的值
  };
  const handleOk = e => {
    console.log(e);
    setUpLoadVisible(false);
  };

  const handleCancel = e => {
    console.log(e);
    setUpLoadVisible(false);
  };
  const upLoadOnChange = info => {
    if (info.file.status !== "uploading") {
      // TODO：文件类型校验
      const extArr = info.file.name.split(".");
      let ext;
      if (extArr.length) ext = extArr[extArr.length - 1];
      if (!ext) return;
      ext = ext.toLowerCase();
      if (["png", "jpg", "jpeg", "bmp", "gif", "webp", "ai"].includes(ext)) {
        sendPic(info.file.response.fileUrl,2);
      } else if (["doc", "pdf"].includes(ext)) {
        sendPic(info.file.response.fileUrl, 1);
      } else {
        sendPic(info.file.response.fileUrl, 3);
      }
      setUpLoadVisible(false);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };
  const sharing = () => {
    
  }
  return (
    <div className="free-chat-right">
      <div
        className="chat-info-list"
        id="chatInfoList"
        style={{ overflow: "auto" }}
      >
        {nowChatId && getUserMsg}
        <div className="chat-bottom-line" id="chat-bottom">
          <span> —————— 我也是有底线的 —————— </span>
        </div>
      </div>
      <InputAera
        sendClick={sendClick}
        videoApply={videoApply}
        sendPic={sendPic}
        setUpLoadVisible={setUpLoadVisible}
      />
      <Vedio visible={videoVisible} toId={nowChatId} myId={myId} />
      <Modal
        title="文件上传"
        visible={upLoadVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload {...props} onChange={upLoadOnChange}>
          <Button>
            <Icon type="upload" /> 点击上传文件
          </Button>
        </Upload>
      </Modal>
    </div>
  );
}

PrivateChat.propTypes = {
  privateMsgs: PropTypes.object,
  nowChatId: PropTypes.string,
  myId: PropTypes.number,
  addPrivateMsgs: PropTypes.func,
  updateUserInfoLists: PropTypes.func
};

PrivateChat.defaultProps = {
  privateMsgs: {},
  nowChatId: undefined,
  addPrivateMsgs: undefined
};

const mapStateToProps = state => ({
  privateMsgs: state.privateChatsState.privateMsgs
});
const mapDispatchToProps = dispatch => ({
  addPrivateMsgs(args) {
    dispatch(addPrivateMsg(args));
  },
  updateUserInfoLists(args) {
    dispatch(updateUserInfoList(args));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PrivateChat));
