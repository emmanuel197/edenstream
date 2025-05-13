// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { fetchChannelInfo } from "../../redux/channels";
// import getEPGInfo from "../../../utils/getEPGInfo";
// import "../../components/styles/landing/slides.scss";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import { selectedMovieReducer } from "../../redux/slice/moviesSlice";
// import { useDispatch } from "react-redux";
// import ReactPlayer from "react-player";
// import { fetchTrailer } from "../../redux/fetchMoviesApi";
// import { useHandleNavigation } from "../../components/navigationHelpers";

// const MovieCard = ({ movie, type }) => {
//   const location = window.location.pathname;
//   const dispatch = useDispatch();
//   const [channelInfo, setChannelInfo] = useState({});
//   const [EPGInfo, setEPGInfo] = useState({
//     start: "00:00",
//     end: "00:00",
//     title: ""
//   });
//   const [isHovering, setIsHovering] = useState(false);
//   const [trailer, setTrailer] = useState("");
//   const handleClick = useHandleNavigation(movie);
//   const imageId = movie?.image_id;
//   const imageStoreId = movie?.image_store_id;
//   const movie_image = imageId || imageStoreId;

  
//   // console.log(movie_image);
//   useEffect(() => {
//     const initFetchChannelInfo = async () => {
//       setChannelInfo(await fetchChannelInfo(movie.id));
//     };
//     initFetchChannelInfo();
//   }, [movie.id]);

//   useEffect(() => {
//     if (location === "/livetv") {
//       const initSetDates = async () => setEPGInfo(getEPGInfo(movie.shows));
//       initSetDates();
//     }
//   }, [location, movie.shows]);

//   useEffect(() => {
//     const fetchMovieTrailer = async () => {
//       const trailerUrl = await fetchTrailer(movie.id);
//       setTrailer(trailerUrl);
//     };
//     isHovering && fetchMovieTrailer();
//   }, [movie.id, isHovering]);

  
//   const MovieCardComponent = () => (
   
//     <div
//       className="movie-card"
//       // onMouseEnter={() => setIsHovering(true)}
//       // onMouseLeave={() => setIsHovering(false)}
//     >
//       <div
//         className="movie-box"
//         onClick={() =>
//           handleClick(
//             movie.type === "series"
//               ? `/series/${movie.id}`
//               : `/movie/${movie.id}`
//           )
//         }
//       >
//         <div className="poster-div">
//           {/* {isHovering && trailer ? (
//             <ReactPlayer
//               url={trailer}
//               playing
//               muted
//               width="100%"
//               height="100%"
//               className="trailer-player"
//             />
//           ) : ( */}
//           <LazyLoadImage
//             src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie_image}?accessKey=WkVjNWNscFhORDBLCg==`}
//             alt={movie.alt}
//             width="100%"
//             placeholder={<div className="poster-img-placeholder"></div>}
//             effect="blur" // Add a blur effect during lazy loading
//             threshold={200} // Load images a bit before they come into view
//             key={movie.id} // Use a unique key to prevent re-rendering
//             afterLoad={() => {
//               // Optionally, handle actions after the image has been loaded
//             }}
//           />

//           {/* )} */}
//         </div>
//       </div>
//     </div>
//   );

  

//   if (type === "livetv" && EPGInfo  ) {
//     // console.log(channelInfo?.image_stores)
//     return (
//       // channelInfo.image_stores[0].id !== undefined && 
//       (<div className="movie-card livetv-movie-card">
//         <Link to={`/watch/live/${channelInfo?.uid}`}>
//           <div className="movie-box">
//             <div className="poster-div">
//               {channelInfo.image_stores ? (
//                 <LazyLoadImage
//                   src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${channelInfo?.image_stores[0]?.id}?accessKey=WkVjNWNscFhORDBLCg==`}
//                   alt={movie.alt}
//                   className="livetv-movie-card"
//                   width="100%"
//                   placeholder={
//                     <div className="poster-img-placeholder livetv-poster-img-placeholder"></div>
//                   }
//                 />
//               ) : null}
//             </div>
//             <div className="card-text" style={{ marginTop: "5px" }}>
//               <p className="name lines-max-1">
//                 {EPGInfo.title.replace(/ *\([^)]*\) */g, "")}
//               </p>
//               <p>
//                 {EPGInfo.start} - {EPGInfo.end}
//               </p>
//             </div>
//           </div>
//         </Link>
//       </div>)
//     );
//   }

//   if (type === "search") {
//     return <MovieCardComponent />;
//   }

//   if (type === "genre-movies") {
//     return (
//       <div className="movie-card">
//         <Link
//           to={
//             location === "/series"
//               ? `/series/${movie.id}`
//               : `/movie/${movie.id}`
//           }
//         >
//           <div
//             className="movi.0
//                     e-box"
//           >
//             <div className="poster-div">
//               <LazyLoadImage
//                 src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${
//                   location.includes(["series", "afriplaylive"])
//                     ? movie.images.POSTER
//                     : movie.image_store_id
//                 }?accessKey=WkVjNWNscFhORDBLCg==`}
//                 alt={movie.alt}
//                 width="100%"
//                 placeholder={<div className="poster-img-placeholder"></div>}
//               />
//             </div>
//           </div>
//         </Link>
//       </div>
//     );
//   }

//   return <MovieCardComponent />;
// };

// export default MovieCard;
import { useEffect, useState } from "react";
import { DeleteWatchHistory, mcPlayVector } from "../../../utils/assets";
import "../../components/styles/movie-card.scss";
import { useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
const MovieCard = ({movie, className}) => {
  const isLive = false
  const startsIn = false
  const type = "series"
  const location = useLocation()
  const titleClassName = `${isLive && "mc-content-bg"} ${type === "series" && "episode-title"} mc-content`
  const imageOverlayWrapperClassName = `${startsIn && "starts-in-bg"} image-overlay-wrapper`
  const movieCardClassName = `movie-card moviecard-${location.pathname && location.pathname.slice(1)}`
  console.log(location.pathname)
    return (
        <>
        <div className={movieCardClassName}>
        <div
          className="mc-image-wrapper"
          // style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {/* <img loading="lazy"  src={movie.poster}/> */}
          <LazyLoadImage
          className="mc-image"
            src={movie.poster}
            alt={movie.alt}
            width="100%"
            placeholder={<div className="poster-img-placeholder"></div>}
            effect="blur" // Add a blur effect during lazy loading
            threshold={200} // Load images a bit before they come into view
            key={movie.id} // Use a unique key to prevent re-rendering
            afterLoad={() => {
              // Optionally, handle actions after the image has been loaded
            }}
          />
          <div className={imageOverlayWrapperClassName} >
            <img loading="lazy" src={mcPlayVector} className="image-overlay-vector"/>
            {location.pathname == "/profile" && <DeleteWatchHistory className="delete-watch-history"/>}
            {startsIn &&<div className="starts-in-text">
              <p className="starts-in-paragraph">🔴Live Sermon: "Faith & Miracles"
              </p>
              <span className="starts-in-time">⏳Starts in: 02:12:45:30</span>
            </div>}
            {movie.newEpisode && <span className="new-episode-badge">New Episode</span>}
          </div>
        </div>
       <div className={titleClassName}>
          <h3 className="mc-title">{movie.name}</h3>
        </div>
        </div>
        </>
    )
}
export default MovieCard;