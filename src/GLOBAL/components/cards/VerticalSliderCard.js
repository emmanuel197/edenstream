import RangeSlider from "../RangeSlider"
import { useInView } from 'react-hook-inview'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getLengthWatched } from "../../redux/fetchMoviesApi"
import { useDispatch } from "react-redux"

const VerticalSliderCard = ({ nextEpisode, episode }) => {
    const dispatch = useDispatch()
    const [ref, isVisible] = useInView({ threshold: 1 })
    const [lengthWatched, setLengthWatched] = useState(0)

    // console.warn('episode',episode)

    const getMiddleVerticalSliderCard = () => {
        let cardsInView = document.querySelectorAll('.scrolled-vertical-slider')
        if (!cardsInView || cardsInView.length < 1) return
        cardsInView[0].classList.add("active-vertical-slider-in-view")
    }

    useEffect(() => {
        let container = document.querySelector('.vertical-slider-wrapper')
        if (!container) return
        container.addEventListener('scroll', () => getMiddleVerticalSliderCard())
    }, [isVisible])

    useEffect(() => {
        const initGetLengthWatched = async () => {
            const _ = await getLengthWatched(episode.id, 'series')
            setLengthWatched(_ / 10)
        }
        initGetLengthWatched()
    }, [dispatch, episode.id])

    return (
        <>
            <Link to={`/watch/series/${episode.id}?next=${nextEpisode.id ? nextEpisode.id : ''}`}>
                <div ref={ref} className={isVisible ? "scrolled-vertical-slider vertical-slider-card" : 'vertical-slider-card'}>
                    <div><img loading="lazy" src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${episode.image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt='' /></div>
                    <div className="vertical-slider-content">
                        <div className="title-wrapper">
                            <h3>{episode.title}</h3>
                            <h3>{episode.duration} mins</h3>
                        </div>

                        <RangeSlider _key={episode.id} progress={lengthWatched} />

                        {/* <input style={{ width: '100%' }} value={lengthWatched} onChange={() => { }} type='range' /> */}

                        {/* <p>{episode.description}</p> */}
                        {/* <div className="star-wrapper">
                        <img loading="lazy" className="star-img" src='/assets/svg/star.svg' alt='star' />
                        <p>5.0</p>
                    </div> */}
                    </div>
                </div>
            </Link>
        </>
    )
}

export default VerticalSliderCard