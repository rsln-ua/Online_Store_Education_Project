import { Carousel } from "react-bootstrap"

const Slide = ({ src }) =>
    <Carousel.Item>
        <img className="d-block w-100 mh-100" src={src} style={{ height: '530px' }} />
    </Carousel.Item>

export const Slider = ({ slides }) => {
    return <Carousel fade>
        {
            slides.map(
                url => Slide({ src: url })
            )
        }
    </Carousel>
}