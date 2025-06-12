// import { useSelector } from 'react-redux';
// import ReelGenreWrapper from './ReelGenreWrapper';
// import HomeBannerSlider from "../HomeBannerSlider";
// import '../../components/styles/landing/slides.scss'

// const Reel = ({ title, movies }) => {
//     const { recentlyadded, mostwatched, afriPlaylive, afriPremiere, comingSoon, bingeworthy, nostalgia, romcom, omg, readysetpopcorn, mtnrecommends, doubledrama, hiddengems, watchagain, topepicmovies, exciting, trending, viewersfavourites, randompicks, suggestedmoviesforyou, afriplaytop10 } = useSelector((state) => state.fetchMovies);
//     const { activeGenreTab } = useSelector(state => state.genreTab)
//     // console.log(bingeworthy)
//     const _allMovies = {
//         mostwatched,
//         recentlyadded,
//         comingSoon,
//         bingeworthy,
//         nostalgia,
//         romcom,
//         omg,
//         readysetpopcorn,
//         suggestedmoviesforyou,
//         mtnrecommends,
//         doubledrama,
//         hiddengems,
//         watchagain,
//         topepicmovies,
//         exciting,
//         viewersfavourites,
//         randompicks,
//         trending,
//         afriplaytop10,
//         afriPlaylive,
//         afriPremiere,
//     }
//     // console.log(movies)
//     // console.log(trending)
//     if (activeGenreTab === 'ALL') {
//         if (title === 'AFRIPREMIERE') return <HomeBannerSlider title='AFRIPREMIERE' />
//         if (title === 'AFRIPLAY LIVE') return <ReelGenreWrapper title='AFRIPLAY LIVE'  movies={movies} />
//         if (title === 'UPCOMING') return <ReelGenreWrapper title='UPCOMING'  movies={movies} />
//         if (title === 'NOW SHOWING') return <ReelGenreWrapper title='NOW SHOWING'  movies={movies} />
//         if (title === 'RECENTLY ADDED' && recentlyadded?.length > 0) return <ReelGenreWrapper title='RECENTLY ADDED' allMovies={_allMovies} movies={recentlyadded} />
//         if (title === 'COMING SOON' && comingSoon?.length > 0) return <ReelGenreWrapper title='COMING SOON' allMovies={_allMovies} movies={comingSoon} />
        
//         if (title === 'BINGE WORTHY' && bingeworthy?.length > 0) return <ReelGenreWrapper title='BINGE WORTHY' allMovies={_allMovies} movies={bingeworthy} />
//         if (title === 'NOSTALGIA' && nostalgia?.length > 0) return <ReelGenreWrapper title='NOSTALGIA' allMovies={_allMovies} movies={nostalgia} />
//         if (title === 'ROMCOM' && romcom?.length > 0) return <ReelGenreWrapper title='ROMCOM' allMovies={_allMovies} movies={romcom} />
//         if (title === 'OMG' && romcom?.length > 0) return <ReelGenreWrapper title='OMG' allMovies={_allMovies} movies={omg} />
//         if (title === 'READY SET POPCORN' && romcom?.length > 0) return <ReelGenreWrapper title='READY SET POPCORN' allMovies={_allMovies} movies={omg} />
//         if (title === 'TRENDING' && trending?.length > 0) return <ReelGenreWrapper title='TRENDING' allMovies={_allMovies} movies={trending} />
//         if (title === 'MTN RECOMMENDS' && mtnrecommends?.length > 0) return <ReelGenreWrapper title='MTN RECOMMENDS' allMovies={_allMovies} movies={mtnrecommends} />
//         if (title === 'DOUBLE DRAMA' && doubledrama?.length > 0) return <ReelGenreWrapper title='DOUBLE DRAMA' allMovies={_allMovies} movies={doubledrama} />
//         if (title === 'HIDDEN GEMS' && hiddengems?.length > 0) return <ReelGenreWrapper title='HIDDEN GEMS' allMovies={_allMovies} movies={hiddengems} />
//         if (title === 'WATCH AGAIN' && watchagain?.length > 0) return <ReelGenreWrapper title='WATCH AGAIN' allMovies={_allMovies} movies={watchagain} />
//         if (title === 'TOP EPIC MOVIES' && topepicmovies?.length > 0) return <ReelGenreWrapper title='TOP EPIC MOVIES' allMovies={_allMovies} movies={topepicmovies} />
//         if (title === 'EXCITING' && exciting?.length > 0) return <ReelGenreWrapper title='EXCITING' allMovies={_allMovies} movies={exciting} />
//         if (title === 'VIEWERS FAVOURITES' && viewersfavourites?.length > 0) return <ReelGenreWrapper title='VIEWERS FAVOURITES' allMovies={_allMovies} movies={viewersfavourites} />
//         if (title === 'RANDOM PICKS' && randompicks?.length > 0) return <ReelGenreWrapper title='RANDOM PICKS' allMovies={_allMovies} movies={randompicks} />
        // if (title === 'SUGGESTED MOVIES FOR YOU' && suggestedmoviesforyou?.length > 0) return <ReelGenreWrapper title='SUGGESTED MOVIES FOR YOU' allMovies={_allMovies} movies={suggestedmoviesforyou} />
        // if (title === 'COMING SOON' && suggestedmoviesforyou?.length > 0) return <ReelGenreWrapper title='COMING SOON' allMovies={_allMovies} movies={suggestedmoviesforyou} />

        
        // if (title === 'MOST WATCHED' && mostwatched.length > 0) return <ReelGenreWrapper title='MOST WATCHED' allMovies={_allMovies} movies={mostwatched} />
