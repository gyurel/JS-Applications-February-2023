document.getElementById('logout').style.display = 'none';
document.getElementById('register').style.display = 'none';
let registerForm = document.querySelector('form');
registerForm.addEventListener('submit', onRegister);

let userData = JSON.parse(localStorage.getItem('userData'));


if(userData){
    document.querySelector('span').textContent = userData.email;
}

async function onRegister(event){
    event.preventDefault();

    let formData = new FormData(event.target);

    let {email, password, rePass} = Object.fromEntries(formData);

    try {
        if([...formData.values()].some(e => e === '')){
            let error = new Error('All fields should be filled!');
            throw error;
        }

        if(password != rePass){
            let error = new Error('Passwords do not match!');
            throw error;
        }

        let userData = {
            email, 
            password
        }
    
    
        let options = {
            method: 'post',
            headers: {'Content-type': 'application-json'},
            body: JSON.stringify(userData)
        }
        
        let registerResponse = await fetch('http://localhost:3030/users/register', options);

        if(!registerResponse.ok){
            let error = await registerResponse.json();
            throw new Error(error.message);
        }

        let registerData = await registerResponse.json();

        let data = {
            'accessToken': registerData.accessToken,
            'email': registerData.email,
            'id': registerData._id
        }
    
        localStorage.setItem('userData', JSON.stringify(data));

        document.querySelector('span').textContent = userData.email;

        window.location = './index.html';
        
    } catch (error) {
        registerForm.reset();
        alert(error.message);
        throw error;
    }
}