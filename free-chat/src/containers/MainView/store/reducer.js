import * as actionTypes from './constants'
import { fromJS } from 'immutable';

const defaultState = {
  privateMsgs: {},
  newPrivateMsg: ''
}

const addPrivateMsgs = (state, id, message, from_user, time, inLazyLoading) => {
  let OneUserMsgs = state.privateMsgs[from_user]
  OneUserMsgs.unshift({ id, from_user, message, time })
  return { ...state, privateMsgs: { ...state.privateMsgs } }
}

const deletePrivateChat = (state, from_user) => {
  let privateMsgs = state.privateMsgs
  delete privateMsgs[from_user]
  // TODO 发送给服务端，在数据库中删除
  return { ...state, privateMsgs: { ...privateMsgs } }
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRIVATE_CHAT:
      return;
    case actionTypes.ADD_PRIVATE_MASSAGES:
      return addPrivateMsgs(state, ...action.data);
    case actionTypes.SET_PRIVATE_MASSAGES:
      return { ...state, privateMsgs: { ...action.data } }
    // return state.set('privateMsgs', action.data)

    case actionTypes.SET_NEW_MASSAGES:
      return { ...state, newPrivateMsg: action.data }
    // return state.set('newPrivateMsg', action.data)

    case actionTypes.DELETE_PRIVATE_MASSAGES:
      return;
    case actionTypes.DELETE_PRIVATE_CHAT:
      return deletePrivateChat(state, ...action.data);
    default:
      return state;
  }
}
export default reducer;

