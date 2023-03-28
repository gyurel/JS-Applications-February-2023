import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllAlbums } from "../data/albums.js";
import { detailsPage } from "./details.js";


//TODO Replace with actual view
const dashboardTemplate = (albums) => html`
    <section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
          ${albums.length > 0 ? albums.map(albumCard): html`<h2>There are no albums added yet.</h2>`}
      </section>`;

function albumCard(album){
    return html`
        <li class="card">
            <img src=${album.imageUrl} alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${album.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
            <a class="details-btn" href="/dashboard/${album._id}">Details</a>
        </li>`;
}


export async function dashboardPage(ctx){
    let albums = await getAllAlbums();
    ctx.render(dashboardTemplate(albums));
}