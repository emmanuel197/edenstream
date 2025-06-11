import axios from "axios";
import Cookies from "universal-cookie";
import { COOKIES, LOG_MESSAGES } from "../../utils/constants";
import { logAPI } from "../constants/apis";
import { getFAQs, getMessages, getPurchases } from "./slice/accountSlice";
import { format } from 'date-fns';
import { TOAST, EMAIL_REGEXP } from '../../utils/constants';
const cookies = new Cookies();
const user_info = cookies.get("user_info");

export const sendLog = async (data) => {
    const { action, content_uid, content_type, content_name, duration, instance } = data

    try {

        let logMessage
        let deviceInfoCookie = COOKIES.get("device_info")
        let device_id = COOKIES.get("device")
        let user_uid = window.localStorage.getItem("afri_username")
        let device_platform = deviceInfoCookie.os.name
        let device_name = deviceInfoCookie.browser.name
        let durationInt = 0

        if (action === 'logout') logMessage = LOG_MESSAGES.logout
        if (action === 'search') logMessage = LOG_MESSAGES.search
        if (action === 'login') logMessage = LOG_MESSAGES.login
        if (action === 'quit') logMessage = LOG_MESSAGES.quit

        if (action === 'play' && content_type === 'movie') logMessage = LOG_MESSAGES.playMovie
        if (action === 'play' && content_type === 'series') logMessage = LOG_MESSAGES.playSeries
        if (action === 'play' && (content_type !== 'series' && content_type !== 'movie')) logMessage = LOG_MESSAGES.playMovie

        if (action === 'visit' && instance === 'NG') logMessage = LOG_MESSAGES.visitLandingNG
        if (action === 'visit' && instance === 'GH') logMessage = LOG_MESSAGES.visitLandingGH
        if (action === 'visit' && (instance !== 'GH' && instance !== 'NG')) logMessage = LOG_MESSAGES.visitLandingGlobal

        if (duration) {
            duration.replace(',', '')
            durationInt = Number(duration)
        }

        const requestData = {
            "subscriber_uid": user_uid || 'anonymous',
            "device_id": device_id,
            "device_type": deviceInfoCookie.device.vendor || "Desktop",
            "device_name": device_name,
            "platform": device_platform,
            "action": action,
            "content_uid": content_uid,
            "content_type": content_type,
            "content_name": content_name,
            "content_details": logMessage,
            "duration": durationInt,
            "medium": "Web"
        }

        const logResponse = await axios.post(logAPI(), requestData)

        // console.warn('log request data: ', requestData)
        // console.warn('log response: ', logResponse.data)


    } catch (e) {
        // console.warn('log error:', e.message)
    }

}


export const logout = async () => {
    try {
        const { access_token } = user_info?.data?.data || {};
        if (access_token) {
            await axios.post(
                `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/logout`,
                {},
                { headers: { Authorization: `Bearer ${access_token}` } }
            );
        }
    } catch (error) {
        // console.error('Logout error:', error.message);
    } finally {
        clearStorage();
    }
};

const clearStorage = async () => {
    window.localStorage.clear()
    cookies.remove('user_info', { path: '/' }); // Ensure path matches the one used during setting
    cookies.remove('device_info', { path: '/' });
    cookies.remove('device', { path: '/' });
    cookies.remove('afri_msisdn', { path: '/' });
    window.location.href = '/'
    
}

export const initGetPurchases = (dispatch) => {
    // const cookies = new Cookies()
    // const user_info = cookies.get('user_info')
    const { operator_uid } = user_info.data.data

    // const operator_uid = 'glotv'
    const subscriber_uid = 'g08156676289'

    var config = {
        method: 'get',
        url: `https://tvanywhereonline.com/cm/api/orders/?operator_uid=${operator_uid}&subscriber_uid=${subscriber_uid}&limit=30&status=Active`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            dispatch(getPurchases(response.data.data))
        })
        .catch(function (error) {
            // console.log(error);
        });
}

