import { useEffect } from "react"
import { Card, CardColumns, Container, ListGroup} from "react-bootstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { query } from '../graphql'
import { actionGetCategories } from "../redux/actionCreater"

const colors = [
    'Primary',
    'Secondary',
    'Success',
    'Danger',
    'Warning',
    'Info',
    'Light',
    'Dark',
  ]

const Category = ({category, color = ''}) => {
    return(
        <Card
            bg={color.toLowerCase()}
            text={color.toLowerCase() === 'light' ? 'dark' : 'white'}
            className="category-card"
        >
            <Card.Header>
                <Link to={`/category/${category.id}`}>{category.name}</Link>
            </Card.Header>
            <ListGroup>
                {category.sub?.map(subCategory => 
                    <ListGroup.Item>
                        <Link>{subCategory}</Link>
                    </ListGroup.Item>)}
            </ListGroup>
        </Card>
    )
}


const Page = ({state: {getCategories: categories}, actionGetCategories}) => {
    let i = 0
    useEffect(
        () => actionGetCategories(query.getCategories), []
    )

    return (
        <Container className="p-5">
            <CardColumns>
                {
                    categories?.map(el => <Category category={el} color={
                        (function(){
                            if(i > colors.length)
                            i = 0
                            return colors[i++]}
                        )()
                    }/>)                     
                }
            </CardColumns>
        </Container>
    )
}

export const CategoriesPage = connect(state => ({state: state.promise}), {actionGetCategories})(Page)