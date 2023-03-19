import { store } from "./api.js";
import { arrangeNavBar } from "./navBar.js";


export function cleanViews(){
    const navBar = document.querySelector('nav');
    store.navBar = navBar;
    navBar.remove();

    const homePageSection = document.getElementById('home-page');
    store.homePageSection = homePageSection;
    homePageSection.remove();

    const addMovieSection = document.getElementById('add-movie');
    store.addMovieSection = addMovieSection;
    addMovieSection.remove();

    const movieDetailsSection = document.getElementById('movie-example');
    store.movieDetailsSection = movieDetailsSection;
    movieDetailsSection.remove();

    const editMovieSection = document.getElementById('edit-movie');
    store.editMovieSection = editMovieSection;
    editMovieSection.remove();

    const loginFormSection = document.getElementById('form-login');
    store.loginFormSection = loginFormSection;
    loginFormSection.remove();

    const signUpFormSection = document.getElementById('form-sign-up');
    store.signUpFormSection = signUpFormSection ; 
    signUpFormSection.remove();

    const footer = document.querySelector('footer');
    store.footer = footer;
    footer.remove();
    
    const containerDiv = document.getElementById('container');
    store.containerDiv = containerDiv;
}

export async function checkResponseStatus(response){
    if(!response.ok){
        let error = await response.json();
        throw new Error(error.message);
    }
}

export function attachNavBar(container , navBar){
    container.appendChild(navBar);
}

export function initiateSection(section){
    const container = store.containerDiv;
    const navBar = store.navBar;
    const currentSection = section;
    const footer = store.footer;
    container.innerHTML = '';
    arrangeNavBar();
    attachNavBar(container, navBar);
    container.appendChild(currentSection);
    container.appendChild(footer);
}
