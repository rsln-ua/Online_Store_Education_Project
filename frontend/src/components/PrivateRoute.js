import { connect } from "react-redux"
import { Redirect, Route } from "react-router"
import { admin, vasyaPupkin } from "../redux/authReducer"
import { actionLogin } from "../redux/actionCreater"


const PrivateRoute = ({state, roles, actionLogin, component: Component, ...rest }) => {

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
export const CPrivateRoute = connect(state => ({state: state.auth}), {actionLogin})(PrivateRoute)