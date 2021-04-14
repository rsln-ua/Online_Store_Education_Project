import { useEffect } from "react"
import { Container, ListGroup, Alert, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { mutation, query } from "../../graphql"
import {actionDataGetter, actionDataSender} from "../../redux/actionCreater"

const Category = ({category, remove}) =>
<tr>
  <ListGroup.Item>
      <div className="d-flex justify-content-between">
        {category.name}
        <Button variant="danger" onClick={remove}>Удалить</Button>
      </div>
  </ListGroup.Item>
</tr>

const Categories = ({ state: {getCategories: categories, removeCategory, addCategory}, actionDataGetter, actionDataSender}) => {
    useEffect(
        () => actionDataGetter(query.getCategories), [removeCategory, addCategory]
    )
    const createCategory = () => {
        const name = prompt("Введите название категории")
        if(!name)
            return
        actionDataSender(mutation.addCategory, {name: name})
    }
    return  <Container>
        {
        categories && categories.length != 0  ?
        <ListGroup variant="flush" className="my-4">
            {
               categories.map(
                   c => <Category category={c} remove={() => actionDataSender(mutation.removeCategory, {id: c.id})}/>
               ) 
            }
        </ListGroup>
         :
         <Alert variant="warning">Здесь пока ничего нет, создайте категорию.</Alert>
        }
        <div className="d-flex justify-content-end">
            <Button onClick={createCategory}>Создать категорию</Button>
        </div>
    </Container>
}

export const APcategories = connect(state => ({state: state.promise}), {actionDataGetter, actionDataSender})(Categories)