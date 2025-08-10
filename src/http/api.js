import axios from 'axios';

const createApiClient = () => {
    console.log("Creating API client...", process.env.NODE_ENV, process.env.REACT_APP_API_URL_LOCAL, process.env.REACT_APP_API_URL_PRODUCTION);
    const client = axios.create({
        baseURL: process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_PRODUCTION,

        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return client;
}

export function api() {
    const api = createApiClient();
    return api;
}