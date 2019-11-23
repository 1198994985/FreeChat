import { combineReducers } from "redux";

import privateChatsReducers from '../containers/PrivatePage/store/reducer'
import userInfoListReducers from '../containers/userHomePage/store/reducer'

export default combineReducers({
  privateChatsState: privateChatsReducers,
  userInfoListState: userInfoListReducers
});