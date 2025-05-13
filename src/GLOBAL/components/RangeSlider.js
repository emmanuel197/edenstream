import { useEffect } from 'react'
import '../components/styles/rangeSlider.scss'

const RangeSlider = ({ progress, _key }) => {
    useEffect(() => {
        const initRangeSlider = () => {
            const sliderDiv = document.querySelector(`#slider_${_key}`);
            sliderDiv.style.width = `${progress}%`
        }
        initRangeSlider()
    }, [_key, progress])

    return (
        <>
            <div className="range">
                <div className="slider" id={`slider_${_key}`}></div>
            </div>
        </>
    )
}

export default RangeSlider