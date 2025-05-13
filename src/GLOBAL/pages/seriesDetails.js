// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
// import { fetchGenreName, fetchGenres, fetchOneSeries, fetchSimilarMovies } from "../redux/fetchMoviesApi"
// import Button from "../components/buttons/Button"
// // import OutlineButton from "../components/buttons/OutlineButton"
// import VerticalSliderCard from "../components/cards/VerticalSliderCard"
// import Header from "../components/Header"
// import AllMovies from "../components/home/sliders/ReelSlider"
// import SliderWrapper from "../components/SliderWrapper"
// import Loader from "../components/Loader"
// import "../components/styles/series.scss"
// import getGenreName from "../../utils/getGenreName"
// import styles from "../components/styles/SubscriptionCard.scss"
// const SeriesDetails = () => {
//     const dispatch = useDispatch()
//     const { id } = useParams();
//     const { seriesInfo, loaders, genres } = useSelector(state => state.fetchMovies)
//     const [activeSeasonEpisodes, setActiveSeasonEpisodes] = useState([])
//     const [activeSeason, setActiveSeason] = useState([])
//     let _index = activeSeason.number - 1

//     window.scrollTo(0, 0);

//     // console.warn('activeSeasonEpisodes', activeSeasonEpisodes[activeSeasonEpisodes.length - 1])

//     const selectSeason = (type) => {
//         switch (type) {
//             case 'NEXT':
//                 setActiveSeasonEpisodes(seriesInfo.seasons[_index + 1].episodes)
//                 setActiveSeason(seriesInfo.seasons[_index + 1])
//                 return

//             case 'PREV':
//                 setActiveSeasonEpisodes(seriesInfo.seasons[_index - 1].episodes)
//                 setActiveSeason(seriesInfo.seasons[_index - 1])
//                 return

//             default:
//                 return
//         }
//     }

//     useEffect(() => {
//         fetchOneSeries(id, dispatch)
//         fetchGenres(dispatch)
//     }, [dispatch, id])

//     useEffect(() => {
//         if (seriesInfo.seasons) {
//             setActiveSeasonEpisodes(seriesInfo.seasons[0].episodes)
//             setActiveSeason(seriesInfo.seasons[0])
//         }
//     }, [seriesInfo.seasons])

//     if (loaders.series) return <Loader />

//     return (
//         <div className="episodes">
//             <Header links={5} />
//             <div className="bg-img-wrapper">
//                 <img loading="lazy" src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${seriesInfo.images.POSTER}?accessKey=WkVjNWNscFhORDBLCg==`} className="bg-img" alt='' />
//                 <div className="overlay" />
//             </div>
//             <main className="episodes-main">
//                 <div className="episodes-content">
//                     <div>
//                         <h1>{seriesInfo.title}</h1>
//                         <p className="description">{seriesInfo.description}</p>
//                         <div className="rating-genre">
//                             <small>{getGenreName(seriesInfo.genres[0], genres)}</small>
//                             <small>{seriesInfo.year}</small>
//                             <small>{seriesInfo.user_rating}</small>
//                         </div>
//                         <div className="buttons">
//                             {activeSeasonEpisodes.length > 0 ? <Button  page={`/watch/series/${activeSeasonEpisodes[activeSeasonEpisodes.length - 1].id}`} label='PLAY'/> : <></>}
//                             {/* <OutlineButton label='TRAILER' page='/' /> */}
//                         </div>
//                         <br />
//                         <div className="seasons-controls">
//                             {activeSeason.number > 1 ? <NextArrow action={() => selectSeason('PREV')} /> : <></>}
//                             <div className="season-text">SEASON {activeSeason.number}/{seriesInfo.seasons.length}</div>
//                             {activeSeason.number < seriesInfo.seasons.length ? <PrevArrow action={() => selectSeason('NEXT')} /> : <></>}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="vertical-slider-wrapper">
//                     {
//                         activeSeasonEpisodes.map((_episode, i) => {
//                             return <VerticalSliderCard nextEpisode={activeSeasonEpisodes[i + 1] || {}} episode={_episode} key={_episode.id} />
//                         })
//                     }
//                 </div>
//             </main>
//             <MoreLikeThis type='series' movieId={id} />
//         </div>
//     )
// }

// export const  NextArrow = ({ action }) => {
//     return <p onClick={action}>
//         <svg xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24">
//             <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" /></svg>
//     </p>
// }

// export const PrevArrow = ({ action, style }) => {
//     return <p onClick={action}>
//         <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             style={style}
//             className={styles['prev-arrow-svg']}>
//             <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" /></svg>

//     </p>
// }

// const MoreLikeThis = ({ type, movieId }) => {
//     const dispatch = useDispatch()
//     const { similarMovies } = useSelector(state => state.fetchMovies)

//     useEffect(() => {
//         fetchSimilarMovies(type, movieId, dispatch)
//     }, [dispatch, movieId, type])

//     return (
//         <div style={{ position: 'relative', background: '#1a052b' }}>
//             <SliderWrapper title='MORE LIKE THIS'>
//                 <AllMovies type='similar-movies' filteredMovies={similarMovies} />
//             </SliderWrapper>
//         </div>
//     )
// }

// export default SeriesDetails