import { useState } from "react";
import { DeleteNotificationIcon, NoStream, PaginationNextIcon, ThreeDots, WatchHistoryIcon } from "../../../utils/assets";
import "../../components/styles/profileTabs/watch-history.scss";
import Button from "../buttons/Button";
import GenericModal from "../genericModal";
import { RwContentContainer } from "../reels/ReelWrapper";
const WatchHistory = ({ active }) => {
    const [showClearWatchModal, setShowClearWatchModal] = useState(true)
    if (active === 'Watch History') {
        const history = [{ id: 1,   name: "Angels Friends", poster: "/assets/adipurush.png"
    }, {id: 2, name:"Faith", poster: "/assets/jackie.png"},
     {id: 3, name:"Faith", poster: "/assets/sincity.png", newEpisode: true},
    {id:4, name:"Faith Tv", poster: "/assets/faith.png"},]
        return (
            <section className="watch-history-section">
              
                <div className="watch-history-section-header-wrapper">
                <WatchHistoryIcon className="watch-history-section-icon"/>
                    <h2 className="watch-history-section-header">Watch History</h2>
                </div>
                <div className="yes-no-watch-history">
                <ThreeDots className="watch-history-three-dots" />
                    {(history.length > 0) ? <YesWatchHistory showClearWatchModal={showClearWatchModal} setShowClearWatchModal={()=> setShowClearWatchModal()} history={history}/> :
                     <NoWatchHistory/>}
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
            {showClearWatchModal && <GenericModal
            headerText={"Clear All History"}
            paragraphText={"Are you sure you want to clear all History? This action cannot be undone."}
            svg={<DeleteNotificationIcon className="delete-watch-history"/>}
            sectionClassName="watch-history-section-modal"
            ContentWrapper="watch-history-modal-content-wrapper"
            buttons={[<Button className="cancel-btn" label="Cancel" action={handleCancel} />, <Button className="clearall-btn" label="Clear All" action={handleClearAll} />] } />}
            <RwContentContainer movies={history} isChannelsSection={true}/>
        </div>
    )
}

export default WatchHistory 