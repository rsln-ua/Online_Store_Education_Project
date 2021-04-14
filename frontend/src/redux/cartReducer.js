import {CHANGE_GOOD, ADD_GOOD, CLEAR_CART, REMOVE_GOOD, RESOLVED} from "./action"

export default function(state={}, {type, id, count=1, data}){

        if(type == ADD_GOOD){

        if(state.goods?.find(el => el.good == id))
        return state

        const [...goods] = state.goods || []

        goods.push(data.addGood2Cart)

        return {...state, goods}
    }

    if(type == CHANGE_GOOD){

        const [...goods] = state.goods 
        const good = goods.find(el => el.id == id)
        good.count = count

        return {...state, goods}
    }

    if(type == REMOVE_GOOD){

        const [...goods] = state.goods 
        const withoutGood = goods.filter(el => el.id != id)

        return {...state, goods: withoutGood}
    }

    if(type == CLEAR_CART){
        return {}
    }
    
    return state
}