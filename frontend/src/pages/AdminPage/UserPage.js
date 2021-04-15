import { useEffect } from "react"
import { connect } from "react-redux"
import { actionGetUserById } from "../../redux/actionCreater"

const UserPage = ({state: {getUserById: userINfo}, actionGetUserById, match}) => {

    useEffect(
        () => actionGetUserById(match.params), []
    )

    return <h2>{JSON.stringify(userINfo)}))</h2>
}
export const CUserPage = connect(state => ({state: state.promise}), {actionGetUserById})(UserPage)