//     }

//     return <></>
// }

// export default Reel

// import ReelWrapper from "./ReelWrapper"

// const Reel = ({ title, marginTop, marginBottom }) => {
//         const filteredMovies = [{ id: 1,   name: "Angels Friends", poster: "/assets/adipurush.png"
//         }, {id: 2, name:"Faith", poster: "/assets/jackie.png"},
//          {id: 3, name:"Faith", poster: "/assets/sincity.png", newEpisode: true},
//         {id:4, name:"Faith Tv", poster: "/assets/faith.png"}]
       
//         if (title === 'Recommended For You' && filteredMovies?.length > 0)  return <ReelWrapper title="Recommended  For You" movies={filteredMovies}/>
//         if (title === 'New on Eden Streams') return <ReelWrapper title="New on Eden Streams" movies={filteredMovies}/>
//         if (title === 'African Christian') return <ReelWrapper title="African Christian" movies={filteredMovies}/>
//         if (title === 'American Christian Movie') return <ReelWrapper title="American Christian Movie" movies={filteredMovies}/>
//  }

//  export default Reel

 import ReelWrapper from "./ReelWrapper";

const Reel = ({ title, movies, marginTop, marginBottom }) => {
    if (!movies || movies.length === 0) return null; // Don't render if no movies

    return (
        <div style={{ marginTop, marginBottom }}>
            <ReelWrapper title={title} movies={movies} />
        </div>
    );
};

export default Reel;

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { fetchChannelEPGInfo } from "../../../redux/channels";
// import MovieCard from "../../cards/MovieCard";
// import { RwContentContainer } from "../../reels/ReelWrapper";
// import "../../styles/reel-wrapper.scss";
// const LiveTvReelSlider = () => {
//     const { channelCategories } = useSelector((state) => state.fetchMovies)
//     const [EPGs, setEPGs] = useState([])

//     console.log("LiveTvReelSlider: channelCategories from Redux", channelCategories); // Log channelCategories from Redux

//     useEffect(() => {
//         const getAllChanelsIDs = () => {
//             const channelIDs = []

//             for (let i = 0; i < channelCategories.length; i++) {
//                 const element = channelCategories[i];
//                 // Add check for valid element and channels array
//                 if (element && element.channels) {
//                     let channels = element.channels

//                     for (let j = 0; j < channels.length; j++) {
//                          // Add check for valid channel object
//                         if (channels[j] && channels[j].id) {
//                             channelIDs.push(channels[j].id)
//                         } else {
//                             console.warn("LiveTvReelSlider: Found invalid channel object or missing ID", channels[j]);
//                         }
//                     }
//                 } else {
//                     console.warn("LiveTvReelSlider: Found invalid channel category element or missing channels array", element);
//                 }
//             }

//             console.log("LiveTvReelSlider: Extracted channel IDs", channelIDs); // Log extracted IDs
//             // Only fetch if there are IDs
//             if (channelIDs.length > 0) {
//                 initFetchChannelEPGInfo(channelIDs.toString())
//             } else {
//                  console.log("LiveTvReelSlider: No valid channel IDs found, skipping EPG fetch");
//             }
//         }

//         const initFetchChannelEPGInfo = async (channelIDs) => {
//             console.log("LiveTvReelSlider: Fetching EPG info for IDs", channelIDs); // Log IDs being used for EPG fetch
//             const epgData = await fetchChannelEPGInfo(channelIDs);
//             console.log("LiveTvReelSlider: Fetched EPG data", epgData); // Log fetched EPG data
//             setEPGs(epgData);
//         }

//         if (channelCategories && channelCategories.length > 0) { // Only run if categories are loaded
//              getAllChanelsIDs();
//         } else {
//             console.log("LiveTvReelSlider: channelCategories is empty or null, skipping EPG fetch");
//         }

//     }, [channelCategories])
//     // console.log(channelCategories)
//     return (
//         <div>
//             {
//                 channelCategories
//                     .filter(channel => channel && channel.channels) // Filter out null/undefined categories or categories without channels
//                     .map((channel, index) => {
//                     console.log("LiveTvReelSlider: Mapping channel category", channel.name, channel); // Log each channel category

