import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllObj } from "../data/services.js";


//TODO Replace with actual view
const dashboardTemplate = (albums) => html`
      <h2>Products</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${albums.length > 0 ? albums.map(objCard): html`<h2>No products yet.</h2>`}

        </section>`;


//TODO Replace with actual card html
function objCard(obj){
    return html`
        <div class="product">
            <img src=${obj.imageUrl} alt="example1" />
            <p class="title">
              ${obj.name}
            </p>
            <p><strong>Price:</strong><span class="price">${obj.price}</span>$</p>
            <a class="details-btn" href="/dashboard/${obj._id}">Details</a>
          </div>`;
}


export async function dashboardPage(ctx){
    let obj = await getAllObj();
    ctx.render(dashboardTemplate(obj));
}