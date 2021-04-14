// import { connect } from "react-redux"
// import { Redirect, Route } from "react-router"
// import { admin, vasyaPupkin } from "../redux/authReducer"
// import { actionLogin } from "../redux/actionCreater"


// const PrivateRoute = ({state, roles, actionLogin, component: Component, ...rest }) => {

//     console.log(state)

//     const role = state.role || (localStorage.token && JSON.parse(atob(localStorage.token.split('.')[1])).sub.role) || vasyaPupkin

//     return <Route {...rest} render={(props) => (
//         roles.find(r => r == role)
//         ? <Component {...props} />
//         : role == admin ?
//         <Redirect to='/admin'/>
//         :
//         <Redirect to='/'/>
//     )} />
// }
// export const CPrivateRoute = connect(state => ({state: state.auth}), {actionLogin})(PrivateRoute)

import { connect } from "react-redux"
import { Redirect, Route } from "react-router"
import { admin, vasyaPupkin } from "../redux/authReducer"
import { actionLogin } from "../redux/actionCreater"


const PrivateRoute = ({state, roles, actionLogin, component: Component, ...rest }) => {

    console.log(state)

    state = state.auth

    // const role = state.role || (localStorage.token && JSON.parse(atob(localStorage.token.split('.')[1])).sub.role) || vasyaPupkin
    const role = state.role || vasyaPupkin

    return <Route {...rest} render={(props) => (
        roles.find(r => r == role)
        ? <Component {...props} />
        : role == admin ?
        <Redirect to='/admin'/>
        :
        <Redirect to='/'/>
    )} />
}
export const CPrivateRoute = connect(state => ({state: state}), {actionLogin})(PrivateRoute)