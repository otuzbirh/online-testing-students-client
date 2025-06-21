import axios from 'axios';

const createApiClient = () => {
    const client = axios.create({
        baseURL: "https://app-testing-students.onrender.com/api/v1",
        // baseURL: "http://localhost:3000/api/v1",

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