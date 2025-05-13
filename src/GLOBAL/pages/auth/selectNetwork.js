import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import checkUserAllowed from "../../../utils/checkUserAllowed"
import OPERATORS from "../../../utils/operators"
import Button from "../../components/buttons/Button"
import Footer from "../../components/Footer"
import Header from "../../components/Header"

const SelectNetwork = () => {
    const navigate = useNavigate()
    const [selectedNetwork, setSelectedNetwork] = useState('')
    const [networkSelected, setNetworkSelected] = useState(false)

    const initSetSelectedNetwork = (name) => {
        setNetworkSelected(true)
        setSelectedNetwork(name)
        if (name === 'MTN') localStorage.setItem('afri_selected_operator', JSON.stringify(OPERATORS.edenstream))
        else localStorage.setItem('afri_selected_operator', JSON.stringify(OPERATORS.edenstream))
    }

    useEffect(() => {
        const _check = async () => {
            await checkUserAllowed(false)
        }
        _check()
    }, [])

    return (
        <>
            <Header links={1} signup={5} />
            <div className="auth">
                <div className="auth-wrapper">
                    <div className="auth-container">
                        <div className="form-container">
                            <h2> Select your network </h2>
                            <ul className="network-container">
                                <li className={selectedNetwork === 'MTN' ? 'selected-network' : ''} onClick={() => initSetSelectedNetwork('MTN')}>MTN</li>
                                <li className={selectedNetwork === 'OTHERS' ? 'selected-network' : ''} onClick={() => initSetSelectedNetwork('OTHERS')}>OTHERS</li>
                            </ul>
                            {networkSelected ? <Button action={() => navigate('/signup')} label="Continue" /> : <></>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </ >
    )
}

export default SelectNetwork