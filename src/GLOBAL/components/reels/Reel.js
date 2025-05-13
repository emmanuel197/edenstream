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
