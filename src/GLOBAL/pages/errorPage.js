import Header from "../components/Header"

import Footer from "../components/Footer"
import { NoStream } from "../../utils/assets"
import Button from "../components/buttons/Button"
import "../components/styles/error-page.scss"
const ErrorPage = ({ text }) => {
 const handleReload = () => {
    console.log("reload")
 }
    return (
        <>
            <Header />
            <section className="error-section">
            <NoStream className="error-section-img"/>
                <p className="error-text">
                    We are sorry ,we cannot find the streaming
                    content you are looking for
                </p>
                <Button className="reload-app-btn" label="Reload App" action={handleReload}/>
            </section>
            <Footer />
        </>
    )
}

export default ErrorPage