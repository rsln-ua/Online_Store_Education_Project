import { useEffect } from "react"
import { connect } from "react-redux"
import { query } from "../../graphql"
import { actionDataGetter } from "../../redux/actionCreater"

const UserPage = ({state: {getUserById: userINfo}, dataGetter, match}) => {
    console.log('пришло')

    useEffect(
        () => dataGetter(query.getUserById, match.params), []
    )

    return <h2>{JSON.stringify(userINfo)}))</h2>
}
export const CUserPage = connect(state => ({state: state.promise}), {dataGetter: actionDataGetter})(UserPage)