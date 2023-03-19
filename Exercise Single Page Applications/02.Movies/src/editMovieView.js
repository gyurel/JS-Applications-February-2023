import { endpoints, host, store } from "./api.js";
import { showMovieDetails } from "./showDetailsView.js";
import { checkResponseStatus, initiateSection } from "./utils.js";

export async function showEditMovieView(event){
    
    try {
        let movieId = event.target.dataset.id;
    
        let editMovieSection = store.editMovieSection;
        initiateSection(editMovieSection);

        let form = editMovieSection.querySelector('form');
        // form.addEventListener('submit', editMovie);
        let submitButton = form.querySelector('button');
        submitButton.addEventListener('click', editMovie);
        submitButton.dataset.id = movieId;

        let titleField = editMovieSection.querySelector('#title');
        let descriptionField = editMovieSection.querySelector('textarea');
        let imgField = editMovieSection.querySelector('#imageUrl');
        

        let currentMovieRespons = await fetch(host + endpoints.edit(movieId));
        checkResponseStatus(currentMovieRespons);
        let movieData = await currentMovieRespons.json();
        
        titleField.value = movieData.title;
        descriptionField.value = movieData.description;
        imgField.value = movieData.img;

        async function editMovie(event){
            event.preventDefault();
            try {
                let title =  titleField.value;
                let description = descriptionField.value;
                let img = imgField.value;
                
            
                let userData = JSON.parse(localStorage.getItem('userData'));
            
                let data = {
                    title,
                    description,
                    img,
                    _id: movieId,
                    _ownerId: movieData._ownerId
                }
            
                let options = {
                    method: 'PUT',
                    headers: {'Content-type': 'application-json', 'X-Authorization': userData.accessToken},
                    body: JSON.stringify(data)
                }
            
                let editMovieResponse = await fetch(host + endpoints.edit(movieId), options);
            
                checkResponseStatus(editMovieResponse);
                
                let editMovieData = await editMovieResponse.json();
        
                showMovieDetails(event);
                
            } catch (error) {
                alert(error.message);
                throw error;
            }
        }
        
    } catch (error) {
        alert(error.message);
        throw error;
    }
    

   



}


