import * as actionTypes from './constants'
import { fromJS } from 'immutable';

const defaultState = {
  privateMsgs: {},
  newPrivateMsg: '',
  userId: ''
}

const addPrivateMsgs = (state, data) => {
  const { from_user, to_user, message, time,type } = data
  let OneUserMsgs
  console.log('redux ', data, state.userId )
  if (from_user == state.userId) {
    OneUserMsgs = state.privateMsgs[to_user]
  } else {
    OneUserMsgs = state.privateMsgs[from_user]
  }

  console.log("action.data", OneUserMsgs, {
    id: OneUserMsgs[0].id + 1,
    from_user,
    message,
    time,
    type
  });
  OneUserMsgs.unshift({
    id: OneUserMsgs[0].id + 1,
    from_user,
    message,
    time,
    type
  });
  return { ...state, privateMsgs: { ...state['privateMsgs'] } }

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
      return state;
    case actionTypes.ADD_PRIVATE_MASSAGES:
      return addPrivateMsgs(state, action.data);
    case actionTypes.SET_PRIVATE_MASSAGES:
      return { ...state, privateMsgs: { ...action.data } }
    // return state.set('privateMsgs', action.data)

    case actionTypes.SET_NEW_MASSAGES:
      return { ...state, newPrivateMsg: action.data }
    // return state.set('newPrivateMsg', action.data)

    case actionTypes.DELETE_PRIVATE_MASSAGES:
      return state;
    case actionTypes.DELETE_PRIVATE_CHAT:
      return deletePrivateChat(state, ...action.data);
    case actionTypes.SET_USERID:
      return { ...state, userId:action.data}
    default:
      return state;
  }
}
export default reducer;

