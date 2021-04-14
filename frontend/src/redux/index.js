import {combineReducers} from 'redux'
import cartReducer from './cartReducer'
import authReducer from './authReducer'
import promiseReducer from './promiseReducer'

export default combineReducers({    
    cart: cartReducer,
    promise: promiseReducer,
    auth: authReducer
})