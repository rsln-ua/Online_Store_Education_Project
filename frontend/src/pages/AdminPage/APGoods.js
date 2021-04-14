import { useEffect } from "react";
import { Button, ButtonGroup, Container, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { mutation, query } from "../../graphql";
import { actionDataGetter, actionDataSender } from "../../redux/actionCreater";

const GoodItem = ({good, remove}) => {
    return <ListGroup.Item>
        <div className="d-flex justify-content-between">
            <h4>
                <Link to={`/good/${good.id}`}>
                    {good.name}
                </Link>                
            </h4>
            <ButtonGroup>
                <Button variant="primary" as={Link} to={`/admin/updateGood/${good.id}`}>Изменить</Button>
                <Button variant="danger" onClick={remove}>Удалить</Button>
            </ButtonGroup>
        </div>
    </ListGroup.Item>
}

const CAPGoods = ({state:{getGoods: goods, removeGood}, actionDataGetter, actionDataSender}) => {
    useEffect(
        () => actionDataGetter(query.getGoods), [removeGood]
    )
    return <Container>
        <ListGroup>
            {
                goods?.map(
                    g => <GoodItem good={g} remove={() => actionDataSender(mutation.removeGood, {id: g.id})}/> 
                )
            }
        </ListGroup>
    </Container>
}


export const APGoods = connect(state => ({state: state.promise}), {actionDataGetter, actionDataSender})(CAPGoods)