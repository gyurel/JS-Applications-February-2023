import { cleanViews } from "./utils.js";
import { showHome } from "./homeView.js";
import { loginUserView } from "./loginView.js";
import { registerUserView } from "./registerView.js";
import { showMovieDetails } from "./showDetailsView.js";

let views = {
    'home-link': showHome,
    'login-link': loginUserView,
    'rigister-link': registerUserView,
    'movie-details': showMovieDetails,
}

let ctx = {
    showView
}


cleanViews();


// showHome();
showView('home-link');


export function showView(name){
    
    
    let view = views[name];
    if(typeof view == 'function'){
        view(ctx);
        
    }
}