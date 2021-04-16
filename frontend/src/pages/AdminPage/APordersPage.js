import { useEffect } from "react"
import { Link } from "react-router-dom";
import { Container, Table, Alert } from "react-bootstrap"
import { connect } from "react-redux"
import { query } from "../../graphql"
import {actionGetOrders} from "../../redux/actionCreater"

const Order = ({order}) =>
<tr>
    <td><Link to={`/user/${order.user?.id}`}>{order.user?.id}</Link></td>
    <td><Link to={`/order/${order.id}`}>{order.id}</Link></td>
    <td>{order.total}</td>
    <td>{(new Date(+order.created)).toLocaleDateString()}</td>
</tr>

const Page = ({ state: {getOrders: orders}, actionGetOrders }) => {
    useEffect(
        () => actionGetOrders(query.getOrders), []
    )
    console.log(orders)
    return  <Container >
        {
        orders && orders.length != 0  ?
         <Table>
            <thead>    
                <tr>
                <th>Пользователь</th>
                <th>Заказ</th>
                <th>Сумма</th>
                <th>Дата</th>
                </tr>
            </thead>
             <tbody>
                 {
                     orders.map(o => <Order order={o}/>)
                 }
             </tbody>
         </Table>
         :
         <Alert variant="warning">Здесь пока ничего нет</Alert>
        }
    </Container>
}

export const APordersPage = connect(state => ({state: state.promise}), {actionGetOrders})(Page)