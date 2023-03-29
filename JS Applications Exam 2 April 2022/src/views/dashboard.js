import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllObj } from "../data/services.js";


//TODO Replace with actual view
const dashboardTemplate = (objects) => html`
      <section id="dashboard">
          <h2 class="dashboard-title">Services for every animal</h2>
          <div class="animals-dashboard">
              ${objects.length > 0 ? objects.map(objCard): html`<div><p class="no-pets">No pets in dashboard</p></div>`}
          </div>
      </section>`;


//TODO Replace with actual card html
function objCard(obj){
    return html`
        <div class="animals-board">
            <article class="service-img">
                <img class="animal-image-cover" src=${obj.image}>
            </article>
            <h2 class="name">${obj.name}</h2>
            <h3 class="breed">${obj.breed}</h3>
            <div class="action">
                <a class="btn" href="/dashboard/${obj._id}">Details</a>
            </div>
        </div>`;
}


export async function dashboardPage(ctx){
    let objects = await getAllObj();
    ctx.render(dashboardTemplate(objects));
}