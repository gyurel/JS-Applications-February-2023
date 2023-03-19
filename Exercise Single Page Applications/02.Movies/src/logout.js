// import { showHome } from "./homeView.js";
import { endpoints, host, store } from "./api.js";
import { checkResponseStatus } from "./utils.js";
import { loginUserView } from "./loginView.js";


export async function logoutUser(){
    let userData = JSON.parse(localStorage.getItem('userData'));

    let options = {
        method: 'get',
        headers: {
            // 'Content-type': 'application-json',
            'X-Authorization': userData.accessToken,
        }
    }

    try {
        let logoutResponse = await fetch(host + endpoints.logout, options);

        checkResponseStatus(logoutResponse);

        localStorage.removeItem('userData');

        loginUserView();

    } catch (error) {
        alert(error.message);
        throw error;
    }
}
