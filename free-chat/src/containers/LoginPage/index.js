import React, { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import './index.less'
import { tryLogin } from '../../ajax/'
import { storage, USER } from '../../utils/storage'
const backgroundBubble = '冯 博 最 帅 Super Lucky Bo 哈 哈 哈'.split(' ')

export default function Login(props) {
  const [account, setAccount] = useState('')
  const [passWord, setPassWord] = useState('')
  useEffect(() => {
    if (storage.has(USER)) {
      props.history.push('/main/chat')
    }
    console.log('login useEffect 调用了')
  }, [props.history])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await tryLogin(account, passWord)
    if (!res) {
      return;
    }
    const { message:msg,success, userInfo } = res
    console.log(res)
    if (success) {
      message.success(msg)
      //console.log(props.history.push('/main'))
      storage.set(USER, userInfo)
      props.history.replace('/main/chat')
    } else {
      message.error(msg)
    }
  }

  const accountChange = useCallback(
    (e) => {
      setAccount(e.target.value)
    },
    [],
  )

  const passwordChange = useCallback(
    (e) => {
      setPassWord(e.target.value)
    },
    [],
  )

  return (
    <>
      <div className="login">
        <ul className="bubble-bgwall">

          {backgroundBubble.map((item, index) => {
            return (<li key={index} className='bubble-li' >{item}</li>)
          })}

          <div className="loginBox">
            <div className="SuperLuckyBo">
              <img src="./SuperLuckyBo.png" draggable="false" alt="" />
            </div>
            <form onSubmit={handleSubmit} className="free-form">
              <input id="input" className="free-input" type="text" name="name" value={account} onChange={accountChange} placeholder="请输入账户" autoComplete="off" />
              <label htmlFor="input" className="free-input-label" > 账户 </label>

              <input id="pwd" className="free-input" type="password" name="password" value={passWord} onChange={passwordChange} placeholder="请输入密码" />
              <label htmlFor="pwd" className="free-input-label" > 密码 </label>

              <button type="submit" className="free-button"> 登陆 </button>
            </form>
          </div>
        </ul>

      </div>
    </>
  )
}
