import {
  SET_PRIVATE_MASSAGES,
  ADD_PRIVATE_MASSAGES,
  SET_NEW_MASSAGES
} from './constants.js'
import { fromJS } from 'immutable'

export const setPrivateMsg = (data) => ({
  type: SET_PRIVATE_MASSAGES,
  data: data
})

export const addPrivateMsg = ( data) => ({
  type: ADD_PRIVATE_MASSAGES,
  data,
})

export const setNewMsg = (data) => ({
  type: SET_NEW_MASSAGES,
  data
})

