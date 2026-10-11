import axios from "axios";
import { checkToken } from "./utils/auth";

// Local
export const baseApiUrl = "http://localhost/react-project-api/api/";
export const basePath = "http://localhost/react-project-api/";


// Host
// export const baseApiUrl = "http://exmple.com/api/";
// export const baseUrl = "http://exmple.com/";

export const api = axios.create({
    baseURL: baseApiUrl,
    headers: {
        "Content-Type": "application/json",
    }  
})
api.interceptors.request.use((config) => {
    const token = checkToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});