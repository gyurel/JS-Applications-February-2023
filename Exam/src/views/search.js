import { html } from "../../node_modules/lit-html/lit-html.js";
import { getSearched } from "../data/services.js";
import { getUserData } from "../util.js";


//TODO Replace with actual view
const searchTemplate = (fruits, onSearch) => html`
        <section id="search">
            <div class="form">
            <h2>Search</h2>
            <form class="search-form">
                <input
                type="text"
                name="search"
                id="search-input"
                />
                <button @click=${onSearch} class="button-list">Search</button>
            </form>
            </div id="result-div">
                <h4>Results:</h4>
                <div class="search-result">
                    ${fruits == null ? null: fruits.length > 0 ? fruits.map(resultCard): document.querySelector('.search-result').innerHTML = html`<h4>Results:</h4><p class="no-result">No result.</p>`}
                <!--If there are matches display a div with information about every fruit-->
                </div>
            </div>
        </section>
        `;


//TODO Replace with actual card html
function resultCard(fruit){
    // let userData = getUserData();
    return html`
        <div class="fruit">
        <img src=".${fruit.imageUrl}"/>
        <h3 class="title">${fruit.name}</h3>
        <p class="description">${fruit.description}</p>
        <div class="btn-group">
        <a class="details-btn" href="/dashboard/${fruit._id}">More Info</a>
        </div>
            `;
}

let fruits = null;

export async function searchPage(ctx){
    ctx.render(searchTemplate(fruits, onSearch));

    async function onSearch(event){
        event.preventDefault();
        let queryParam = document.getElementById('search-input').value;
        if(queryParam == ''){
            return alert("Query parameter empty!"); 
        }
        debugger
        let fruits = await getSearched(queryParam);
        ctx.render(searchTemplate(fruits, onSearch));
    }
}

