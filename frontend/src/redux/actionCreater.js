import { mutation, query } from '../graphql'
import {ADD_GOOD, CLEAR_CART, REMOVE_GOOD, CHANGE_GOOD, PENDING, RESOLVED, REJECTED, LOGIN, LOGOUT, LOGIN_FAILED, SEND_PENDING, SEND_RESOLVED, SEND_REJECTED} from './action'
import {myFetch} from '../myFetch'

export const actionAddGood = (id, data) =>({type: ADD_GOOD, data, id})
export const actionChangeGood = (id, count) => {
  if(count <= 0)
  return {type: REMOVE_GOOD, id}

  return {type: CHANGE_GOOD, id, count}
}
export const actionClearCart = () => ({type: CLEAR_CART})
  
export const actionAddGood2Cart = (id) =>
dispatch =>{
    try{
    myFetch(mutation.addGood2Cart, {id})
    .then(q => dispatch(actionAddGood(id, q.data)))
  }catch(e){
    console.error(e)
  }
}

export const actionDataSender = (query, variables, resCb, rejCb) => 
  async dispatch =>{
    try{
      dispatch(actionSendPending())
      let {data} = await myFetch(query, variables)

      // console.log(data)

      dispatch(actionSendResolved(data))

      resCb && resCb(data)
    }catch(e){
      console.error(e)

      dispatch(actionSendRejected())
      rejCb && rejCb(e)
    }
  }

export const actionPending = () => ({type: PENDING})
export const actionResolved = (data) => ({type: RESOLVED, data})
export const actionRejected = () => ({type: REJECTED})

export const actionSendPending = () => ({type: SEND_PENDING})
export const actionSendResolved = (data) => ({type: SEND_RESOLVED, data})
export const actionSendRejected = () => ({type: SEND_REJECTED})

export const actionDataGetter = (query, variables) => 
  async dispatch => {
    try{
      dispatch(actionPending())
      const {data} = await myFetch(query, variables)
      // console.log(data)
      dispatch(actionResolved(data))
    }catch(e){
      console.error(e)
      dispatch(actionRejected())
    }
  }

export const actionLogin = (data) => ({type: LOGIN, data: data})

export const actionLogout = () => ({type: LOGOUT})