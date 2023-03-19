import { showHome } from "./homeView.js";
import { loginUserView } from "./loginView.js";
import { logoutUser } from "./logout.js";
import { registerUserView } from "./registerView.js";
import { store } from "./api.js";

export function arrangeNavBar(){
    let navBar = store.navBar;
    let homeLink = navBar.querySelector('.navbar-brand');
    homeLink.addEventListener('click', showHome);

    let navBarArr = Array.from(navBar.querySelectorAll('nav li'));

    let welcomeMail = navBarArr[0];
    let logout = navBarArr[1];
    logout.addEventListener('click', logoutUser);
    let login = navBarArr[2];
    login.addEventListener('click', loginUserView)
    let register = navBarArr[3];
    register.addEventListener('click', registerUserView);

    let userData = JSON.parse(localStorage.getItem('userData'));

    login.style.display  = 'block';
    register.style.display = 'block';
    welcomeMail.style.display = 'block';
    logout.style.display = 'block';

    if(userData){
        let mailElement = welcomeMail.firstElementChild;
        mailElement.textContent = `Welcome, ${userData.email}`;
        login.style.display  = 'none';
        register.style.display = 'none';
    }else{
        welcomeMail.style.display = 'none';
        logout.style.display = 'none';
    }
}
