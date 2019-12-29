import React, { useEffect, memo } from 'react';
import './index.less'

const Vedio = memo(({ myId,visible, toId, isVideoVisible }) => {

  const hangup = () => { // 挂断通话
    window.socket.emit('1v1hangup', { account: window.isCall, self: myId });
    window.peer.close();
    window.peer = null;
    window.isToPeer = false;
    window.isCall = false;
  }

  const join = () => {
    if (!myId) return;
    window.socket.emit('join', { roomid: myId, account: myId });
  }

  function reply(account, type) {
    window.socket.emit('reply', { account: account, self: myId, type: type });
  }

  const createP2P = async (data) => {
    window.loading = true;
    window.loadingText = '正在建立通话连接';
    await createMedia(data);
  }
  
  function initPeer(data) {
    // 创建输出端 PeerConnection
    let PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    window.peer = new PeerConnection();
    console.log('添加本地流', data)
    window.peer.addStream(window.localstream); // 添加本地流
    // 监听ICE候选信息 如果收集到，就发送给对方
    window.peer.onicecandidate = (event) => {
      if (event.candidate) {
        window.socket.emit('1v1ICE', { account: data.self, self: myId, sdp: event.candidate });
      }
    };
    window.peer.onaddstream = (event) => { // 监听是否有媒体流接入，如果有就赋值给 rtcB 的 src
      window.isToPeer = true;
      window.loading = false;
      let video = document.querySelector('#otherVideo');
      video.srcObject = event.stream;
    };
  }

  const createMedia = async (data) => {
    // 保存本地流到全局
    try {
      window.localstream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
      let video = document.querySelector('#myVideo');
      video.srcObject = window.localstream;
    } catch (e) {
      console.log('getUserMedia: ', e)
    }
    initPeer(data); // 获取到媒体流后，调用函数初始化 RTCPeerConnection
  }
  const createOffer = async (data) => { // 创建并发送 offer
    try {
      // 创建offer
      let offer = await window.peer.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      });
      // 呼叫端设置本地 offer 描述
      await window.peer.setLocalDescription(offer);
      // 给对方发送 offer
      window.socket.emit('1v1offer', { account: data.self, self: myId, sdp: offer });
    } catch (e) {
      console.log('createOffer: ', e);
    }
  }
  const onOffer = async (data) => { // 接收offer并发送 answer
    try {
      // 接收端设置远程 offer 描述
      await window.peer.setRemoteDescription(data.sdp);
      // 接收端创建 answer
      let answer = await window.peer.createAnswer();
      // 接收端设置本地 answer 描述
      await window.peer.setLocalDescription(answer);
      // 给对方发送 answer
      window.socket.emit('1v1answer', { account: data.self, self: myId, sdp: answer });
    } catch (e) {
      console.log('onOffer: ', e);
    }
  }
  const onAnswer = async (data) => { // 接收answer
    try {
      await window.peer.setRemoteDescription(data.sdp); // 呼叫端设置远程 answer 描述
    } catch (e) {
      console.log('onAnswer: ', e);
    }
  }
  const onIce = async (data) => { // 接收 ICE 候选
    try {
      await window.peer.addIceCandidate(data.sdp); // 设置远程 ICE
    } catch (e) {
      console.log('onAnswer: ', e);
    }
  }
  const initSocket = () => {
    window.socket.on('joined', (data) => {

    });
    window.socket.on('reply', async data => { // 收到回复
      window.loading = false;
      console.log(data);
      switch (data.type) {
        case '1': // 同意
          window.isCall = data.self;
          // 对方同意之后创建自己的 peer
          await createP2P(data);
          // 并给对方发送 offer
          createOffer(data);
          break;
        case '2': //拒绝
          console.log('对方正在通话中！')

          break;
        case '3': // 正在通话中
          console.log('对方正在通话中！')
          break;
      }
    });
    window.socket.on('apply', async data => { // 收到请求
      if (window.isCall) {
        reply(data.self, '3');
        return;
      }
      console.log('发起视频聊天', data)
      let flag = await window.confirm(`${data.self}发起视频聊天`)
      if (flag) {
        try {
          await createP2P(data); // 同意之后创建自己的 peer 等待对方的 offer
          window.isCall = data.self;
          reply(data.self, '1');
        } catch (error) {
          reply(data.self, '2');
        }
      }
    })
    window.socket.on('1v1answer', (data) => { // 接收到 answer
      onAnswer(data);
    });
    window.socket.on('1v1ICE', (data) => { // 接收到 ICE
      onIce(data);
    });
    window.socket.on('1v1offer', (data) => { // 接收到 offer
      onOffer(data);
    });
    window.socket.on('1v1hangup', _ => { // 通话挂断
      // window.$message({
      //   message: '对方已断开连接！',
      //   type: 'warning'
      // });
      window.peer.close();
      window.peer = null;
      window.isToPeer = false;
      window.isCall = false;
    });
  }
  useEffect(() => {
    initSocket()
    if (myId) {
      console.log('join')
      join();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myId])
  useEffect(() => {
    console.log('video useEffect')
    console.log(visible,'  ' , toId,' ', isVideoVisible )
    return () => {
    };
  })
  return (
    <div className={visible ? "video-container" : ("video-container " + "video-hidden")}>
      <div>
        <video className="myVideo" src="" id="myVideo" controls autoPlay ></video>
        <h5></h5>
      </div>
      <div>
        <video className="otherVideo" src="" id="otherVideo" controls autoPlay ></video>
      </div>
    </div>
  )
})
export default Vedio