import { useState, useEffect } from "react";
import { DeleteNotificationIcon, NoStream, PaginationNextIcon, ThreeDots, WatchHistoryIcon } from "../../utils/assets";
import "../components/styles/profileTabs/watch-history.scss";
import GenericModal from "../components/genericModal";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { RwContentContainer } from "../components/reels/ReelWrapper";
import { useDispatch, useSelector } from "react-redux";
import { favoritedMovies,  returnMovieDetails } from "../redux/fetchMoviesApi";
import Button from "../components/buttons/Button";

const MyListPage = ({ active }) => {
    const [showClearWatchModal, setShowClearWatchModal] = useState(true)
    const [fullMovies, setFullMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { likedMovies } = useSelector(state => state.fetchMovies)
    // const isAuthenticated = JSON.parse(window.localStorage.getItem("isAuthenticated"));
    console.log(likedMovies)
    // const user_info = COOKIES.get("user_info");
    useEffect(() => {
        // isAuthenticated && 
       favoritedMovies(dispatch)
        // console.log(isAuthenticated)
    }, [dispatch])

    // useEffect(() => {
    //   // Fetch full details for each movie in watchlist
    //   const fetchAllDetails = async () => {
    //     if (!likedMovies || likedMovies.length === 0) {
    //       setFullMovies([]);
    //       return;
    //     }
    //     setLoading(true);
    //     const details = await Promise.all(
    //       likedMovies.map(async (item) => {
    //         // item.movie.id is the movie id
    //         if (!item.movie || !item.movie.id) return null;
    //         const movie = await returnMovieDetails(item.movie.id);
    //         if (!movie) return null;
    //         return { ...movie, lastWatched: item.created_at };
    //       })
    //     );
    //     setFullMovies(details.filter(Boolean));
    //     setLoading(false);
    //   };
    //   fetchAllDetails();
    // }, [likedMovies]);

   
        return (
            <>
            <Header/>
            <section className="watch-history-section">
              
              
              <div className="yes-no-watch-history yes-no-mylist">
              {/* <ThreeDots className="watch-history-three-dots" /> */}
                  {loading ? <div>Loading watch history...</div> :
                    (likedMovies?.length > 0 ? <YesMyList showClearWatchModal={showClearWatchModal} setShowClearWatchModal={()=> setShowClearWatchModal()} history={likedMovies}/> :
                   <NoMyList/>) }
                  
              </div>
          </section>
          <Footer/> 
            </>
            
        )
    
    
    return <></>
}

const NoMyList = () => {
    return (
        <div className="no-watch-history-detail">
                    <NoStream className="no-watch-history-icon"/>
                    <p className="no-watch-history-text">You haven't watched anything yet! Your recently watched content will appear here. Start exploring now!</p>
                    <Button className="browse-content-btn" label="Browse Content" page="/"/>
                    </div>      
    )
}

const YesMyList = ({history, showClearWatchModal, setShowClearWatchModal}) => {
    const handleCancel = () => {
        console.log("cancel")
        setShowClearWatchModal(false)
    }
    const handleClearAll = () => {
        console.log("clear all")
    }
    return (
        <div className="yes-watch-history-detail my-list-container">
            {/* {showClearWatchModal && <GenericModal
            headerText={"Clear All History"}
            paragraphText={"Are you sure you want to clear all History? This action cannot be undone."}
            svg={<DeleteNotificationIcon className="delete-watch-history"/>}
            sectionClassName="watch-history-section-modal"
            ContentWrapper="watch-history-modal-content-wrapper"
            buttons={[<Button className="cancel-btn" label="Cancel" action={handleCancel} />, <Button className="clearall-btn" label="Clear All" action={handleClearAll} />] } />} */}
            <h2 className="my-list-header">My List</h2>
            <RwContentContainer movies={history}/>
        </div>
    )
}

export default MyListPage