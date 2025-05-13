import axios from "axios";
import { refresh_token } from "../GLOBAL/constants/refreshToken";

const interceptResponse = () => {
    axios.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        if (error.response.status === 401) refresh_token()
        return Promise.reject(error);
    });
}

export default interceptResponse