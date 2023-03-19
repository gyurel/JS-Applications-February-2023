import { showHome } from "./homeView.js";
import { endpoints, host, store } from "./api.js";
import { checkResponseStatus, initiateSection } from "./utils.js";


export function registerUserView(){
    const signUpFormSection = store.signUpFormSection;
    initiateSection(signUpFormSection);
 
    let registerButton = signUpFormSection.querySelector('button');
    registerButton.addEventListener('click', registerUser);
}


async function registerUser(event){
    event.preventDefault();
    const signUpFormSection = store.signUpFormSection;
    let form = signUpFormSection.querySelector('form');
    let inputs = Array.from(signUpFormSection.querySelectorAll('input'));
    let email = inputs[0].value;
    let password = inputs[1].value;
    let rePass = inputs[2].value;

    try {

        if(email == '' || password == '' || rePass == ''){
            throw new Error('All fields should be filled!');
        }

        if( password.length < 6){
            throw new Error('Password must be at least 6 charecters long!');
        }

        if(!password == rePass){
            throw new Error("Passwords doesn't match");
        }

        let data = {
            email,
            password,
        }

        let options ={
            method: 'POST',
            headers: {'Content-type': 'application-json'},
            body: JSON.stringify(data)

        }

        let registerRespons = await fetch(host + endpoints.register, options);

        if(!registerRespons.ok){
            let error = await registerRespons.json();
            throw new Error(error.message);
        }
            
        let registerData = await registerRespons.json();

        let userData = {
            'accessToken': registerData.accessToken,
            'email': registerData.email,
            'createdOn': registerData._createdOn,
            'id': registerData._id
        }

        localStorage.setItem('userData', JSON.stringify(userData));
        form.reset();
        showHome();

    } catch (error) {
        alert(error.message);
        form.reset();
        
        throw error;
        
    }
}