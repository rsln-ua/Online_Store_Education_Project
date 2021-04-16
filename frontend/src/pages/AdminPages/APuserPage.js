import { useEffect } from "react"
import { Container, Table } from "react-bootstrap"
import { connect } from "react-redux"
import { actionGetUserById } from "../../redux/actionCreater"

const Page = ({state: {getUserById: userInfo}, actionGetUserById, match}) => {

    useEffect(
        () => actionGetUserById(match.params), []
    )

    return <Container className="py-5">
        <Table striped bordered hover>
            {
                userInfo && Object.keys(userInfo).map(
                    k => <tr>
                    <td><b>{k}</b></td>
                    <td>{userInfo[k]}</td>
                </tr>
                )
            }
        </Table>
    </Container>
}
export const APuserPage = connect(state => ({state: state.promise}), {actionGetUserById})(Page)