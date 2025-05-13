// // import Slider from "react-slick"
// // import MovieCard from "../../cards/MovieCard"
// // import SimilarMovieCard from "../../cards/SimilarMovieCard"
// // import sliderSettings from "../../../../utils/sliderConfig/sliderSettings"
// // import { useLocation } from "react-router-dom"
// // import { useEffect, useState } from "react"
// // import { returnMovieDetails, returnOneSeries } from "../../../redux/fetchMoviesApi"

// // const ReelSlider = ({ type, filteredMovies = [] }) => {
// //     const location = useLocation()
// //     const [premiereMovies, setPremiereMovies] = useState([])
// //     const [liveMovies, setLiveMovies] = useState([])
// //     const [loading, setLoading] = useState(true)
// //     // console.log(filteredMovies)
// //     useEffect(() => {

// //         const filterPremiereLive = async () => {

// //             setLoading(true)

// //             let _premiereMovies = []
// //             let _liveMovies = []

// //             for (let i = 0; i < filteredMovies.length; i++) {

// //                 const _movie = filteredMovies[i];
// //                 let movieInfo

// //                 if (_movie.type === 'series') movieInfo = await returnOneSeries(_movie.id)
// //                 else if (_movie.type === 'movie') movieInfo = await returnMovieDetails(_movie.id)

// //                 const movieType = movieInfo?.metadata.movie_type

// //                 if (movieType === 'live') _liveMovies.push(_movie)
// //                 else if (movieType === 'premiere') _premiereMovies.push(_movie)

// //             }

// //             setPremiereMovies(_premiereMovies)
// //             setLiveMovies(_liveMovies)
// //             setLoading(false)
// //         }

// //         filterPremiereLive()

// //     }, [filteredMovies])

// //     if (loading) return (<></>)

// //     if (filteredMovies.length < 1) return <></>

// //     if (type === 'similar-movies') return (
// //         <Slider {...sliderSettings()}>
// //             {filteredMovies.map((movie) => {
// //                 return <SimilarMovieCard key={movie.id} movie={movie} />
// //             })}
// //         </Slider>
// //     )

// //     if (location.pathname === '/afripremiere' && premiereMovies.length > 0) {
// //         return (
// //             <Slider {...sliderSettings()}>
// //                 {premiereMovies.map((movie) => {
// //                     return <MovieCard key={movie.id} movie={movie} />
// //                 })}
// //             </Slider>
// //         )
// //     }

// //     if (location.pathname === '/afriplaylive' && liveMovies.length > 0) {
// //         return (
// //             <Slider {...sliderSettings()}>
// //                 {liveMovies.map((movie) => {
// //                     return <MovieCard key={movie.id} movie={movie} />
// //                 })}
// //             </Slider>
// //         )
// //     }

// //     return (
// //         <Slider {...sliderSettings()}>
// //             {filteredMovies.map((movie) => {
// //                 return <MovieCard key={movie.id} movie={movie} />
// //             })}
// //         </Slider>
// //     )
// // }

// // export default ReelSlider
// import Slider from "react-slick";
// import MovieCard from "../../cards/MovieCard";
// import SimilarMovieCard from "../../cards/SimilarMovieCard";
// import sliderSettings from "../../../../utils/sliderConfig/sliderSettings";
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { returnMovieDetails, returnOneSeries } from "../../../redux/fetchMoviesApi";

// const ReelSlider = ({ type, filteredMovies = [] }) => {
//     const location = useLocation();
//     const [premiereMovies, setPremiereMovies] = useState([]);
//     const [liveMovies, setLiveMovies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     console.log(filteredMovies)
   
//     useEffect(() => {
//         const filterPremiereLive = async () => {
//             setLoading(true);

//             const moviePromises = filteredMovies.map(async (movie) => {
//                 let movieInfo;
//                 if (movie.type === 'series') {
//                     movieInfo = await returnOneSeries(movie.id);
//                 } else if (movie.type === 'movie') {
//                     movieInfo = await returnMovieDetails(movie.id);
//                 }

//                 return {
//                     ...movie,
//                     movieType: movieInfo?.metadata.movie_type
//                 };
//             });

//             // Use Promise.all to fetch all movie data concurrently
//             const moviesWithInfo = await Promise.all(moviePromises);

//             const _premiereMovies = [];
//             const _liveMovies = [];

//             moviesWithInfo.forEach((movie) => {
//                 if (movie.movieType === 'live') {
                   
