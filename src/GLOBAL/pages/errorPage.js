import Header from "../components/Header"

import Footer from "../components/Footer"
import { NoStream } from "../../utils/assets"
import Button from "../components/buttons/Button"
import "../components/styles/error-page.scss"
import { useNavigate } from "react-router-dom"

const ErrorPage = ({ message }) => {
 
    return (
        <>
            <Header />
            <ErrorComponent message={message}/>
            <Footer />
        </>
    )
}

export const ErrorComponent = ({message}) => {
    const handleReload = () => {
        window.location.reload();
 }
 
 const navigate = useNavigate()
 const handleSubscribe = () => {
    navigate("/subscription")
 }
    return (
       <section className="error-section">
            <NoStream className="error-section-img"/>
                <p className="error-text">
                    {message || "We are sorry ,we cannot find the streaming content you are looking for"}
                </p>
               {message ? <Button className="reload-app-btn" label="Subscribe" action={handleSubscribe}/>:<Button className="reload-app-btn" label="Reload App" action={handleReload}/>}
            </section>
    )
}
export default ErrorPage