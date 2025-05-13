import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initGetFAQs } from "../../../redux/account";

const Help = ({ active }) => {
  const dispatch = useDispatch()
  const { FAQs } = useSelector(state => state.account)

  // console.log('FAQs', FAQs)

  useEffect(() => {
    initGetFAQs(dispatch)
  }, [dispatch])

  if (active === "help")
    return (
      <>
        <section className="tab-wrapper">
          <h1>Help</h1>
          <div>
            {FAQs.map(faq => {
              return <div key={faq.position}>
                <b>{faq.question}</b>
                <p>{faq.answer}</p>
              </div>
            })}
          </div>
        </section>
      </>
    );
};

export default Help;