//                     _liveMovies.push(movie);
//                 } else if (movie.movieType === 'premiere') {
//                     _premiereMovies.push(movie);
//                 }
//             });

//             setPremiereMovies(_premiereMovies);
//             setLiveMovies(_liveMovies);
//             setLoading(false);
//         };

//         filterPremiereLive();
//     }, [filteredMovies]);

//     if (loading) return <></>;

//     if (filteredMovies.length < 1) return <></>;

//     if (type === 'similar-movies') {
//         return (
//             <Slider {...sliderSettings()}>
//                 {filteredMovies.map((movie) => (
//                     <SimilarMovieCard key={movie.id} movie={movie} />
//                 ))}
//             </Slider>
//         );
//     }

//     if (location.pathname === '/afripremiere' && premiereMovies.length > 0) {
//         return (
//             <Slider {...sliderSettings()}>
//                 {premiereMovies.map((movie) => (
//                     <MovieCard key={movie.id} movie={movie} />
//                 ))}
//             </Slider>
//         );
//     }

//     if (location.pathname === '/afriplaylive' && liveMovies.length > 0) {
//         return (
//             <Slider {...sliderSettings()}>
//                 {liveMovies.map((movie) => (
//                     <MovieCard key={movie.id} movie={movie} />
//                 ))}
//             </Slider>
//         );
//     }

//     return (
//         <Slider {...sliderSettings()}>
//             {filteredMovies.map((movie) => (
//                 <MovieCard key={movie.id} movie={movie} />
//             ))}
//         </Slider>
//     );
// };

// export default ReelSlider;
// import Slider from "react-slick";
// import MovieCard from "../../cards/MovieCard";
// import SimilarMovieCard from "../../cards/SimilarMovieCard";
// import sliderSettings from "../../../../utils/sliderConfig/sliderSettings";
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { returnMovieDetails, returnOneSeries } from "../../../redux/fetchMoviesApi";

// const ReelSlider = ({ type, filteredMovies = [] }) => {
//     const location = useLocation();
//     const [moviesByType, setMoviesByType] = useState({ premiere: [], live: [] });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchMovieData = async () => {
//             setLoading(true);

//             const moviePromises = filteredMovies.map(async (movie) => {
//                 let movieInfo;
//                 if (movie.type === 'series') {
//                     movieInfo = await returnOneSeries(movie.id);
//                 } else if (movie.type === 'movie') {
//                     movieInfo = await returnMovieDetails(movie.id);
//                 }

//                 return {
//                     ...movie,
//                     movieType: movieInfo?.metadata.movie_type || 'unknown', // Handle case where movieType is undefined
//                 };
//             });

//             const moviesWithInfo = await Promise.all(moviePromises);

//             // Categorize movies in a single pass
//             const categorizedMovies = moviesWithInfo.reduce(
//                 (acc, movie) => {
//                     if (movie.movieType === 'live') {
//                         acc.live.push(movie);
//                     } else if (movie.movieType === 'premiere') {
//                         acc.premiere.push(movie);
//                     }
//                     return acc;
//                 },
//                 { premiere: [], live: [] }
//             );

//             setMoviesByType(categorizedMovies);
//             setLoading(false);
//         };

//         fetchMovieData();
//     }, [filteredMovies]);

//     if (loading) return <></>;

//     if (filteredMovies.length < 1) return <></>;

//     if (type === 'similar-movies') {
//         return (
//             <Slider {...sliderSettings()}>
//                 {filteredMovies.map((movie) => (
//                     <SimilarMovieCard key={movie.id} movie={movie} />
//                 ))}
//             </Slider>
//         );
//     }

//     if (location.pathname === '/afripremiere' && moviesByType.premiere.length > 0) {
//         return (
//             <Slider {...sliderSettings()}>
//                 {moviesByType.premiere.map((movie) => (
//                     <MovieCard key={movie.id} movie={movie} />
//                 ))}
//             </Slider>
//         );
//     }

//     if (location.pathname === '/afriplaylive' && moviesByType.live.length > 0) {
//         return (
//             <Slider {...sliderSettings()}>
//                 {moviesByType.live.map((movie) => (
//                     <MovieCard key={movie.id} movie={movie} />
//                 ))}
//             </Slider>
//         );
//     }

//     return (
//         <Slider {...sliderSettings()}>
//             {filteredMovies.map((movie) => (
//                 <MovieCard key={movie.id} movie={movie} />
//             ))}
//         </Slider>
//     );
// };

// export default ReelSlider;
