import { Link } from "react-router-dom"
import "../../components/styles/landing/slides.scss"

const Top10MovieCard = ({ movie }) => {
    return <div className="top-10-movie-card">
        <Link to={`/movie/`} className=''>
            <div className="movie-box">
                <div className="poster-div">
                    <img loading="lazy" width="100%" src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={movie.alt} />
                </div>
                <div className='card-text'>
                    <p className='number'>{movie.number}</p>
                    <p className='category'>{movie.category}</p>
                </div>
            </div>
        </Link>
        {/* <Link to={`/movie/${movie.id}`} key={movie.id} className=''>
            <div className="movie-box">
                <div className="poster-div">
                    <img loading="lazy" width="100%" src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={movie.alt} />
                </div>
                <div className='card-text'>
                    <p className='name'>{movie.title}</p>
                    <p className='price'>{movie.price}</p>
                </div>
            </div>
        </Link> */}
    </div>
}

export default Top10MovieCard