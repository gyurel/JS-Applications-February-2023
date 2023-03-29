import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}


// Rearrange user object according to tasks requirements
export async function login(email, password){
    const result = await post(endpoints.login, { email, password});
    setUserData(result);
}

export async function register(email, password){
    const result = await post(endpoints.register, {email, password});
    setUserData({'accessToken': result.accessToken, 'email': result.email, '_id': result._id});
}

export async function logout(){
    get(endpoints.logout);
    clearUserData();
}