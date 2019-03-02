import Axios from "axios";
import {serverUrl} from "./constants";
import auth from "./auth";

const getToken = async () => {
    // const jwt = await storage
};

const apiCall = async ({
    url = "",
    payload,
    method,
    headers = {},
    options = {},
    withAuth = true,
}) => {

    if (withAuth && auth.loggedIn()) {
        headers["Authorization"] = `Bearer ${auth.getToken()}`;
    }

    try {

        const response = await Axios({
            url: `${serverUrl}/api/v1${url}`,
            data: payload,
            method,
            headers: {
                ...headers,
                "Accept-Language": "tr"
            },
            ...options
        });

        return response;
    }
    catch (err) {
        throw err;
    }
};

export default apiCall;
