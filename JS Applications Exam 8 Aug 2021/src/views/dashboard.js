import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllObj } from "../data/services.js";


//TODO Replace with actual view
const dashboardTemplate = (obj) => html`
      <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            <ul class="other-books-list">
              ${obj.length > 0 ? obj.map(objCard): html`<p class="no-books">No books in database!</p>`}
            </ul>
        </section>`;


//TODO Replace with actual card html
function objCard(obj){
    return html`
        <li class="otherBooks">
            <h3>${obj.title}</h3>
            <p>Type: ${obj.type}</p>
            <p class="img"><img src=${obj.imageUrl}></p>
            <a class="button" href="/dashboard/${obj._id}">Details</a>
        </li>`;
}


export async function dashboardPage(ctx){
    let obj = await getAllObj();
    ctx.render(dashboardTemplate(obj));
}