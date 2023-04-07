import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllObj } from "../data/services.js";


//TODO Replace with actual view
const dashboardTemplate = (albums) => html`
      <h2>Fruits</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${albums.length > 0 ? albums.map(objCard): html`<h2>No fruit info yet.</h2>`}
        </section>
         <!-- Display an h2 if there are no posts -->
         `;


//TODO Replace with actual card html
function objCard(obj){
    return html`
        <div class="fruit">
            <img src=${obj.imageUrl} alt="example1" />
            <h3 class="title">${obj.name}</h3>
            <p class="description">${obj.description}</p>
            <a class="details-btn" href="/dashboard/${obj._id}">More Info</a>
          </div>`;
}


export async function dashboardPage(ctx){
    let obj = await getAllObj();
    ctx.render(dashboardTemplate(obj));
}