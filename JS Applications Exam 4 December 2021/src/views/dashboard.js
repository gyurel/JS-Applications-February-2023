import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllObj } from "../data/services.js";
import { getUserData } from "../util.js";


//TODO Replace with actual view
const dashboardTemplate = (albums) => html`
        <section id="catalogPage">
            <h1>All Albums</h1>
            
            <!--No albums in catalog-->
            ${albums.length > 0 ? albums.map(objCard): html`<p>No Albums in Catalog!</p>`}

        </section>`;


//TODO Replace with actual card html
function objCard(obj){
    let userData = getUserData();
    return html`
            <div class="card-box">
                <img src=${obj.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${obj.name}</p>
                        <p class="artist">Artist: ${obj.artist}</p>
                        <p class="genre">Genre: ${obj.genre}</p>
                        <p class="price">Price: ${obj.price}</p>
                        <p class="date">Release Date: ${obj.releaseDate}</p>
                    </div>
                    ${userData ? html`
                    <div class="btn-group">
                        <a href="/dashboard/${obj._id}" id="details">Details</a>
                    </div>`: null}
                    
                </div>
            </div>`;
}

export async function dashboardPage(ctx){
    let obj = await getAllObj();
    ctx.render(dashboardTemplate(obj));
}