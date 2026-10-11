
import { redirect } from "react-router";



export function checkToken() {
    const token = localStorage.getItem('bearer_token');
    if(token){
        let payload = JSON.parse(atob(token?.split(".")[1]));
        // console.log(payload);
        // console.log(payload.exp);
        if(payload.exp * 1000 < Date.now()){
            localStorage.removeItem("bearer_teoken");
            // console.log("token expired");
            return false;   
        }else{
            // console.log("token valid");
            return token;
        }
    }else{
        return false;
    }
}


export const needToLogin = () => {
    // const token = localStorage.getItem('bearer_token');
    const token = checkToken();
    if(!token) return redirect('/login');
    return null;
}

export const loggedIn = () => {
    // const token = localStorage.getItem('bearer_token');
    const token = checkToken();
    if(token) return redirect('/');
    return null;
}