import axios from 'axios'
import { message } from 'antd'
import { storage } from '../utils/storage'
import { baseUrl } from '../configs/routeConfig'

axios.defaults.withCredentials = true;      // 跨域
axios.defaults.baseURL = baseUrl;

let whiteList = ['/login', '/register']

const gainError = (status) => {
  let errMsg = ''
  switch (status) {
    case 400:
      errMsg = '错误请求'
      break;
    case 401:
      errMsg = '未授权，请重新登录'
      break;
    case 403:
      errMsg = '拒绝访问'
      break;
    case 404:
      errMsg = '请求错误,未找到该资源'
      break;
    case 405:
      errMsg = '请求方法未允许'
      break;
    case 408:
      errMsg = '请求超时'
      break;
    case 500:
      errMsg = '服务器端出错'
      break;
    case 501:
      errMsg = '网络未实现'
      break;
    case 502:
      errMsg = '网络错误'
      break;
    case 503:
      errMsg = '服务不可用'
      break;
    case 504:
      errMsg = '网络超时'
      break;
    case 505:
      errMsg = 'http版本不支持该请求'
      break;
    default:
      errMsg = `连接错误${status}`
  }
  return errMsg;
}

axios.interceptors.response.use(function (response) {
  return response;  // 一定要有返回值
}, function (error) {
  // TODO:// 401 重定向到登陆
  return Promise.reject(error);
});

axios.interceptors.request.use(
  config => {
    if (!whiteList.includes(config.url)) {
      const res = storage.getToken()
      if (res) {
        console.log(res)
        config.headers.Authorization = 'Bearer ' + storage.getToken();
      }
    }
    return config;
  }, error => {

  });


const request = async (url, data = {}, type = 'GET') => {
  let promise
  try {
    if (type === 'GET') {
      promise = await axios.get(url, { params: data })
    } else {
      promise = await axios.post(url, data)
    }
    return promise.data
  } catch (error) {
    if (error && error.response) {
      message.error(gainError(error.response.status))
    } else {
      message.error(`Network Error ${error}`)
    }

    if (error && error.response && String(error.response.status) === '401') {
      return {
        status: '401'
      }
    }
  }
}

export const tryLogin = (account, password) => request('/login', { account, password }, 'POST')
export const getMyInfo = () => request('/userinfo', {}, 'GET')






