import axios from "axios";
import { fetchPackageReducer, paymentInitiatedReducer, purchaseHistoryReducer, premiumSubReducer } from "./slice/subscriptionSlice";
import { store } from "../redux/store";
import { ERROR_MESSAGES, TOAST } from '../../utils/constants'
import { checkActiveSubscription } from "../../utils/activeSubs";
export const purchasePackage = async (product_id, subscriber_uid) => {

    try {
        store.dispatch(fetchPackageReducer(true))
        // API URL
        const url = "https://tvanywhereonline.com/cm/api/purchase/?operator_uid=afriplaymtnghana";

        // Request headers
        const headers = {
            'Password': process.env.REACT_APP_API_PASSWORD,
            'Content-Type': 'application/json'
        };

        // Request body
        const body = {
            subscriber_uid: subscriber_uid,
            subscription_type: 'one-off',
            bill: false,
            product_id: product_id,
            medium: 'web'
        };

        // Making POST request using Axios with async/await
        const response = await axios.post(url, body, { headers });
        if (response.data.status === "ok") {
            store.dispatch(paymentInitiatedReducer(response.data.payment_status));
            window.location.href = '/home'
        }
        store.dispatch(fetchPackageReducer(false))

    } catch (error) {
        store.dispatch(fetchPackageReducer(false))
        TOAST.error(ERROR_MESSAGES.SUBSCRIPTION.subscriptionFailed)
        // console.error('An error occurred:', error.message);
    }
}

export const fetchPurchaseHistory = async (dispatch, active) => {
    try {
        // API URL
        const selectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'))
        const subscriber_uid = window.localStorage.getItem('afri_username')
        const operator_uid = selectedOperator.operator_uid
        const url = `https://tvanywhereonline.com/cm/api/orders/?operator_uid=${operator_uid}&subscriber_uid=${subscriber_uid}&limit=30&status=${active}`;

        // Request headers
        const headers = {
            'Password': process.env.REACT_APP_API_PASSWORD,
            'Content-Type': 'application/json'
        };

        
        // Making POST request using Axios with async/await
        const response = await axios.get(url, { headers });

        if (response.data.status === "ok") {
            dispatch(purchaseHistoryReducer(response.data.data))
            const premiumSub = checkActiveSubscription(response.data.data)

            dispatch(premiumSubReducer(premiumSub))
        }   


    } catch (error) {
        // console.error('An error occurred:', error.message);
    }
}

export const cancelSubscription = async (product_id) => {
    store.dispatch(fetchPackageReducer(true))
    try {
        // API URL
        const selectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'))
        const subscriber_uid = window.localStorage.getItem('afri_username')
        const operator_uid = selectedOperator.operator_uid
        const url = `https://tvanywhereonline.com/cm/api/purchase/?operator_uid=${operator_uid}&method=delete`

        // Request headers
        const headers = {
            'Password': process.env.REACT_APP_API_PASSWORD,
            'Content-Type': 'application/json'
        };
        
        // Request body
        const body = {
            "subscriber_uid": subscriber_uid,
            "product_id": product_id,
            "medium": "web"
        }
        
        // Making POST request using Axios with async/await
        const response = await axios.post(url, body, { headers });
        // console.log(`cancel sub response1: ${JSON.stringify(response)}`)
        // console.log(response)
        if (response.data.status === "ok") {
            const url = `https://tvanywhereonline.com/cm/api/purchase/?operator_uid=${operator_uid}&method=update`
            const response = await axios.post(url, body, { headers });
            if (response.data.status === "ok") {
                window.location.href = '/home'
                store.dispatch(fetchPackageReducer(false))
            }
            
            // dispatch(purchaseHistoryReducer(response.data.data))
            

        }
        

    } catch (error) {
        TOAST.error(ERROR_MESSAGES.SUBSCRIPTION.subscriptionFailed)
        // console.error('An error occurred:', error.message);
    }
}