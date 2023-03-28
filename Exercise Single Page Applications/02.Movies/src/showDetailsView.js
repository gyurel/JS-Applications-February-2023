import { endpoints, host, likeMovie, store } from "./api.js";
import { showEditMovieView } from "./editMovieView.js";
import { showHome } from "./homeView.js";
import { checkResponseStatus, initiateSection } from "./utils.js";



export async function showMovieDetails(event){
    debugger

    try {
        let movieId = event.target.dataset.id;
        let userData = JSON.parse(localStorage.getItem('userData'));

        
        let movieResponse = await fetch(host + endpoints.details(movieId));
        

        if(!movieResponse.ok){
            let error = await response.json();
            throw new Error(error.message);
        }

        let movieData = await movieResponse.json();

        let detailsSection = store.movieDetailsSection;
        detailsSection.innerHTML = '';
    
        let currentInner = `<div class="container">
                                <div class="row bg-light text-dark">
                                    <h1>Movie title: ${movieData.title}</h1>
        
                                    <div class="col-md-8">
                                        <img
                                        class="img-thumbnail"
                                        src="${movieData.img}"
                                        alt="Movie"
                                        />
                                    </div>
                                    <div class="col-md-4 text-center">
                                        <h3 class="my-3">Movie Description</h3>
                                        <p>
                                        ${movieData.description}
                                        </p>
                                        <a class="btn btn-danger" href="javascript:void(0)" data-id="${movieId}">Delete</a>
                                        <a id="edit-link" class="btn btn-warning" href="javascript:void(0)" data-id="${movieId}">Edit</a>
                                        <a class="btn btn-primary" href="javascript:void(0)" data-id="${movieId}">Like</a>
                                        <span class="enrolled-span">Liked 1</span>
                                    </div>
                                </div>
                            </div>`;
        detailsSection.innerHTML = currentInner;

        let buttons = Array.from(detailsSection.querySelectorAll('a'));
        let deleteButton = buttons[0];
        deleteButton.addEventListener('click', deleteMovie);
        let editButton = buttons[1];
        editButton.addEventListener('click', showEditMovieView);

        
        
        let ownLikeResponse = userData ? await fetch(host + endpoints.own(movieId, userData._id)): {ok: true};
        if(!ownLikeResponse.ok){
            let error = await ownLikeResponse.json();
            throw new Error(error.message);
        }
        let ownLikeData = userData ? await ownLikeResponse.json(): false;

        let totalLikesRespons = userData ? await fetch(host + endpoints.total(movieId)): {ok: true};

        if(!totalLikesRespons.ok){
            let error = await totalLikesRespons.json();
            throw new Error(error.message);
        }

        let totalLikesData = userData ? await totalLikesRespons.json(): false;



        let likeButton = buttons[2];

        

        likeButton.addEventListener('click', likeMovie);

        // let deleteMovieDetailsButton = document.querySelector('.btn-danger');
        

        let likesSpan = detailsSection.querySelector('span[class="enrolled-span"]');


        if(userData){
            if(!(userData && (userData._id || userData.id) == movieData._ownerId)){
                deleteButton.remove();
                editButton.remove();
                if(ownLikeData.length == 1){
                    likeButton.remove();
                    likesSpan.textContent = `Liked ${totalLikesData}`;
                }else{
                    likesSpan.remove();
                }
            }else{
                likeButton.remove();
                likesSpan.textContent = `Liked ${totalLikesData}`;
            }

        }else{
            deleteButton.remove();
            editButton.remove();
            likesSpan.remove();
            likeButton.remove();
        }
        
    
        

        initiateSection(detailsSection);    

        async function deleteMovie(event){
            try {
                let movieId = event.target.dataset.id;
                let userData = JSON.parse(localStorage.getItem('userData'));

                let deleteRespons = await fetch(host + endpoints.delete(movieId), {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application-json',
                        'X-Authorization': userData.accessToken
                    }
                });
    
                if(!deleteRespons.ok){
                    let error = await deleteRespons.json();
                    throw new Error(error.message);
                }
    
                showHome();
                
            } catch (error) {
                alert(error.message);
                throw error;
            }
        }

        async function likeMovie(event){
            try {
                let movieId = event.target.dataset.id;
                let userData = JSON.parse(localStorage.getItem('userData'));

                let data = {
                    movieId,
                    _ownerId: userData._ownerId
                }

                let likeResponse = await fetch(host + endpoints.like, {
                    method: 'POST', 
                    headers: {
                        'Content-type': 'application-json',
                        'X-Authorization': userData.accessToken
                    },
                    body: JSON.stringify(data)
                });
    
                if(!likeResponse.ok){
                    let error = await likeResponse.json();
                    throw new Error(error.message);
                }

                await likeResponse.json();

                let totalLikesRespons = await fetch(host + endpoints.total(movieId));

                if(!totalLikesRespons.ok){
                    let error = await totalLikesRespons.json();
                    throw new Error(error.message);
                }

                let totalLikesData = await totalLikesRespons.json();
                
                
                likeButton.remove();
                likesSpan.textContent = `Liked ${totalLikesData}`;
                
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
