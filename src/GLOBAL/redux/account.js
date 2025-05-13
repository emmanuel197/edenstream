import axios from "axios";
import Cookies from "universal-cookie";
import { COOKIES, LOG_MESSAGES } from "../../utils/constants";
import { logAPI } from "../constants/apis";
import { getFAQs, getMessages, getPurchases } from "./slice/accountSlice";

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

export const updateProfile = (firstName, lastName) => {
    let username = window.localStorage.getItem('afri_username')
    let { operator_uid, access_token } = user_info.data.data

    var config = {
        method: 'put',
        url: `https://tvanywhereonline.com/cm/api/subscriber/?operator_uid=${operator_uid}&subscriber_uid=${username}`,
        data: {
            "first_name": firstName,
            "last_name": lastName,
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

// import axios from "axios";
// import Cookies from "universal-cookie";
// import { COOKIES, LOG_MESSAGES } from "../../utils/constants";
// import { logAPI } from "../constants/apis";
// import { getFAQs, getMessages, getPurchases } from "./slice/accountSlice";

// const cookies = new Cookies();
// const user_info = cookies.get("user_info");

// const getLogMessage = (action, content_type, instance) => {
//     switch (action) {
//         case 'logout':
//             return LOG_MESSAGES.logout;
//         case 'search':
//             return LOG_MESSAGES.search;
//         case 'login':
//             return LOG_MESSAGES.login;
//         case 'quit':
//             return LOG_MESSAGES.quit;
//         case 'play':
//             return content_type === 'movie'
//                 ? LOG_MESSAGES.playMovie
//                 : LOG_MESSAGES.playSeries;
//         case 'visit':
//             if (instance === 'NG') return LOG_MESSAGES.visitLandingNG;
//             if (instance === 'GH') return LOG_MESSAGES.visitLandingGH;
//             return LOG_MESSAGES.visitLandingGlobal;
//         default:
//             return '';
//     }
// };

// export const sendLog = async (data) => {
//     const { action, content_uid, content_type, content_name, duration, instance } = data;
//     try {
//         const deviceInfoCookie = cookies.get("device_info");
//         const device_id = cookies.get("device");
//         const user_uid = window.localStorage.getItem("afri_username") || 'anonymous';
//         const logMessage = getLogMessage(action, content_type, instance);
//         const durationInt = duration ? Number(duration.replace(',', '')) : 0;

//         const requestData = {
//             subscriber_uid: user_uid,
//             device_id: device_id,
//             device_type: deviceInfoCookie?.device?.vendor || "Desktop",
//             device_name: deviceInfoCookie?.browser?.name || "Unknown Browser",
//             platform: deviceInfoCookie?.os?.name || "Unknown OS",
//             action: action,
//             content_uid: content_uid,
//             content_type: content_type,
//             content_name: content_name,
//             content_details: logMessage,
//             duration: durationInt,
//             medium: "Web",
//         };

//         const logResponse = await axios.post(logAPI(), requestData);
        // console.warn('log request data: ', requestData);
        // console.warn('log response: ', logResponse.data);

//     } catch (e) {
        // console.warn('log error:', e.message);
//     }
// };



// const clearStorage = () => {
//     window.localStorage.clear();
//     cookies.remove('user_info');
//     cookies.remove('device_info');
//     cookies.remove('device');
//     cookies.remove('afri_msisdn');
//     window.location.href = '/';
// };

// export const initGetPurchases = async (dispatch) => {
//     const { operator_uid } = user_info?.data?.data || {};
//     const subscriber_uid = 'g08156676289';
    
//     try {
//         const response = await axios.get(
//             `https://tvanywhereonline.com/cm/api/orders/?operator_uid=${operator_uid}&subscriber_uid=${subscriber_uid}&limit=30&status=Active`
//         );
//         dispatch(getPurchases(response.data.data));
//     } catch (error) {
        // console.error('initGetPurchases error:', error.message);
//     }
// };

// export const fetchUserDevices = async () => {
//     try {
//         const { access_token, user_id, operator_uid } = user_info?.data?.data || {};
//         const response = await axios.get(
//             `https://tvanywhereonline.com/api/client/v1/${operator_uid}/users/${user_id}/devices`
//         );

//         if (response.data.status === "ok") {
//             return response.data.data;
//         }
//     } catch (e) {
        // console.error('fetchUserDevices error:', e.message);
//     }
// };

// export const initGetMessages = async (dispatch) => {
//     const selectedOperator = window.localStorage.getItem("afri_selected_operator");
//     const { operator_uid } = JSON.parse(selectedOperator) || {};
//     const subscriber_uid = window.localStorage.getItem("afri_username");

//     try {
//         const response = await axios.get(
//             `https://tvanywhereonline.com/cm/api/inbox/?operator_uid=${operator_uid}&subscriber_uid=${subscriber_uid}`
//         );
//         dispatch(getMessages(response.data.data));
//     } catch (error) {
        // console.error('initGetMessages error:', error.message);
//     }
// };

// export const initGetFAQs = async (dispatch) => {
//     const selectedOperator = window.localStorage.getItem("afri_selected_operator");
//     const { operator_uid } = JSON.parse(selectedOperator) || {};

//     try {
//         const response = await axios.get(
//             `https://tvanywhereonline.com/cm/api/faq/?operator_uid=${operator_uid}&translation=en&limit=30&offset=0`
//         );
//         dispatch(getFAQs(response.data.data));
//     } catch (error) {
        // console.error('initGetFAQs error:', error.message);
//     }
// };

// export const updateProfile = async (firstName, lastName) => {
//     let username = window.localStorage.getItem('afri_username');
//     let { operator_uid, access_token } = user_info?.data?.data || {};

//     try {
//         const response = await axios.put(
//             `https://tvanywhereonline.com/cm/api/subscriber/?operator_uid=${operator_uid}&subscriber_uid=${username}`,
//             { first_name: firstName, last_name: lastName },
//             { headers: { Authorization: `Bearer ${access_token}` } }
//         );
        // console.warn('Profile updated:', response.data);
//     } catch (error) {
        // console.error('updateProfile error:', error.message);
//     }
// };

// export const getProfile = async () => {
//     let username = window.localStorage.getItem('afri_username');
//     let { operator_uid, access_token } = user_info?.data?.data || {};

//     try {
//         const response = await axios.get(
//             `https://tvanywhereonline.com/cm/api/subscriber/?operator_uid=${operator_uid}&subscriber_uid=${username}&limit=30`,
//             { headers: { Authorization: `Bearer ${access_token}` } }
//         );
//         return response.data.data[0];
//     } catch (error) {
        // console.error('getProfile error:', error.message);
//     }
// };
