import { useEffect } from "react"
import { Link } from "react-router-dom";
import { Container, Table, Alert } from "react-bootstrap"
import { connect } from "react-redux"
import { query } from "../graphql"
import {actionDataGetter} from "../redux/actionCreater"

const Order = ({order}) =>
<tr>
    <td><Link to={`/order/${order.id}`}>{order.id}</Link></td>
    <td>{order.total}</td>
    <td>{(new Date(+order.created)).toLocaleDateString()}</td>
</tr>

const UserOrdersPage = ({ state: {getUser: orders}, DataGetter }) => {
    useEffect(
        () => DataGetter(query.getUser), []
    )
    return  <Container>
        {
        orders?.orders && orders.orders.length != 0  ?
         <Table>
            <thead>    
                <tr>
                <th>id</th>
                <th>Сумма</th>
                <th>Дата</th>
                </tr>
            </thead>
             <tbody>
                 {
                     orders.orders.map(o => <Order order={o}/>)
                 }
             </tbody>
         </Table>
         :
         <Alert variant="warning">Здесь пока ничего нет, сделайте заказ</Alert>
        }
     </Container>
}


export const CUserOrdersPage = connect(state => ({state: state.promise}), {DataGetter: actionDataGetter})(UserOrdersPage)