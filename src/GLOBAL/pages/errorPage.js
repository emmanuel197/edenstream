import Header from "../components/Header"

import Footer from "../components/Footer"
import { NoStream } from "../../utils/assets"
import Button from "../components/buttons/Button"
import "../components/styles/error-page.scss"
import { useLocation } from "react-router-dom"

const ErrorPage = ({ text }) => {
 
    return (
        <>
            <Header />
            <ErrorComponent/>
            <Footer />
        </>
    )
}

export const ErrorComponent = () => {
    const handleReload = () => {
        window.location.reload();
 }
 const location = useLocation()
    return (
       <section className="error-section">
            <NoStream className="error-section-img"/>
                <p className="error-text">
                    We are sorry ,we cannot find the streaming
                    content you are looking for
                </p>
               <Button className="reload-app-btn" label="Reload App" action={handleReload}/>
            </section>
    )
}
export default ErrorPage