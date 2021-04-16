import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { Button, ButtonGroup, Container, ListGroup} from "react-bootstrap"
import { actionChangeGood, actionClearCart, actionTotalPrice, actionCreateOrder} from '../redux/actionCreater'

const Counter = ({id, count, actionChangeGood}) =>{
    const setCount = (count) => actionChangeGood(id, count) 
    return <ButtonGroup>
        <Button variant="primary" className="counter" onClick={() => setCount(count + 1)}>+</Button>
        <input type="number" style={{width: "2.5rem"}} className="counter" value={count} onChange={e => setCount(+e.target.value)}/>
        <Button variant="danger" className="counter" onClick={() => setCount(count - 1)}>-</Button>
    </ButtonGroup>
}

const CCounter = connect(null, {actionChangeGood})(Counter)

const Good = ({good}) => 
<ListGroup.Item action className="d-flex justify-content-between good-p">
    <Link to={`/good/${good.id}`}>
        {
            good.name
        }
    </Link>
    <div>
        <h4>{good.price}</h4>
        <CCounter id={good.id} count={good.count}/>
    </div>
</ListGroup.Item>


const Page = ({cart, promise, actionClearCart, actionCreateOrder, actionTotalPrice}) =>{
    useEffect(
        () => actionTotalPrice({goods: JSON.stringify(cart.goods)}), [cart]
    )
    const handlerCreateOrder = () => {
        if(!cart.goods){
            return alert('Корзина пустая!!')
        }
        const goods = JSON.stringify(cart.goods)
        actionCreateOrder({goods: goods})
    }
    return (
        <Container>
            <ListGroup className="py-5">
                {
                    cart.goods?.map(g => <Good good={g}/>)
                }
            </ListGroup>
            <div className="d-flex justify-content-between">
                <div>
                <Button variant="success" onClick={handlerCreateOrder}>Сделать заказ</Button>
                <Button variant="danger" onClick={actionClearCart}>Очистить корзину</Button>
                </div>
                <h2>{promise.totalPrice || 0}</h2>
            </div>
        </Container>

    )
}

export const CartPage = connect(state => ({cart: state.cart, promise: state.promise}),{actionClearCart, actionCreateOrder, actionTotalPrice})(Page)