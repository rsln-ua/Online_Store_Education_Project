import { useEffect } from "react"
import { Container, Table } from "react-bootstrap"
import { connect } from "react-redux"
import { query } from "../graphql"
import { actionDataGetter } from "../redux/actionCreater"

const GoodTr = ({good}) =>
<tr>
    <td>{good.name}</td>
    <td>{good.count}</td>
    <td>{good.price}</td>
</tr>

const OrderPage = ({state: {getOrder: order}, dataGetter, match}) => {

    useEffect(
        () => dataGetter(query.getOrder, match.params), []
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

export const COrderPage = connect(state => ({state: state.promise}), {dataGetter: actionDataGetter})(OrderPage)