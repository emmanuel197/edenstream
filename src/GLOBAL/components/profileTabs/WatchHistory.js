import { useState, useEffect } from "react";
import { DeleteNotificationIcon, NoStream, PaginationNextIcon, ThreeDots, WatchHistoryIcon } from "../../../utils/assets";
import "../../components/styles/profileTabs/watch-history.scss";
import Button from "../buttons/Button";
import GenericModal from "../genericModal";
import { RwContentContainer } from "../reels/ReelWrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist, returnMovieDetails } from "../../redux/fetchMoviesApi";
const WatchHistory = ({ active }) => {
    const [showClearWatchModal, setShowClearWatchModal] = useState(true)
    const [fullMovies, setFullMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { watchlist } = useSelector(state => state.fetchMovies)
    // const isAuthenticated = JSON.parse(window.localStorage.getItem("isAuthenticated"));
    console.log(watchlist)
    // const user_info = COOKIES.get("user_info");
    useEffect(() => {
        // isAuthenticated && 
       fetchWatchlist(dispatch)
        // console.log(isAuthenticated)
    }, [dispatch])

    useEffect(() => {
      // Fetch full details for each movie in watchlist
      const fetchAllDetails = async () => {
        if (!watchlist || watchlist.length === 0) {
          setFullMovies([]);
          return;
        }
        setLoading(true);
        const details = await Promise.all(
          watchlist.map(async (item) => {
            // item.movie.id is the movie id
            if (!item.movie || !item.movie.id) return null;
            const movie = await returnMovieDetails(item.movie.id);
            if (!movie) return null;
            return { ...movie, lastWatched: item.created_at };
          })
        );
        setFullMovies(details.filter(Boolean));
        setLoading(false);
      };
      fetchAllDetails();
    }, [watchlist]);

    if (active === 'Watch History') {
        return (
            <section className="watch-history-section">
              
                <div className="watch-history-section-header-wrapper">
                <WatchHistoryIcon className="watch-history-section-icon"/>
                    <h2 className="watch-history-section-header">Watchlist</h2>
                </div>
                <div className="yes-no-watch-history">
                {/* <ThreeDots className="watch-history-three-dots" /> */}
                    {loading ? <div>Loading watch history...</div> :
                      (fullMovies.length > 0 ? <YesWatchHistory showClearWatchModal={showClearWatchModal} setShowClearWatchModal={()=> setShowClearWatchModal()} history={fullMovies}/> :
                     <NoWatchHistory/>) }
                     <div className="pagination-wrapper">
                        <div className="page-number">1</div>
                        <div className="page-number">2</div>
                        <div className="page-number">3</div>
                        <div className="next-page">
                            <PaginationNextIcon/>
                        </div>
                     </div>
                </div>
            </section>
        )
    }
    
    return <></>
}

const NoWatchHistory = () => {
    return (
        <div className="no-watch-history-detail">
                    <NoStream className="no-watch-history-icon"/>
                    <p className="no-watch-history-text">You haven't watched anything yet! Your recently watched content will appear here. Start exploring now!</p>
                    <Button className="browse-content-btn" label="Browse Content" page="/"/>
                    </div>      
    )
}

const YesWatchHistory = ({history, showClearWatchModal, setShowClearWatchModal}) => {
    const handleCancel = () => {
        console.log("cancel")
        setShowClearWatchModal(false)
    }
    const handleClearAll = () => {
        console.log("clear all")
    }
    return (
        <div className="yes-watch-history-detail">
            {/* {showClearWatchModal && <GenericModal
            headerText={"Clear All History"}
            paragraphText={"Are you sure you want to clear all History? This action cannot be undone."}
            svg={<DeleteNotificationIcon className="delete-watch-history"/>}
            sectionClassName="watch-history-section-modal"
            ContentWrapper="watch-history-modal-content-wrapper"
            buttons={[<Button className="cancel-btn" label="Cancel" action={handleCancel} />, <Button className="clearall-btn" label="Clear All" action={handleClearAll} />] } />} */}
            <RwContentContainer movies={history} isChannelsSection={true}/>
        </div>
    )
}

export default WatchHistory 