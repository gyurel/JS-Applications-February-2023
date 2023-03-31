import { html } from "../../node_modules/lit-html/lit-html.js";
import { getSearched } from "../data/services.js";
import { getUserData } from "../util.js";


//TODO Replace with actual view
const searchTemplate = (albums, onSearch) => html`
         <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
            <div class="search-result">
                ${albums == null ? null: albums.length > 0 ? albums.map(resultCard): html`<p class="no-result">No result.</p>`}
            </div>
        </section>`;


//TODO Replace with actual card html
function resultCard(album){
    let userData = getUserData();
    return html`
        <!--If have matches-->
        <div class="card-box">
                <img src=${album.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                    ${userData ? html`
                    <div class="btn-group">
                        <a href="/dashboard/${album._id}" id="details">Details</a>
                    </div>`: null}
                </div>
            </div>`;
}

let albums = null;

export async function searchPage(ctx){
    ctx.render(searchTemplate(albums, onSearch));

    async function onSearch(){
        let queryParam = document.getElementById('search-input').value;
        debugger
        let albums = await getSearched(queryParam);
        debugger
        ctx.render(searchTemplate(albums, onSearch));
    }
}

