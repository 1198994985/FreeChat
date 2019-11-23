import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './index.less'

/**
 * @param {} props 必需传入两个属性, icon 字体图标class名称,与path路由跳转路径
 * TODO: 优化，避免重复渲染
 */
const IconBtn = (props) => {
  const [selected, setSelected] = useState('')
  useEffect(() => {
    if (props.select) {
      setSelected(' selected')
    } else {
      setSelected('')
    }
  }, [props.select])

  
  // TODO: 删掉它
  useEffect(() => {
    console.log('IconBtn 创建了');
    return () => {
      console.log('IconBtn 销毁了');
    }
  }, [])

  return (
    <>
      {/* <span className={"iconfont " + props.icon} onClick={() => { props.history.push(props.path) }}></span> */}
      {/* <Link to={props.path}><div><span className={"iconfont " + props.icon}></span></div> </Link> */}
      <div className={"iconfont-wrapper " + selected}>
        <span className={"iconfont " + props.icon + selected}><Link to={props.path} style={{ 'display': 'block', 'height': '60px', 'width': '60px', 'transform': 'translate(-30%,-70%)' }} draggable="false"> </Link> </span>
      </div>
    </>
  )
}

export default React.memo(IconBtn)