export const fetchUserDevices = async () => {
    try {
        // const operator_uid = 'glotv'
        const subscriber_uid = 'g08156676289'

        const { access_token, user_id, operator_uid } = user_info.data.data

        // const response = await axios.get(`https://tvanywhereonline.com/api/client/v1/${operator_uid}/users/${user_id}/devices?operator_uid=${operator_uid}&subscriber_uid=${subscriber_uid}&limit=30&status=Active`)

        const response = await axios.get(`https://tvanywhereonline.com/api/client/v1/${operator_uid}/users/${user_id}/devices`)

        // console.log("DEVICES ----", response.data.data)

        if (response.data.status === "ok") return response.data.data

    } catch (e) {
        // console.error('fetchUserDevices', e.message)
    }
}

export const initGetMessages = (dispatch) => {
    const selectedOperator = window.localStorage.getItem("afri_selected_operator")
    const operator_uid = JSON.parse(selectedOperator).operator_uid
    const subscriber_uid = window.localStorage.getItem("afri_username")

    var config = {
        method: 'get',
        url: `https://tvanywhereonline.com/cm/api/inbox/?operator_uid=${operator_uid}&subscriber_uid=${subscriber_uid}`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            dispatch(getMessages(response.data.data))
        })
        .catch(function (error) {
            // console.log(error);
        });
}

export const initGetFAQs = (dispatch) => {
    const selectedOperator = window.localStorage.getItem("afri_selected_operator")
    const operator_uid = JSON.parse(selectedOperator).operator_uid
    

    var config = {
        method: 'get',
        url: `https://tvanywhereonline.com/cm/api/faq/?operator_uid=${operator_uid}&translation=en&limit=30&offset=0`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            dispatch(getFAQs(response.data.data))
        })
        .catch(function (error) {
            // console.log(error);
        });
}

export const updateProfile = (firstName, lastName, gender, dob) => {
    console.log('[updateProfile] gender:', gender);
    console.log('[updateProfile] dob before format:', dob);
    let formattedDob = dob;
    if (dob) {
        const dateObj = typeof dob === 'string' ? new Date(dob) : dob;
        formattedDob = format(dateObj, 'yyyy-MM-dd');
    }
    console.log('[updateProfile] dob after format:', formattedDob);
    let username = window.localStorage.getItem('afri_username')
    let { operator_uid, access_token } = user_info.data.data

    var config = {
        method: 'put',
        url: `https://tvanywhereonline.com/cm/api/subscriber/?operator_uid=${operator_uid}&subscriber_uid=${username}`,
        data: {
            "first_name": firstName,
            "last_name": lastName,
            "gender": gender,
            "date_of_birth": formattedDob,
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    };

    axios(config)
        .then(function (response) {
            // console.warn('response', response.data)
        })
        .catch(function (error) {
            // console.log(error);
        });
}

export const getProfile = async () => {
    let username = window.localStorage.getItem('afri_username')
    let { operator_uid, access_token } = user_info?.data.data
    // console.log(access_token)
    const response = await axios.get(`https://tvanywhereonline.com/cm/api/subscriber/?operator_uid=${operator_uid}&subscriber_uid=${username}&limit=30`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        }
    )

    return response.data.data[0]
}

export const addNewsletterEmail = async (email) => {
    try {
        const { operator_uid } = user_info?.data?.data || {};
        if (!operator_uid) {
            console.error("Operator UID not found.");
            TOAST.error("Operator information missing."); // Add error TOAST
            return;
        }
        console.log("Subscribing to newsletter with email:", email);
        const response = await axios.post(`https://tvanywhereonline.com/cm/api/newsletter/?operator_uid=${operator_uid}&subscriber=${email}`);
        console.log("Newsletter subscription response:", response.data);

        if (response.data && response.data.status === "ok") { // Assuming a success status in the response
            TOAST.success("Successfully subscribed to the newsletter!"); // Add success TOAST
        } else {
            // Handle cases where the API returns a non-error status but indicates failure
            TOAST.warning(response.data.message || "Failed to subscribe to the newsletter."); // Add warning TOAST
        }

        return response.data;
    } catch (error) {
        console.error("Error subscribing to newsletter:", error.response.data.message);
        TOAST.error(error.response.data.message); // Add error toast
        throw error; // Re-throw the error if needed by the caller
    }
}
