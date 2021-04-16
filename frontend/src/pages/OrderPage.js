import { useEffect } from "react"
import { connect } from "react-redux"
import { actionGetOrder } from "../redux/actionCreater"
import { Container, Table } from "react-bootstrap"

const GoodTr = ({good}) =>
<tr>
    <td>{good.name}</td>
    <td>{good.count}</td>
    <td>{good.price}</td>
</tr>

const Page = ({state: {getOrder: order}, actionGetOrder, match}) => {

    useEffect(
        () => actionGetOrder(match.params), []
    )

    return <Container>
    <Table>
            <thead>    
                <tr>
                    <th>Название</th>
                    <th>Колличество</th>
                    <th>Цена</th>
                </tr>
            </thead>
            <tbody>
                {
                    order?.goods.map(g => <GoodTr good={g}/>)
                }
            </tbody>
        </Table>
    </Container>
}

export const OrderPage = connect(state => ({state: state.promise}), {actionGetOrder})(Page)