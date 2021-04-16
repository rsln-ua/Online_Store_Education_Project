import { useEffect } from "react";
import { Button, ButtonGroup, Container, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionGetGoods, actionRemoveGood } from "../../redux/actionCreater";

const GoodItem = ({good, remove}) => {
    return <ListGroup.Item>
        <div className="position-relative overflow-hidden">

            <Button className="position-absolute top-0 bottom-0 end-0" variant="danger" onClick={() => window.confirm(`Вы уверены что хотите удалить товар: ${good.name}`) && remove()}>Удалить</Button>

            <h4 className="overflow-scroll">
                <Link to={`/admin/updateGood/${good.id}`} className="text-nowrap">
                    {good.name}
                </Link>                
            </h4>
        </div>
    </ListGroup.Item>
}

const Page = ({state:{getGoods: goods, send_status}, actionGetGoods, actionRemoveGood}) => {
    useEffect(
        () => actionGetGoods(), [send_status]
    )
    return <Container>
        <ListGroup>
            {
                goods?.map(
                    g => <GoodItem good={g} remove={() => actionRemoveGood({id: g.id})}/> 
                )
            }
        </ListGroup>
    </Container>
}


export const APgoods = connect(state => ({state: state.promise}), {actionGetGoods, actionRemoveGood})(Page)