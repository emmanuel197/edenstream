import { Link } from "react-router-dom"
import '../../components/styles/buttons.scss'

const Subscribe = () => {
    
    return (
        
        <>
            {!isAuthenticated && <Link to="/signup" className="filled-btn">
                <div>
                    <img loading="lazy" src='/assets/svg/padlock.svg' alt='padlock' />
                    <p>SUBSCRIBE TO WATCH</p>
                </div>
            </Link>}
        </>

    )
}

export default Subscribe