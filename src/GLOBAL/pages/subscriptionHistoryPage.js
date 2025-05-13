import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HistoryCard from "../components/cards/HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseHistory } from "../redux/subscriptionApis";
import "../components/styles/History.scss";
import { handleToggleMenuReducer } from "../redux/slice/subscriptionSlice";
import SubscriptionHistorySidebar from "../components/SubscriptionHistorySidebar";
import SubscriptionModal from '../components/SubscriptionModal'
import { nocart } from "../../utils/assets";
import Spinner from "../components/Spinner";
const SubscriptionHistoryPage = () => {
  const dispatch = useDispatch();
  const { modalOpen, isLoading } = useSelector((state) => state.fetchPackages);
  const { purchaseHistory, isChecked, activeSubscription } = useSelector(
    (state) => state.fetchPackages
  );

  let active = activeSubscription  ? "Active" : "";

  useEffect(() => {
    fetchPurchaseHistory(dispatch, active);
    const handleResize = () => {
      dispatch(handleToggleMenuReducer(window.innerWidth < 800 && !isChecked)); // Adjust the viewport size threshold as needed
    };

    handleResize(); // Call once on component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, active]);

  const purchaseHistoryData = Array.isArray(purchaseHistory)
    ? purchaseHistory
    : [];
  return (
    <>
      <Header links={5} signup={1} />
      <main style={{ position: "relative" }}>
      <wc-toast></wc-toast>
        {isLoading && <Spinner/>}
        <div className="subscription-history-page">
          {modalOpen && <SubscriptionModal />}
          {!modalOpen && <><SubscriptionHistorySidebar purchaseHistoryData={purchaseHistoryData}/>
          
          <div
            id="subscription-history-main"
            className="subscription-history-main"
          >
            <input id="sub-main-toggle" type="checkbox" checked={isChecked} />
            <HistoryCard />
            <div className="history-cards-wrapper">
              <input id="sub-main-toggle" type="checkbox" checked={isChecked} />
              {purchaseHistoryData && purchaseHistoryData.length > 0 && purchaseHistoryData.some(subscription => subscription.product_name !== "Free")
                ? purchaseHistoryData
                    .filter(
                      (subscription) => subscription.product_name !== "Free"
                    )
                    .map((subscription, index) => (
                      <HistoryCard
                        key={index}
                        subscription={subscription}
                        isChecked={isChecked}
                      />
                    ))
                : <div id="history-card" className="history-card" style={{height: '70%'}}>
                <div className="card-container card-wrapper card-wrapper-no-data">
                  <img loading="lazy"  className='no-data-img' src={nocart} alt="no active subscriptions image" title="no active subscriptions"/>
                  <div className="card-content" style={{height: 'auto'}}>You have no {active ? 'active' : ''} subscriptions. Choose your desired data bundle from the available data bundles list to enjoy amazing AfriPlay content</div></div></div>}
            </div>
          </div></>}
        </div>
        
      </main>
     {!modalOpen && <Footer />}
    </>
  );
};

export default SubscriptionHistoryPage;