//                     // Process channels to merge EPG data before passing to RwContentContainer
//                     const processedChannels = EPGs ? channel.channels
//                         .filter(movieItem => movieItem && movieItem.id) // Filter out null/undefined movieItems or items without ID
//                         .map((movieItem) => {
//                         const _movie = { ...movieItem, type: 'livetv' }; // Ensure type is livetv
//                         const _epg = EPGs.find(epg => movieItem.id === epg.id);

//                         if (_epg) {
//                             _movie.shows = _epg.shows;
//                             console.log("LiveTvReelSlider: Found EPG for channel", movieItem.id, _epg.shows); // Log EPG found
//                         } else {
//                             console.log("LiveTvReelSlider: No EPG found for channel", movieItem.id); // Log no EPG found
//                         }
//                         return _movie;
//                     }) : [];

//                     console.log("LiveTvReelSlider: Processed channels for category", channel.name, processedChannels); // Log processed channels

//                     return (
                     
//                         <div className="reel-wrapper-section inner-sections-wrapper" key={channel.id + index} >
//                             {/* Use RwContentContainer instead of SliderWrapper and Slider */}
//                             {/* Pass the processed channels array as the 'movies' prop */}
//                             <div className="rw-header">
//                                 <h2 className="rw-title">{channel.name}</h2>
//                                 {/* Add any additional header elements here if needed */}
//                             </div>
//                             {/* Add title manually */}
//                             <RwContentContainer movies={processedChannels}  />
//                             <br />
//                             <br />
//                         </div>

//                     )
//                 })
//             }
//         </div>
//     )
// }

// export default LiveTvReelSlider

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { fetchChannelEPGInfo } from "../../../redux/channels";
// import Slider from "react-slick";
// import sliderSettings from "../../../../utils/sliderConfig/sliderSettings";
// import MovieCard from "../../cards/MovieCard";
// import SliderWrapper from "../../SliderWrapper";

// const LiveTvReelSlider = () => {
//     const { channelCategories } = useSelector((state) => state.fetchMovies)
//     const [EPGs, setEPGs] = useState([])

//     console.log("LiveTvReelSlider: channelCategories from Redux", channelCategories); // Log channelCategories from Redux

//     useEffect(() => {
//         const getAllChanelsIDs = () => {
//             const channelIDs = []

//             for (let i = 0; i < channelCategories.length; i++) {
//                 const element = channelCategories[i];
//                 let channels = element.channels

//                 for (let j = 0; j < channels.length; j++) {
//                     channelIDs.push(channels[j].id)
//                 }
//             }

//             console.log("LiveTvReelSlider: Extracted channel IDs", channelIDs); // Log extracted IDs
//             initFetchChannelEPGInfo(channelIDs.toString())
//         }

//         const initFetchChannelEPGInfo = async (channelIDs) => {
//             console.log("LiveTvReelSlider: Fetching EPG info for IDs", channelIDs); // Log IDs being used for EPG fetch
//             const epgData = await fetchChannelEPGInfo(channelIDs);
//             console.log("LiveTvReelSlider: Fetched EPG data", epgData); // Log fetched EPG data
//             setEPGs(epgData);
//         }

//         if (channelCategories && channelCategories.length > 0) { // Only run if categories are loaded
//              getAllChanelsIDs();
//         } else {
//             console.log("LiveTvReelSlider: channelCategories is empty or null, skipping EPG fetch");
//         }

//     }, [channelCategories])
//     // console.log(channelCategories)
//     return (
//         <div>
//             {
//                 channelCategories.map((channel, index) => {
//                     console.log("LiveTvReelSlider: Mapping channel category", channel.name, channel); // Log each channel category
//                     return (
//                         <div key={channel.id + index}>
//                             <SliderWrapper title={channel.name}>
//                                 <Slider {...sliderSettings(5)}>
//                                     {
//                                         EPGs ? channel.channels.map((movieItem, index) => {
//                                             console.log("LiveTvReelSlider: Mapping channel item", movieItem); // Log each channel item
//                                             const _movie = { ...movieItem }

//                                             const _epg = EPGs.filter(epg => {

//                                                 return movieItem.id === epg.id
//                                             })

//                                             if (_epg.length > 0) {
//                                                 _movie.shows = _epg[0].shows
//                                                 console.log("LiveTvReelSlider: Found EPG for channel", movieItem.id, _epg[0].shows); // Log EPG found
//                                             } else {
//                                                 console.log("LiveTvReelSlider: No EPG found for channel", movieItem.id); // Log no EPG found
//                                             }

//                                             console.log("LiveTvReelSlider: Passing movie object to MovieCard", _movie); // Log object passed to MovieCard
//                                             return  <MovieCard key={movieItem.id + index} type='livetv' movie={_movie} />
//                                         }) : <></>
//                                     }
//                                 </Slider>
//                             </SliderWrapper>
//                             <br />
//                             <br />
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }

// export default LiveTvReelSlider
