import { LOGIN, LOGOUT } from "./action"

export const admin = "admin"
export const user = "user"
export const vasyaPupkin = "vasyaPupkin"


export default function(state, {type, data={}}){

   if(state == undefined && localStorage.token){
        type = LOGIN
    }

    if(type == LOGIN){

        if(!data.login && !localStorage.token)
            return {}
        
        if(data.login)
            localStorage.token = data.login

        const role = JSON.parse(atob(localStorage.token.split('.')[1])).sub.role

        return {...state, role: role}
    }

    if(type == LOGOUT){

        localStorage.token = ''

        return {}
    }

    return state || {}
}