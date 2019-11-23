import {
  UPDATE_USER_INFO_LIST,
  SET_USER_INFO_LIST,
} from './constants.js'

export const setUserInfoList = (data) => ({
  type: SET_USER_INFO_LIST,
  data: data
})

export const updateUserInfoList = (data) => ({
  type: UPDATE_USER_INFO_LIST,
  data: data
})



