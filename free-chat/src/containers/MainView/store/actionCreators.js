
import {
  UPDATE_USER_INFO_LIST,
  SET_USER_INFO_LIST,
  SET_PRIVATE_MASSAGES,
  ADD_PRIVATE_MASSAGES,
  SET_NEW_MASSAGES
} from './constants.js'


const setUserInfoList = (data) => ({
  type: SET_USER_INFO_LIST,
  data: data
})

const updateUserInfoList = (data) => ({
  type: UPDATE_USER_INFO_LIST,
  data: data
})

const setPrivateMsg = (data) => ({
  type: SET_PRIVATE_MASSAGES,
  data: data
})

const addPrivateMsg = (id, message, from_user, time, inLazyLoading = false) => ({
  type: ADD_PRIVATE_MASSAGES,
  data: { id, message, from_user, time, inLazyLoading }
})

const setNewMsg = (data) => ({
  type: SET_NEW_MASSAGES,
  data
})

export default { setPrivateMsg, addPrivateMsg, setNewMsg, setUserInfoList, updateUserInfoList}


