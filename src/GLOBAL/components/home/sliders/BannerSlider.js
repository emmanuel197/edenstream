import { sliderSettings } from "../../../constants/sliderSettings"
import Slider from "react-slick"
import '../../../components/styles/bannerSlider.scss'

const BannerSlider = ({ filteredMovies = [{}, {}, {}, {}, {}, {}] }) => {
    return (
        <Slider {...sliderSettings(1, 1,false,1)}>
            {filteredMovies.map((movie) => {
                return <div className="lg-banner-slider" >
                    <img loading="lazy" src='https://pilipinaspopcorn.com/wp-content/uploads/2018/04/31189602_954704214694644_5484766570926309376_n.png' alt={movie.alt} />
                </div>
            })}
        </Slider>
    )
}

export default BannerSlider