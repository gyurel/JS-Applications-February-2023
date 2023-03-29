import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllObj } from "../data/services.js";


//TODO Replace with actual view
const dashboardTemplate = (albums) => html`
    <section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
          ${albums.length > 0 ? albums.map(objCard): html`<h2>There are no albums added yet.</h2>`}
      </section>`;


//TODO Replace with actual card html
function objCard(obj){
    return html`
        <li class="card">
            <img src=${obj.imageUrl} alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${obj.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${obj.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${obj.sales}</span></p>
            <a class="details-btn" href="/dashboard/${obj._id}">Details</a>
        </li>`;
}


export async function dashboardPage(ctx){
    let obj = await getAllObj();
    ctx.render(dashboardTemplate(obj));
}