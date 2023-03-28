import { endpoints, host, store } from "./api.js";
import { checkResponseStatus, initiateSection } from "./utils.js";
import { addMoveView } from "./addMovieView.js";
import { showMovieDetails } from "./showDetailsView.js";
// import { showView } from "./app.js";

export async function showHome(){
    
    const homePageSection = store.homePageSection;
    initiateSection(homePageSection);
    const addMovieButton = homePageSection.querySelector('#add-movie-button').firstElementChild;
    addMovieButton.addEventListener('click', addMoveView);
    
    let userData = localStorage.getItem('userData');

    if(userData){
        addMovieButton.style.display = 'inline-block';
    }else{
        addMovieButton.style.display = 'none';
    }

    try {
        let moviesResponse = await fetch(host + endpoints.catalog);

        checkResponseStatus(moviesResponse);
    
        let moviesData = await moviesResponse.json();
        

        let ulMovieList = homePageSection.querySelector('ul[id="movies-list"]');
        ulMovieList.innerHTML = '';


        for (const movie of moviesData) {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'mb-4')
            
            let currentInner = `<img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
                                <div class="card-body"> 
                                        <h4 class="card-title">${movie.title}</h4>
                                    </div>
                                    <div class="card-footer">
                                        <a href="javascript:void(0)">
                                            <button type="button" class="btn btn-info" data-id="${movie._id}">Details</button>
                                        </a>
                                </div>`
            cardDiv.innerHTML = currentInner;
            let detailsButton = cardDiv.querySelector('button');
            detailsButton.addEventListener('click', (event)=>{
                showView('movie-details', event);
            });
            
            ulMovieList.appendChild(cardDiv);
        }
        
    } catch (error) {
        alert(error.message);
        throw error;
    }
}
