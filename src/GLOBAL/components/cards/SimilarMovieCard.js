import { Link } from "react-router-dom"
import "../../components/styles/landing/slides.scss"

const SimilarMovieCard = ({ movie }) => {
    return <div className="movie-card">
        <Link to={movie.type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`} key={movie.id}>
            <div className="movie-box">
                <div className="poster-div">
                    <img loading="lazy" width="100%" src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={movie.alt} />
                </div>
                <div className='card-text'>
                    <p className='name'>{movie.title}</p>
                    <p className='price'>{movie.price}</p>
                </div>
            </div>
        </Link>
    </div>
}

export default SimilarMovieCard