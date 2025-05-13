import Slider from 'react-slick'
import '../../components/styles/banners/banner.scss'
import OutlineButton from '../buttons/OutlineButton'
import Subscribe from '../buttons/Subscribe'

const BannerSlider = (props) => {
    const { title, description, image } = props
    
    const isAuthenticated = JSON.parse(window.localStorage.getItem('isAuthenticated'))
    return <div className='landing-banner-content'>
        <div className='landing-content-wrapper'>
            <div>
                <img loading="lazy" src={image} alt={title} className='landing-slide-banner' />
            </div>
            <div>
                <div className='text-content'>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className='landing-buttons'>
                    <Subscribe />
                    <div style={{ margin: '10px' }} />
                    <OutlineButton label='Trailer' page='/' />
                </div>
            </div>
        </div>
    </div>
}

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    
    return (
        <>
            <Slider {...settings} className='landing-banner'>
                <BannerSlider
                    title='THE WOMAN KING'
                    description='The Woman King is the remarkable story of the Agojie, the all-female unit of warriors who protected the African Kingdom of Dahomey in the 1800s with skills and a fierceness unlike anything the world has ever seen.'
                    image='https://static.euronews.com/articles/stories/06/98/94/04/1024x538_cmsv2_74482b4d-2aa7-5865-869c-d7e17aa1f1b4-6989404.jpg'
                />
                <BannerSlider
                    title='THE WOMAN KING'
                    description='The Woman King is the remarkable story of the Agojie, the all-female unit of warriors who protected the African Kingdom of Dahomey in the 1800s with skills and a fierceness unlike anything the world has ever seen.'
                    image='https://www.okayafrica.com/media-library/a-still-from-the-film-the-woman-king-of-actress-viola-davis-wielding-a-machete.jpg?id=31615101&width=1245&height=700&quality=85&coordinates=47%2C0%2C87%2C0'
                />
                <BannerSlider
                    title='THE WOMAN KING'
                    description='The Woman King is the remarkable story of the Agojie, the all-female unit of warriors who protected the African Kingdom of Dahomey in the 1800s with skills and a fierceness unlike anything the world has ever seen.'
                    image='https://cdn.mos.cms.futurecdn.net/RbJagCBdJyCqP4a8awFSSX.png'
                />
            </Slider>
        </>
    )
}

export default Banner