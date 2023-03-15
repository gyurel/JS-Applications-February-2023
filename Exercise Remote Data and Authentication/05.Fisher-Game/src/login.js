// document.querySelector('a[id="login"]').style.display = 'none';

let userData = JSON.parse(localStorage.getItem('userData'));

if(!userData){
    document.querySelector('a[id="logout"]').style.display = 'none';
}

let loginForm = document.querySelector('form');
loginForm.addEventListener('submit', loginUser);


export async function loginUser(e){
    e.preventDefault();

    let formData = new FormData(e.target);

    let {email, password} = Object.fromEntries(formData);

    let userCredentials = {
        email,
        password
    }

    let options = {
        method: 'POST',
        headers: {'Content-type': 'application-json'},
        body: JSON.stringify(userCredentials)
    }

    try {
        let loginResponse = await fetch('http://localhost:3030/users/login', options);

        if(!loginResponse.ok){
            let error = await loginResponse.json();
            throw new Error(error.message);
        }
    
        let loginData = await loginResponse.json();

        let data = {
            'accessToken': loginData.accessToken,
            'email': loginData.email,
            'id': loginData._id
        }
        
        localStorage.setItem('userData', JSON.stringify(data));

        window.location = './index.html'

    } catch (error) {
        loginForm.reset();
        alert(error.message);
        throw error;
    }
}


