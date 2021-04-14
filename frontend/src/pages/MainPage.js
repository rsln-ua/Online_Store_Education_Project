import React, { useEffect, useState } from 'react'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Container } from "react-bootstrap"
import {CGoodCard} from "../components/GoodCard"
import {ArrowLeft, ArrowRight} from "../components/Arrows"
import {Slider} from "../components/Slider"

import {goods, banners} from "../testBD"
import { connect } from 'react-redux'
import { actionLoadPage } from '../redux/actionCreater'


const MostRated = ({goods}) => {
    const [sliderRef, slider] = useKeenSlider({
        slidesPerView: 4,
    })
    return (
        <div className="position-relative">
            <h2 style={{margin: "1em 0"}}>Набирающее популярность:</h2>
            <div ref={sliderRef} className='keen-slider'>
                {goods.map(good => <CGoodCard good={good} cN={goods.length > 4 && 'keen-slider__slide'}/>)} 
            </div>
            <ArrowLeft
                onClick={(e) => e.stopPropagation() || slider.prev()}
            />
            <ArrowRight
                onClick={(e) => e.stopPropagation() || slider.next()}
            />
        </div>
    )
}

export const CMainPage = ({}) => {
    return (
        <Container>
            <Slider slides={banners}/>
            {/* <MostRated goods={goods}/> */}
        </Container>
    )

}
// export const CMainPage = connect(state => ({state: state.load}), actionLoadPage)(MainPage)

