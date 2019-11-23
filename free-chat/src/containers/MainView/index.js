import React, { useEffect, useReducer, useContext, useState } from 'react';
import { renderRoutes } from 'react-router-config'
import { mainRouteConfig } from '../../configs/routeConfig'
import LeftNav from '../../components/left-Nav/'
import InitApp from '../../ajax/initApp'
import './index.less'
import { getMyInfo } from '../../ajax/'
import { storage } from '../../utils/storage'
import store from '../../redux'

export default function MainView(props) {
  const [isInit, setInit] = useState(false)

  useEffect(() => {
    (async () => {
      if (!storage.getToken()) {
        props.history.push('/login');
        return;
      }
      const res = await getMyInfo();
      if (!(res instanceof Object)) {
        return;
      }
      // 登陆过期，或者未登录
      if (res && String(res.status) === '401') {
        storage.removeToken();
        props.history.push('/login');
        return;
      }
      store.dispatch({ type: 'SET_USERID', data: res.userInfo[0].id });
      const init = new InitApp();
      await init.init();
      setInit(true);
    })()
  }, [props.history])

  if (isInit) {
    return (
      <>
        <LeftNav />
        {renderRoutes(mainRouteConfig)}
      </>
    )
  }
  return null;

}
