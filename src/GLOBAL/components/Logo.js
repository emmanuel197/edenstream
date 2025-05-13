import '../../GLOBAL/components/styles/LogoSection.scss'
import { logoSrc } from "../../utils/assets"

const Logo = (props) => {
    const { w, h } = props
    return (
        <>
            <section className='logo-wrapper'>
                <img
                    src={logoSrc}
                    alt="afriplay-logo"
                    style={{ width: w, height: h }}
                />
            </section>
        </>
    )
}

export default Logo