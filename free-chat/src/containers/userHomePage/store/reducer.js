import * as actionTypes from './constants.js'

const defaultState = {
  userInfoList: [],
}

const updateUserInfoList = (state, data) => {
  if (!data) {
    return state;
  }
  let id = state['userInfoList'].findIndex(item => {
    return item.id == data.id
  })
  state['userInfoList'].splice(id, 1);
  state.userInfoList.unshift(data)
  return { ...state, userInfoList: [...state['userInfoList']] }
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO_LIST:
      return { ...state, userInfoList: action.data }
    case actionTypes.UPDATE_USER_INFO_LIST:
      return updateUserInfoList(state, action.data);
    default:
      return state;
  }
}

export default reducer;