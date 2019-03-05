import apiCall from "./api";
import storage from "./storage";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "./constants";
import {serverUrl} from "./constants";

class Auth {

    constructor() {
        this.domain = serverUrl;
    }

    login = async (email, password) => {

        try {

            const {data} = await apiCall({
                url: "/users/login",
                payload: {
                    email,
                    password
                },
                method: "POST",
                withAuth: false
            });

            this.setToken(data.token);

            return data;
        }
        catch (err) {
            console.log("Error", err);
        }
    };

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    isTokenExpired = (token) => {
        const options = {
            expiresIn: "2d",
            issuer: "barfly"
        };

        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            const decoded = jwt.verify(token, JWT_SECRET, options);

            return decoded.exp < Date.now() / 1000;

        }
        catch (err) {
            return false;
        }
    };

    setToken = (idToken) => {
        // Saves user token to localStorage
        storage.setItem("id_token", idToken);
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        return storage.getItem("id_token");
    };

    logout = () => {
        storage.removeItem("id_token");
    };

    getProfile = () => {

        const options = {
            expiresIn: "2d",
            issuer: "barfly"
        };

        return jwt.verify(this.getToken(), JWT_SECRET, options);
    };

    _chechStatus = (response) => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}

export default new Auth();
