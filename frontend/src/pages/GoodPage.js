import { useEffect, useState } from "react"
import { Container, Carousel, Spinner, Col, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { query } from "../graphql"
import { actionDataGetter, actionAddGood2Cart } from "../redux/actionCreater"

const GoodPage = ({match, promise : {getGood: good, status}, cart, DataGetter, actionAddGood2Cart}) => {
    useEffect(
        () => DataGetter(query.getGood, match.params), []
    )
    const [inCart, setInCart] = useState(0)
    useEffect(
        () => {
            setInCart(cart.goods?.find(el => el.id == good?.id))
        }
    )
    return <Container fluid className="p-5">
        {
            !good ? 

            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>  
            :
            <div class="good-page d-flex">
                <Col md={6}>
                    <Carousel fade controls={good?.img.length > 1}>
                        {good?.img.length === 0 ?
                            <Carousel.Item className="max-vh-70"><img src="/no-image.jpg" className="mw-100 mh-100"/></Carousel.Item>
                            // <h1>test</h1>
                            :
                            good?.img.map(url => <Carousel.Item className="max-vh-70"><img src={url} className="mw-100 mh-100"/></Carousel.Item>)

                        }
                    </Carousel>
                </Col>
                <Col md={6}>
                    <h1>
                        {good.name}
                    </h1>
                    <div className="d-flex align-items-center">
                        <span className="fs-2 m-3">
                            {
                                good.price
                            }
                        </span>
                        <Button onClick={() => actionAddGood2Cart(good.id)} disabled={inCart}>В корзину</Button>
                    </div>
                    <p>
                        {good.description}
                    </p>
                </Col>
            </div>
        }
        </Container>
}

export const CGoodPage = connect(state => ({promise: state.promise, cart: state.cart}), {DataGetter: actionDataGetter, actionAddGood2Cart})(GoodPage)