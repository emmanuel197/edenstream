import { FaLaptop, FaMobileAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Account = ({ active }) => {
  const { accountPurchases } = useSelector(state => state.account)
  if (active === "account")
    return (
      <section className="tab-wrapper">
        <div className="account-sub">
          <div className="account-sub-text">
            <p>SUBSCRIPTION DETAILS</p>
          </div>
          <div className="account-sub-info">
            <p className="blue">
              Subscription Active - expires 31 September 2022
            </p>
            <p>emmao@tva.com</p>
            <p>+233709878890</p>
          </div>
          <div className="account-sub-edits">
            <div className="inside-account-sub-edits">
              <p>Renew Subscription</p>
              <p>Edit email</p>
              <p>Edit phone number</p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="account-sub">
          <div className="account-sub-text">
            <p>DEVICES</p>
          </div>
          <div className="account-sub-info">
            <div className="device">
              <div className="inside-device">
                <div className="laptop-info">
                  <div className="laptop">
                    <FaLaptop size="80px" />
                  </div>
                  <div className="info">
                    <p>Windows</p>
                    <div className="added-date">
                      <div className="date">
                        <p>Added</p>
                      </div>
                      <div className="added">
                        <p>23/09/2022</p>
                      </div>
                    </div>
                    <div className="added-date">
                      <div className="date">
                        <p>Added</p>
                      </div>
                      <div className="added">
                        <p>23/09/2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inside-device">
                <div className="laptop-info">
                  <div className="laptop">
                    <FaMobileAlt size="70px" />
                  </div>
                  <div className="info">
                    <p>Windows</p>
                    <div className="added-date">
                      <div className="date">
                        <p>Added</p>
                      </div>
                      <div className="added">
                        <p>23/09/2022</p>
                      </div>
                    </div>
                    <div className="added-date">
                      <div className="date">
                        <p>Added</p>
                      </div>
                      <div className="added">
                        <p>23/09/2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="account-sub-edits">
            <div className="inside-account-sub-edits">
              <p>
                Edit Devices &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp; &nbsp;
              </p>
              <p> &nbsp;</p>
              <p> &nbsp;</p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="account-sub">
          <div className="account-sub-text">
            <p>PAYMENT HISTORY</p>
          </div>

          <div className="purchases-container">
            {accountPurchases.map(purchase => {
              return <div key={purchase.id} className="purchase-item">
                <p>Price: <b>{purchase.currency} {purchase.price}</b></p>
                <p>Purchased on {purchase.purchase_date}</p>
                <p>Ends on {purchase.end_date}</p>
                <b>{purchase.status}</b>
                {purchase.subscription_type === "autorenewal" ? <p>autorenewal</p> : <></>}
              </div>
            })}
          </div>

          {/* <div className="account-sub-info">
            <div className="sub-date">
              <div className="sub">
                <p>Monthly Susbcription - All Access Pass</p>
              </div>
              <div className="date">
                <p>23/09/2022</p>
              </div>
            </div>
            <div className="sub-date">
              <div className="sub">
                <p>Monthly Susbcription - All Access Pass</p>
              </div>
              <div className="date">
                <p>23/09/2022</p>
              </div>
            </div>
            <div className="sub-date">
              <div className="sub">
                <p>Monthly Susbcription - All Access Pass</p>
              </div>
              <div className="date">
                <p>23/09/2022</p>
              </div>
            </div>
            <div className="sub-date">
              <div className="sub">
                <p>Monthly Susbcription - All Access Pass</p>
              </div>
              <div className="date">
                <p>23/09/2022</p>
              </div>
            </div>
          </div> */}
          {/* <div className="account-sub-edits"></div> */}
          {/* <div className="account-sub-edits">
            <div className="inside-account-sub-edits payment"> */}
          {/* <p>
                View Detils &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;
              </p> */}
          {/* <p>
                View Detils &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;
              </p>
              <p>
                View Detils &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;
              </p>
              <p>
                View Detils &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;
              </p> */}
          {/* </div>
          </div> */}
        </div>
      </section>
    );
};

export default Account;
