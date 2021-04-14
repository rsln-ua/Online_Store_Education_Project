import { useEffect } from "react"
import { Container, Spinner } from "react-bootstrap"
import { connect } from "react-redux"
import { CGoodCard } from "../components/GoodCard"
import { query } from "../graphql"
import { actionDataGetter } from "../redux/actionCreater"


const CategoryGoodsPage = ({match, state: {getCategoryById={}, status}, dataGetter}) => {
    const {goods} = getCategoryById
    useEffect(
        () => dataGetter(query.getCategoryById, match.params), []
    )
    return <Container className="p-5 d-flex flex-wrap">
            {
                goods?.map(g => <CGoodCard good={g} cN="w-25"/>)
            }
    </Container>
}

export const CCategoryGoodsPage = connect(state => ({state: state.promise}), {dataGetter: actionDataGetter})(CategoryGoodsPage)