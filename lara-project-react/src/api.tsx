import axios from "axios";

export const baseUrl = "http://lara-project-api.test/"
export const baseUrlApi = "http://lara-project-api.test/api/"


export const api = axios.create({
    baseURL: baseUrlApi,
    headers: {
        "Content-Type": "application/json",

    }
});

api.interceptors.request.use(function (config){
    config.headers.Authorization = "Bearer " + localStorage.getItem("lara_token");
    return config;
});