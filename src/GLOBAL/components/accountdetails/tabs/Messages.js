import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initGetMessages } from "../../../redux/account";

const Messages = ({ active }) => {
  const dispatch = useDispatch()
  const { messages } = useSelector(state => state.account)
  
  useEffect(() => {
    initGetMessages(dispatch)
  }, [dispatch])

  if (active === "messages")
    return (
      <>
        <section className="tab-wrapper">
          <h1>Messages</h1>
          <div>
            {messages.map(message => {
              return <div key={message.id} className={message.notification_status === 'read' ? 'message-item' : 'message-item message-unread'}>
                <h4>{message.title}</h4>
                <p>{message.message}</p>
                <div className="date-time">
                <small>{message.date}</small>
                <small>{message.time}</small>
                </div>
              </div>
            })}
          </div>
        </section>
      </>
    );
};

export default Messages;
