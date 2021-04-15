import { useEffect } from "react"
import { Container, ListGroup, Alert, Button } from "react-bootstrap"
import { connect } from "react-redux"
import {actionGetCategories, actionRemoveCategory, actionAddCategory} from "../../redux/actionCreater"

const Category = ({category, remove}) =>
<tr>
  <ListGroup.Item>
      <div className="d-flex justify-content-between">
        {category.name}
        <Button variant="danger" onClick={remove}>Удалить</Button>
      </div>
  </ListGroup.Item>
</tr>

const Categories = ({ state: {getCategories: categories, send_status}, actionGetCategories, actionRemoveCategory, actionAddCategory}) => {
    useEffect(
        () => actionGetCategories(), [send_status]
    )
    const createCategory = () => {
        const name = prompt("Введите название категории")
        if(!name)
            return
            actionAddCategory({name: name})
    }
    return  <Container>
        {
        categories && categories.length != 0  ?
        <ListGroup variant="flush" className="my-4">
            {
               categories.map(
                   c => <Category category={c} remove={() => actionRemoveCategory({id: c.id})}/>
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

export const APcategories = connect(state => ({state: state.promise}), {actionGetCategories, actionRemoveCategory, actionAddCategory})(Categories)