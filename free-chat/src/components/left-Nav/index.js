import React, { useEffect, } from 'react';
import menuList from '../../configs/leftNavConfig'
import { withRouter } from 'react-router-dom'
import { Avatar } from 'antd';
import IconBtn from '../iconBtn/'
// import { ChatInfoItem } from '../chatInfoItem'
import './index.less'
// import { FreeAvatar } from '../free-avatar'
function LeftNav(props) {


  // TODO: 删掉它
  useEffect(() => {
    console.log('当前地址：', props.history.location.pathname);
    console.log('LeftNav 创建了');
    return () => {
      console.log('LeftNav 销毁了');
    }
  }, [props.history.location.pathname])

  return (
    <div className='free-layout-main'>
      <div className="NavWrapper">
        {/* <FreeAvatar image="https://tvax1.sinaimg.cn/crop.0.0.996.996.180/63885668ly8fjf57kfmgfj20ro0ro0u7.jpg?KID=imgbed,tva&Expires=1572245072&ssig=X%2BRhAqbJfm"/> */}
        <Avatar src="https://tvax1.sinaimg.cn/crop.0.0.996.996.180/63885668ly8fjf57kfmgfj20ro0ro0u7.jpg?KID=imgbed,tva&Expires=1572245072&ssig=X%2BRhAqbJfm" />
        {menuList.map((item) => {
          return <IconBtn key={item.key} path={item.key} icon={item.icon} title={item.title} select={props.history.location.pathname === item.key} />
        })}
      </div >
    </div >

  )
}
export default withRouter(LeftNav)