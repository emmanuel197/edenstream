import axios from "axios";
import { fetchPackageReducer, paymentInitiatedReducer, purchaseHistoryReducer, premiumSubReducer, activeSubscriptionReducer } from "./slice/subscriptionSlice";
import { store } from "../redux/store";
import { ERROR_MESSAGES, TOAST } from '../../utils/constants'
import { checkActiveSubscription } from "../../utils/activeSubs";
export const purchasePackage = async (product_id, subscriber_uid, email) => {

    try {
        store.dispatch(fetchPackageReducer(true))
        // API URL
        const url = "https://tvanywhereonline.com/cm/api/purchase/?operator_uid=edenstream";

        // Request headers
        const headers = {
            'Password': process.env.REACT_APP_API_PASSWORD,
            'Content-Type': 'application/json'
        };

        // Request body
        const body = {
            subscriber_uid: subscriber_uid,
            email: email,
            subscription_type: 'one-off',
            bill: false,
            product_id: product_id,
            medium: 'web'
        };

        // Debug: Log the request body
        console.log('Purchase request body:', body);

        // Making POST request using Axios with async/await
        const response = await axios.post(url, body, { headers });
        // Debug: Log the response
        console.log('Purchase response:', response);
        if (response.data.status === "ok") {
            store.dispatch(paymentInitiatedReducer(response.data.payment_status));
            window.location.href = '/home'
        }
        store.dispatch(fetchPackageReducer(false))

    } catch (error) {
        store.dispatch(fetchPackageReducer(false))
        TOAST.error(ERROR_MESSAGES.SUBSCRIPTION.subscriptionFailed)
        // Debug: Log the error
        console.error('Purchase error:', error);
    }
}

export const fetchPurchaseHistory = async (dispatch) => {
    try {
        // API URL
        const selectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'))
        const subscriber_uid = window.localStorage.getItem('afri_username')
        const operator_uid = selectedOperator.operator_uid
        const url = `https://tvanywhereonline.com/cm/api/orders/?operator_uid=${operator_uid}&subscriber_uid=${subscriber_uid}&limit=30`;

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
export const fetchActivePackages = async (dispatch, active) => {
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
            dispatch(activeSubscriptionReducer(response.data.data))
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

export const cancelAutoRenewal = async (product_id) => {
    store.dispatch(fetchPackageReducer(true)); // Indicate loading
    try {
        const selectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'));
        const operator_uid = selectedOperator.operator_uid;
        const subscriber_uid = window.localStorage.getItem('afri_username')
        console.log('Subscriber UID:', subscriber_uid);
        // API URL for updating the purchase (used for cancelling auto-renewal)
        const url = `https://tvanywhereonline.com/cm/api/purchase/?operator_uid=${operator_uid}&method=update`;

        // Request headers
        const headers = {
            'Password': process.env.REACT_APP_API_PASSWORD,
            'Content-Type': 'application/json'
        };

        // Request body - includes necessary info for the update method
        const body = {
            "subscriber_uid": subscriber_uid,
            "product_id": product_id,
            "medium": "web",
            // Assuming the API expects a field to specifically cancel auto-renewal.
            // Based on the context of the cancelSubscription function using method=update,
            // the API might infer cancellation from the method itself or require a specific flag.
            // Without explicit API docs, we'll use the same body as the second call in cancelSubscription.
            // If a specific flag is needed (e.g., "auto_renew": false), it should be added here.
        };

        console.log('Cancel Auto-Renewal request body:', body);

        // Making POST request using Axios
        const response = await axios.post(url, body, { headers });

        console.log('Cancel Auto-Renewal response:', response);

        if (response.data.status === "ok") {
            TOAST.success("Auto-renewal cancelled successfully.");
            // Optionally dispatch an action to update the local state,
            // e.g., refetch active subscriptions or update the specific subscription status
            // store.dispatch(fetchActivePackages(store.dispatch, 'active'));
        } else {
            // Handle API response indicating failure
            TOAST.warning(response.data.message || "Failed to cancel auto-renewal.");
        }

    } catch (error) {
        TOAST.error(error.response.data.message); // Use a more specific error message if available
        console.error('An error occurred while cancelling auto-renewal:', error);
    } finally {
        store.dispatch(fetchPackageReducer(false)); // Stop loading
    }
};