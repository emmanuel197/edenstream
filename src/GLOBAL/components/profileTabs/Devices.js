import { useEffect } from "react"
import { fetchUserDevices } from "../../redux/account"

const Devices = ({ active }) => {

    useEffect(() => {
        const init = async () => {
            await fetchUserDevices()
        }
        init()
    }, [])


    if (active === 'devices') return (
        <></>
    )
    return <></>
}

export default Devices