import Header from "../components/Header"
import Footer from "../components/Footer";
import Reel from "../components/reels/Reel";
import DynamicBanner from "../components/banners/DynamicBanner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../components/styles/home.scss";
import { fetchMovie } from "../redux/fetchMoviesApi";

const Home = () => {
    const dispatch = useDispatch();
    
    // Get all state from Redux store
    const moviesState = useSelector(state => state.fetchMovies);
    const { loading } = moviesState;

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

    // Create reel sections from categories
    const reelSections = Object.entries(moviesState.moviesByCategories || {})
        .map(([categoryUid, _]) => ({
            reelTitle: categoryUid.toUpperCase(),
            movies: moviesState[categoryUid.toLowerCase()] || []
        }))
        .filter(section => section.movies && section.movies.length > 0);

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

