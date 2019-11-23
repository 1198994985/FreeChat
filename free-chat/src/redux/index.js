import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger' // 利用redux-logger打印日志
import { composeWithDevTools } from 'redux-devtools-extension';
import combineReducers from './reducers.js'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // 调用日志打印方法 collapsed是让action折叠，看着舒服点
// const loggerMiddleware = createLogger({ collapsed: true });

// // 创建一个中间件集合
// const middleware = [thunkMiddleware, loggerMiddleware];

//创建store
const store = createStore(
  combineReducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
);
export default store