import "../../_global.scss"

const SliderWrapper = ({ title, children, isTopTen }) => {
    return (
        <>
            <section className='slides-container' >
                <div className='slides-wrapper' >
                    <div className='slider-section-name' >
                        {isTopTen?<div>
                            <h3><span className="primary-color-text">AFRIPLAY</span> <span style={{fontSize:'1.5rem'}}>| TOP 10</span></h3>
                        </div>:<h3 style={{ fontFamily: 'Open Sans' }}>{title}</h3>}
                        <img loading="lazy" src='/assets/svg/chevron-right.svg' alt='chevron right' />
                    </div>
                    {children}
                </div>
            </section>

        </>
    )
}

export default SliderWrapper