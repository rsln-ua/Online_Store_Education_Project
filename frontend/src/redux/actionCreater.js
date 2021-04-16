import {ADD_GOOD, CLEAR_CART, REMOVE_GOOD, CHANGE_GOOD, PENDING, RESOLVED, REJECTED, LOGIN, LOGOUT, SEND_PENDING, SEND_RESOLVED, SEND_REJECTED} from './action'
import { mutation, query } from '../graphql'
import {myFetch} from '../myFetch'
import {history} from '../index'

export const actionPending = () => ({type: PENDING})
export const actionResolved = (data) => ({type: RESOLVED, data})
export const actionRejected = () => ({type: REJECTED})

export const actionSendPending = () => ({type: SEND_PENDING})
export const actionSendResolved = (data) => ({type: SEND_RESOLVED, data})
export const actionSendRejected = (e) => ({type: SEND_REJECTED, error: e})


export const actionAddGoodToCart = (id, data) => ({type: ADD_GOOD, data, id})
export const actionChangeGood = (id, count) => count <= 0 ? ({type: REMOVE_GOOD, id}) : ({type: CHANGE_GOOD, id, count})
export const actionClearCart = () => ({type: CLEAR_CART})


export const actionLogin = (data) => ({type: LOGIN, data: data})
export const actionLogout = () => ({type: LOGOUT})

export const actionDataGetter = (query, variables) => 
  async dispatch => {
    try{
      dispatch(actionPending())
      const {data} = await myFetch(query, variables)
      dispatch(actionResolved(data))
    }catch(e){
      dispatch(actionRejected())
    }
  }

export const actionGetCategories = () =>
async dispatch => dispatch(actionDataGetter(query.getCategories))

export const actionGetGoods = () =>
async dispatch => dispatch(actionDataGetter(query.getGoods))

export const actionTotalPrice = (variables) =>
async dispatch => dispatch(actionDataGetter(query.totalPrice, variables))

export const actionGetGoodsByCategory = (variables) =>
async dispatch => dispatch(actionDataGetter(query.getCategoryById, variables))

export const actionGetUser = () =>
async dispatch => dispatch(actionDataGetter(query.getUser))

export const actionGetUserById = (variables) =>
async dispatch => dispatch(actionDataGetter(query.getUserById, variables))

export const actionGetGood = (variables) =>
async dispatch => dispatch(actionDataGetter(query.getGood, variables))

export const actionGetOrder = (variables) =>
async dispatch => dispatch(actionDataGetter(query.getOrder, variables))

export const actionGetOrders = () =>
async dispatch => dispatch(actionDataGetter(query.getOrders))



export const actionAddGood2Cart = (id) =>
async dispatch =>{
    try{
      dispatch(actionSendPending())
      const {data} = await myFetch(mutation.addGood2Cart, {id})
      dispatch(actionSendResolved())
      dispatch(actionAddGoodToCart(id, data))
    }catch(e){
        dispatch(actionRejected(e))
    }
  }

export const actionRegister = (variables) => 
  async dispatch => {
    try{
      dispatch(actionSendPending())
      await myFetch(mutation.signin, variables)
      dispatch(actionSendResolved())
      alert("Регистрация прошла успешно.")
    }catch(e){
      dispatch(actionSendRejected(e))
    }
  }

export const actionRegisterAdmin = (variables) => 
async dispatch => {
  try{
    dispatch(actionSendPending())
    await myFetch(mutation.registerAdmin, variables)
    dispatch(actionSendResolved())
    alert("admin зарегистрирован")
  }catch(e){
    dispatch(actionSendRejected(e))
  }
}

export const actionAuthorize = (variables) => 
  async dispatch => {
    try{
      dispatch(actionSendPending())
      const {data} = await myFetch(query.login, variables)
      dispatch(actionSendResolved())
      dispatch(actionLogin(data))
    }catch(e){
      dispatch(actionSendRejected(e))
    }
  }

export const actionCreateOrder = (variables) => 
  async dispatch => {
    try{
      dispatch(actionSendPending())
      await myFetch(mutation.createOrder, variables)
      dispatch(actionSendResolved())
      dispatch(actionClearCart())
    }catch(e){
      dispatch(actionSendRejected(e))
    }
  }

export const actionAddGood = (variables) => 
  async dispatch => {
    try{
      dispatch(actionSendPending())
      await myFetch(mutation.addGood, variables)
      dispatch(actionSendResolved())
      history.goBack()
    }catch(e){
      dispatch(actionSendRejected(e))
    }
  }

export const actionRemoveCategory = (variables) => 
async dispatch => {
  try{
    dispatch(actionSendPending())
    await myFetch(mutation.removeCategory, variables)
    dispatch(actionSendResolved())
  }catch(e){
    dispatch(actionSendRejected(e))
  }
}

export const actionAddCategory = (variables) => 
  async dispatch => {
    try{
      dispatch(actionSendPending())
      await myFetch(mutation.addCategory, variables)
      dispatch(actionSendResolved())
    }catch(e){
      dispatch(actionSendRejected(e))
    }
  }

export const actionRemoveGood = (variables) =>
  async dispatch => {
    try{
      dispatch(actionSendPending())
      await myFetch(mutation.removeGood, variables)
      dispatch(actionSendResolved())
    }catch(e){
      dispatch(actionSendRejected(e))
    }
  }

export const actionUpdateGood = (variables) =>
async dispatch => {
  try{
    dispatch(actionSendPending())
    await myFetch(mutation.updateGood, variables)
    dispatch(actionSendResolved())
    history.goBack()
  }catch(e){
    dispatch(actionSendRejected(e))
  }
}