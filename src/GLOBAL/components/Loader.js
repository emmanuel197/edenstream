import { Audio } from "react-loader-spinner"
import "../components/styles/loader.scss"

const Loader = () => {
    return (
        <>
            <section className="loader-wrapper">
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="gold"
                    ariaLabel="loading"
                />
            </section>
        </>
    )
}

export default Loader