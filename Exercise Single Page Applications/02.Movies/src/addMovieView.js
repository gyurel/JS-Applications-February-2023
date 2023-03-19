import { endpoints, host, store } from "./api.js";
import { showHome } from "./homeView.js";
import { checkResponseStatus, initiateSection } from "./utils.js";

export function addMoveView(){
    const addMovieSection = store.addMovieSection;
    initiateSection(addMovieSection);

    const submitMovieButton = addMovieSection.querySelector('button');
    submitMovieButton.addEventListener('click', addMovie);
}


async function addMovie(e){
    e.preventDefault();
    const addMovieSection = store.addMovieSection;
    let form = addMovieSection.querySelector('form');
    let formData = new FormData(form);
    let {title, description, img} = Object.fromEntries(formData);

    try {
        if(title == '' || description == '' || img == ''){
            throw new Error('All fields should be filled!');
        }

        let accessToken = JSON.parse(localStorage.getItem('userData')).accessToken;

        let data = {
            title,
            description,
            img
        }

        let options = {
            method: 'POST',
            headers: {'Content-type': 'application-json', 'X-Authorization': accessToken},
            body: JSON.stringify(data)
        }

        let addMovieResponse = await fetch(host + endpoints.create, options);

        checkResponseStatus(addMovieResponse);

        let addMovieData = await addMovieResponse.json();

        form.reset();
        showHome();
        
    } catch (error) {
        alert(error.message);
        throw error;
        
    }
    

}