import React, { useEffect, useState } from "react"
import {connect} from 'react-redux'
import {actionAddGood2Cart} from '../redux/actionCreater'
import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Good = ({cart, actionAddGood2Cart, good, cN}) => {
    const [inCart, setInCart] = useState(0)
    useEffect(
        () => {
            setInCart(cart.goods?.find(el => el.id == good.id))
        }, [cart]
    )
    
    return (<>
        <Card className={"good-card position-relative " + cN} xs={6}>
            <Card.Img variant="top" src={good.img[0] || "/no-image.jpg"}></Card.Img>
            <Card.Body>
                <Card.Title as={Link} to={`/good/${good.id}`}>{good.name}</Card.Title>
                <Card.Text>
                    {good.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center position-absolute bottom-0 start-0 end-0 p-3 test">
                    <span>{good.price}</span>
                    <Button onClick={() => actionAddGood2Cart(good.id)} disabled={inCart}>В корзину</Button>
                </div>                
            </Card.Body>
        </Card>
        </>
    )
}

export const GoodCard = connect(state => ({cart: state.cart}), {actionAddGood2Cart})(Good)

