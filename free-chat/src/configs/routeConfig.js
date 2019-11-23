import {
  MainView,
  RegisterPage,
  Login
} from '../containers/index.js'
import React, { lazy, Suspense } from "react";

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const ChatView = lazy(() => import('../containers/RightView'))
const SettingView = lazy(() => import('../containers/settingView'))
const FriendView = lazy(() => import('../containers/friendView'))

const DocumentView = lazy(() => import('../containers/documentView/'))
const DataChat = lazy(() => import('../containers/DataChatPage'))
const TodoView = lazy(() => import('../containers/todoView'))
const CalenderView = lazy(() => import('../containers/calenderView'))



export const baseUrl = 'http://localhost:3003'
export const mainRouteConfig = [
  {
    title: '聊天',
    path: '/chat',
    exact: true,
    component: SuspenseComponent(ChatView),
  },
  {
    path: '/setting',
    exact: true,
    component: SuspenseComponent(SettingView),
  },
  {
    path: '/friend',
    exact: true,
    component: SuspenseComponent(FriendView),

  },
  {
    path: '/datachat',
    exact: true,
    component: SuspenseComponent(DataChat),
  },
  {
    path: '/calendar',
    exact: true,
    component: SuspenseComponent(CalenderView),
  },
  {
    path: '/document',
    exact: true,
    component: SuspenseComponent(DocumentView),
  },
  {
    path: '/todoList',
    exact: true,
    component: SuspenseComponent(TodoView),
  },
]

export const firstRouteConfig = [
  {
    path: ['/login', '/Login', '/LOGIN'],
    exact: true,
    component: Login,
  },
  {
    path: ['/main', '/Main', '/MAIN'],
    exact: false,
    component: MainView,
  },
  {
    path: ['/register', '/Register', '/REGISTER'],
    exact: true,
    component: RegisterPage,
  },
];