import React from "react";
import { packageImage, subscriptionHistory } from "../../../utils/assets";
import { subscriptionModalReducer } from '../../redux/slice/subscriptionSlice';
import { useDispatch, useSelector } from "react-redux";

// HistoryCard component to render individual subscription history
const HistoryCard = ({ subscription }  ) => {
 const isMobileView = window.innerWidth < 460
 const {activeSubscription} = useSelector(state => state.fetchPackages) 
 const dispatch = useDispatch()
  if (!subscription) {
    return (<>
    {!isMobileView && <div id="history-card" className="history-card history-heading" >
        <div className="card-container card-wrapper">
          <div className="card-content">
            <div className="img-wrapper">
            
              <div className="package-img-placeholder"></div>
            </div>
            <div className="text-content">
              <h3 title='product name header'>Product Name</h3>
              <h3 title='order Id header'>Order ID</h3>
              <h3 title="price header">Price</h3>
              <h3 title="purcchase date">Purchase Date</h3>
            </div>
          </div>
        </div>
      </div>}
    </>
      
    );
  }
  
  const { product_name, id, currency, price, purchase_date, product_id, end_date } =
    subscription;
  const _initCancelPackage = () => {
      dispatch(subscriptionModalReducer({ isOpen: true, productId: product_id }))
    }
  return (
    <>
    <div id="history-card" className={`history-card ${activeSubscription ? 'clickable' : ''}`} onClick={activeSubscription ? _initCancelPackage : null}>
      <div className="card-container card-wrapper">
        <div className="card-content">
          <div className="img-wrapper">
            <img
              className="package-img"
              src={packageImage}
              alt="package image"
            />
          </div>
          <div className="text-content">
            <h3 title={`${product_name} plan`}>{product_name}</h3>
            <p>{id}</p>
            <p>
              {currency} {price}
            </p>
            <p>On {purchase_date}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HistoryCard;
