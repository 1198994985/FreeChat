import React, { useState, useCallback } from 'react';
import './index.less'

const iconClassConfig = ['icon-biaoqing', 'icon-wenjianshangchuan', 'icon-tupian']

export function InputAera({ sendClick, videoApply }) {
  const [value, setValue] = useState()
  
  const valueChange = useCallback(
    (e) => {
      setValue(e.target.value)
    },
    [])

  const sendMsg = () => {
    if (!value) {
      return;
    }
    sendClick(value)
    setValue('')
  }

  return (
    <>
      <div className="input-aera">
        <header className="input-aera-header">
          {iconClassConfig.map((item, index) => {
            return (
              <span className={"iconfont " + item} key={index} onClick={videoApply}></span>
            )
          })}
        </header>

        <textarea
          value={value}
          onChange={valueChange}
          
        />
        {/* <div
         
          contentEditable="true"
        >
        </div> */}
        <footer className="input-aera-footer">
          <div className="send-button" onClick={sendMsg} >Send</div>
        </footer>
      </div>
    </>
  )
}