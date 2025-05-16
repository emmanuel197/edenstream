import Header from "../components/Header"
import Footer from "../components/Footer";
import GenreTabs from '../components/home/GenreTabs'
import Reel from "../components/reels/Reel";
import DynamicBanner from "../components/banners/DynamicBanner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveGenreTab } from "../redux/slice/genreTabSlice";
import "../components/styles/home.scss";
import { fetchMovie } from "../redux/fetchMoviesApi";

const Home = () => {
    const dispatch = useDispatch();
    
    // Get movie categories from Redux store
    const {
        trending = [],
        recentlyadded = [],
        bingeworthy = [],
        nostalgia = [],
        romcom = [],
        omg = [],
        suggestedmoviesforyou = [],
        readysetpopcorn = [],
        afriPlaylive = [],
        loading
    } = useSelector(state => state.fetchMovies);

    useEffect(() => {
        // Fetch movies when component mounts
        const loadMovies = async () => {
            try {
                await fetchMovie(dispatch);
                console.log('Movies fetched successfully');
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        loadMovies();
    }, [dispatch]);

    // Debug logs for data structure
    console.log('Recently Added Movies:', recentlyadded);
    if (recentlyadded.length > 0) {
        console.log('Sample Movie Structure:', {
            firstMovie: recentlyadded[0],
            keys: Object.keys(recentlyadded[0]),
            metadata: recentlyadded[0].metadata,
            content: recentlyadded[0].content
        });
    }

    // Define sections with their corresponding data from Redux
    const reelSections = [
        { reelTitle: "Trending", movies: trending },        
        { reelTitle: "Inspiring", movies: recentlyadded },
        { reelTitle: "Binge Worthy", movies: bingeworthy },
        { reelTitle: "Nostalgia", movies: nostalgia },
        { reelTitle: "RomCom", movies: romcom },
        { reelTitle: "OMG", movies: omg },
        { reelTitle: "Suggested For You", movies: suggestedmoviesforyou },
        { reelTitle: "Ready Set Popcorn", movies: readysetpopcorn },
        { reelTitle: "Afriplay Live", movies: afriPlaylive }
    ].filter(section => section.movies && section.movies.length > 0);

    // Debug log for sections that have movies
    console.log('Sections with movies:', reelSections.map(section => ({
        title: section.reelTitle,
        movieCount: section.movies.length,
        sampleMovie: section.movies[0]
    })));

    return (
        <>
            <main>
                <Header links={5} signup={1} />
                <div className="inner-sections-wrapper">
                    <DynamicBanner />
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        reelSections.map(({reelTitle, movies}) => {
                            console.log(`Rendering ${reelTitle} section with movies:`, movies[0]);
                            return (
                                <Reel 
                                    key={reelTitle}
                                    title={reelTitle} 
                                    movies={movies} 
                                    marginTop="2.6042vw"
                                />
                            );
                        })
                    )}
                </div>
                <Footer />
            </main>
        </>
    )
}

export default Home

