import { connect } from 'react-redux'
import { Button, ButtonGroup, Container, ListGroup, Spinner, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { actionChangeGood, actionClearCart, actionDataGetter, actionDataSender, actionLogin } from '../redux/actionCreater'
import { useEffect, useState } from 'react'
import { mutation, query } from '../graphql'
import { myFetch } from '../myFetch'

const Counter = ({id, count, actionChangeGood}) =>{
    const setCount = (count) => actionChangeGood(id, count) 
    return <ButtonGroup>
        <Button variant="primary" className="counter" onClick={() => setCount(count + 1)}>+</Button>
        <input type="number" style={{width: "2.5rem"}} className="counter" value={count} onChange={e => setCount(+e.target.value)}/>
        <Button variant="danger" className="counter" onClick={() => setCount(count - 1)}>-</Button>
    </ButtonGroup>
}

const CCounter = connect(null, {actionChangeGood})(Counter)

const GoodLi = ({good}) => 
<ListGroup.Item action className="d-flex justify-content-between good-p">
    <Link to="/">
        {
            good.name
        }
    </Link>
    <div>
        <h4>{good.price}</h4>
        <CCounter id={good.id} count={good.count}/>
    </div>
</ListGroup.Item>


const CartPage = ({cart, promise, actionClearCart, actionDataSender, DataGetter}) =>{
    useEffect(
        () => DataGetter(query.totalPrice, {goods: JSON.stringify(cart.goods)}), [cart]
    )
    const handlerCreateOrder = () => {
        if(!cart.goods){
            alert('Корзина пустая!!')
            return
        }
    const goods = JSON.stringify(cart.goods)
    actionDataSender(mutation.createOrder, {goods: goods}, actionClearCart, e => alert(e))
    }
    return (
        <Container>
            <ListGroup className="py-5">
                {
                    cart.goods?.map(g => <GoodLi good={g}/>)
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

export const CCartPage = connect(state => ({cart: state.cart, promise: state.promise}),{actionClearCart, actionDataSender, DataGetter: actionDataGetter})(CartPage)