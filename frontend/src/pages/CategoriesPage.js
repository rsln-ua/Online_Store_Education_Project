import { useEffect, useState } from "react"
import { Card, CardColumns, Container, ListGroup, Spinner } from "react-bootstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {categories, colors} from "../testBD"
import {myFetch} from '../myFetch'
import {query} from '../graphql'
import { actionDataGetter } from "../redux/actionCreater"

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


const CategoriesPage = ({state: {getCategories: categories}, dataGetter}) => {
    let i = 0
    useEffect(
        () => dataGetter(query.getCategories), []
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

export const CCategoriesPage = connect(state => ({state: state.promise}), {dataGetter: actionDataGetter})(CategoriesPage)