import { Link } from 'react-router-dom'
import '../../components/styles/buttons.scss'
import { infoIcon } from "../../../utils/assets"

const OutlineButton = (props) => {
    const { label, action, page } = props


    if (action) return (
        <>
            <div className="outline-btn" onClick={action}>
                <div>
                    <p>{label}</p>
                </div>
            </div>
        </>
    )

    if (page) return (
        <>
            <>
                <Link to={page} className="outline-btn">
                    <div className='align-content'>
                    <img loading="lazy" src={infoIcon} alt="Info Icon"></img>
                        <p> {label}</p>
                    </div>
                </Link>
            </>
        </>
    )

    return <></>
}

export default OutlineButton