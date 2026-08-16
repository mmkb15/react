import axios from "axios";

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