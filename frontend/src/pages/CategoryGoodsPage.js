import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { connect } from "react-redux"
import { CGoodCard } from "../components/GoodCard"
import { actionGetGoodsByCategory } from "../redux/actionCreater"


const CategoryGoodsPage = ({match, state: {getCategoryById={}, status}, actionGetGoodsByCategory}) => {
    const {goods} = getCategoryById
    useEffect(
        () => actionGetGoodsByCategory(match.params), []
    )
    return <Container className="p-5 d-flex flex-wrap">
            {
                goods?.map(g => <CGoodCard good={g} key={g.id}/>)
                // goods?.map(g => <CGoodCard good={g} cN="w-25" key={g.id}/>)
            }
    </Container>
}

export const CCategoryGoodsPage = connect(state => ({state: state.promise}), {actionGetGoodsByCategory})(CategoryGoodsPage)