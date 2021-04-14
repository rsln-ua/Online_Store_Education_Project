import {PENDING, RESOLVED, REJECTED, SEND_PENDING, SEND_RESOLVED, SEND_REJECTED} from './action'
export default function(state={}, {type, data}){

    if(type == PENDING){
        return {...state, status: PENDING}
    }
    if(type == RESOLVED){
        return {...state, status: RESOLVED, ...data}
    }
    if(type == REJECTED){
        return {...state, status: REJECTED}
    }
    if(type == SEND_PENDING){
        return {...state, send_status: SEND_PENDING}
    }
    if(type == SEND_RESOLVED){
        return {...state, send_status: SEND_RESOLVED, ...data}
    }
    if(type == SEND_REJECTED){
        return {...state, send_status: SEND_REJECTED}
    }

    return state
}