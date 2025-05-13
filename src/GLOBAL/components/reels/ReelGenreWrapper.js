// import { useState, useEffect } from "react"
// import { processLog } from "../../logger"
// import ReelSlider from "../home/sliders/ReelSlider"
// import SliderWrapper from "../SliderWrapper"

// const ReelGenreWrapper = ({ allMovies, movies, title }) => {
//     const [loading, setLoading] = useState(true)
//     const [moviesOnly, setMoviesOnly] = useState([])
//     const [seriesOnly, setSeriesOnly] = useState([])

//     processLog(`seriesOnly: ${seriesOnly}`)
//     processLog(`moviesOnly: ${moviesOnly}`)
    
//     useEffect(() => {
//         const filterVOD = () => {
//             setLoading(true)

//             let _series = []
//             let _movies = []

//             movies.forEach(vod => {
//                 if (vod.type === 'series') {
//                     // console.warn("found series", vod)
//                     _series = [..._series, vod]
//                     return
//                 } if (vod.type === 'movie') {
//                     // console.warn("found movie", vod)
//                     _movies = [..._movies, vod]
//                     return
//                 }
//             })

//             setSeriesOnly(_series)
//             // console.log(_movies)
//             setMoviesOnly(_movies)
//             setLoading(false)
//         }

//         if (movies && movies.length > 0) filterVOD()

//     }, [movies])
    
//     return (
//         <SliderWrapper title={title}>
//             <ReelSlider filteredMovies={window.location.pathname === '/series' ? seriesOnly : moviesOnly} />
//         </SliderWrapper>
//     )

// }

// export default ReelGenreWrapper

// import { useState, useEffect } from "react";
// import { processLog } from "../../logger";
// import ReelSlider from "../home/sliders/ReelSlider";
// import SliderWrapper from "../SliderWrapper";

// const ReelGenreWrapper = ({ allMovies, movies, title }) => {
//     const [moviesOnly, setMoviesOnly] = useState([]);
//     const [seriesOnly, setSeriesOnly] = useState([]);
//     // console.log(movies)
//     // processLog(`seriesOnly: ${seriesOnly}`);
//     // processLog(`moviesOnly: ${moviesOnly}`);
    
//     useEffect(() => {
//         if (movies && movies.length > 0) {
//             const _series = [];
//             const _movies = [];

//             movies.forEach(vod => {
//                 if (vod.type === 'series') {
//                     _series.push(vod);
//                 } else if (vod.type === 'movie') {
//                     _movies.push(vod);
//                 } else if (vod.metadata?.movie_type === "live"){
//                     _movies.push(vod)
//                 }
//             });

//             setSeriesOnly(_series);
//             setMoviesOnly(_movies);
//         }
//     }, [movies]);
    
//     return (
//         <SliderWrapper title={title}>
//             <ReelSlider filteredMovies={window.location.pathname === '/series' ? seriesOnly : moviesOnly} />
//         </SliderWrapper>
//     );
// };

// export default ReelGenreWrapper;
