import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import checkUserAllowed from "../../utils/checkUserAllowed"
import { COOKIES } from "../../utils/constants"
import OPERATORS from "../../utils/operators"
import { errorLog } from "../logger"
import { sendLog } from "../redux/account"

const ProtectedRoute = ({ children}) => {
    const user_info = COOKIES.get("user_info")

    // TODO: uncomment when going live
    // useEffect(() => {
    //     const _check = async () => {
    //         await checkUserAllowed()
    //     }
    //     _check()
    // }, [])

    // useEffect(() => {
    //     window.addEventListener('unload', handleTabClosing)
    //     return () => {
    //         window.removeEventListener('unload', handleTabClosing)
    //     }
    // })

    // const handleTabClosing = () => {
    //     const initSendLog = async () => await sendLog({ action: 'logout' })
    //     initSendLog()
    // }

    useEffect(() => {
        //TODO: handle tab or browser close to send logs for logout event
        const handleTabClose = event => {
            // event.preventDefault()
            // const initSendLog = async () => await sendLog({ action: 'logout' })
            // initSendLog()
        }
        window.addEventListener('beforeunload', handleTabClose)
        return () => window.removeEventListener('beforeunload', handleTabClose)
    }, [])

    // if (!user_info) {
    //     errorLog('Navigating to home without user_info')
    //     // localStorage.setItem('afri_selected_operator', JSON.stringify(OPERATORS.afriplayghana))
    //     // console.warn("%%%%%%", user_info)
    //     return <Navigate replace to='/signup' />
    // } 
    
    // return <Navigate replace to='/select-network' />
    return children
}

export default ProtectedRoute