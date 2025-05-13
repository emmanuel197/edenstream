import React from 'react';
// import { PrevArrow } from '../../pages/seriesDetails';
// import { purchasePackage } from '../../redux/subscriptionApis'
import Button from '../../components/buttons/Button'
import { useDispatch, useSelector } from "react-redux";
import { androidImg, appleImg, checkImg, webImg } from '../../../utils/assets';
import { subscriptionModalReducer } from '../../redux/slice/subscriptionSlice';

// Subscription component
const SubscriptionCard = (subscription) => {
    const {ID, Name, Price, Currency, Validity, Details} = subscription.subscription
    
    // const { isLoading } = useSelector(state => state.fetchPackages)
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.fetchPackages);
    const _initPurchasePackage = () => {

      dispatch(subscriptionModalReducer({ isOpen: true, productId: ID, productName: Name, productPrice: Price, currency: Currency }))
    }
    
    return (
      
      <div className="subscription-card">
        <div className="plan-name">
          <h2 className="heading">{Name}</h2>
        </div>
        <div
          id="Plan-Price"
          className="plan-price"
        >
          <div className="price-currency">{Currency}</div>
          <div className="price">{Price}</div>
        </div>
        <div className="plan-duration">
          <p className="paragraph">{Validity}</p>
        </div>
        <div className="plan-benefits">
        {Details && Details.map((detail, index) => (
                <div key={index} className={'sb-item' + (index === Details.length - 1 ? ' margin-bottom-none' : '')}>
                    <img
                    
                        src={checkImg}
                        loading="lazy"
                        alt="check mark"
                        className="check-mark"
                    />
                    <p className="name-your-list">{detail}</p>
                </div>
            ))}
          
        </div>
        <div className='button-wrapper'>
        <Button isDisabled={isLoading} action={() => {_initPurchasePackage()}} label='Subscribe'/>
        </div>
        {/* <div
          className="icons-container-wrapper"
        >
          <div className="icons-container">
            <img
              src={webImg}
              loading="lazy"
              alt="Web"
            /><img
              src={androidImg}
              loading="lazy"
              alt="Android"
            /><img
              src={appleImg}
              loading="lazy"
              alt="Apple"
            />
          </div>
        </div> */}
      </div>

    
    );
};

export default SubscriptionCard;
