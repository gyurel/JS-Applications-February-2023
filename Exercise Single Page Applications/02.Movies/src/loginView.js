import { showHome } from "./homeView.js";
import { endpoints, host, store } from "./api.js";
import { checkResponseStatus, initiateSection } from "./utils.js";



export function loginUserView(){
    const loginView = store.loginFormSection;
    initiateSection(loginView);

    const loginButton = container.querySelector('button');
    loginButton.addEventListener('click', loginUser);
}


async function loginUser(event){
    event.preventDefault();
    const container = store.containerDiv;
    const form = container.querySelector('form');
    
    let formData = new FormData(form);

    let {email, password} = Object.fromEntries(formData);

    try {

        if(email == '' || password == ''){
            throw new Error('All fields should be filled!');
        }

        const data = {
            email,
            password,
        }

        const options ={
            method: 'POST',
            headers: {'Content-type': 'application-json'},
            body: JSON.stringify(data)

        }

        let loginResponse = await fetch(host + endpoints.login, options);

        if(!loginResponse.ok){
            let error = await loginResponse.json();
            throw new Error(error.message);
        }

        let loginData = await loginResponse.json();

        localStorage.setItem('userData', JSON.stringify(loginData));

        form.reset();

        showHome();

    } catch (error) {
        alert(error.message);
        form.reset();
        throw error;
    }
}