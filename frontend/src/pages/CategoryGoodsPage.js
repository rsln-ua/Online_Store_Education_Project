import { useEffect } from "react"
import { connect } from "react-redux"
import { Container } from "react-bootstrap"
import { GoodCard } from "../components"
import { actionGetGoodsByCategory } from "../redux/actionCreater"


const Page = ({match, state: {getCategoryById={}}, actionGetGoodsByCategory}) => {
    const {goods} = getCategoryById
    useEffect(
        () => actionGetGoodsByCategory(match.params), []
    )
    return <Container className="p-5 d-flex flex-wrap">
            {
                goods?.map(g => <GoodCard good={g} key={g.id}/>)
            }
    </Container>
}

export const CategoryGoodsPage = connect(state => ({state: state.promise}), {actionGetGoodsByCategory})(Page)