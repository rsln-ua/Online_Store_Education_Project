import { useEffect } from "react";
import { Button, ButtonGroup, Container, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionGetGoods, actionRemoveGood } from "../../redux/actionCreater";

const GoodItem = ({good, remove}) => {
    return <ListGroup.Item>
        <div className="position-relative overflow-hidden">
            <ButtonGroup className="position-absolute top-0 bottom-0 end-0">
                <Button variant="primary" as={Link} to={`/admin/updateGood/${good.id}`}>Изменить</Button>
                <Button variant="danger" onClick={remove}>Удалить</Button>
            </ButtonGroup>
            <h4 className="overflow-scroll">
                <Link to={`/good/${good.id}`} className="text-nowrap">
                    {good.name}
                </Link>                
            </h4>
        </div>
    </ListGroup.Item>
}

const CAPGoods = ({state:{getGoods: goods, removeGood}, actionGetGoods, actionRemoveGood}) => {
    useEffect(
        () => actionGetGoods(), [removeGood]
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


export const APGoods = connect(state => ({state: state.promise}), {actionGetGoods, actionRemoveGood})(CAPGoods)