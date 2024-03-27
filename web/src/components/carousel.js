import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 1000,
    autoplay: true,
    slidesToShow: 1
  }

export default function Carousel() {
    return (
      <Slider {...settings}>
        <div>
          <img src = "./assets/slides/1.png" className = "w-[100vw] h-[90vh]" />
        </div>
        <div>
          <img src = "./assets/slides/2.png" className = "w-[100vw] h-[90vh]" />
        </div>
        <div>
          <img src = "./assets/slides/3.png" className = "w-[100vw] h-[90vh]" />
        </div>
      </Slider>
    )
}