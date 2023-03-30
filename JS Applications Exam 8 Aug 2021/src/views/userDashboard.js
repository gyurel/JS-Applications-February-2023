import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserObjects } from "../data/services.js";
import { getUserData } from "../util.js";


//TODO Replace with actual view
const dashboardTemplate = (objList) => html`
        <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            <ul class="my-books-list">
                ${objList.length > 0 ? objList.map(objCard): html`<p class="no-books">No books in database!</p>`}
            </ul>
            <!-- Display paragraph: If the user doesn't have his own books  -->
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


export async function userDashboardPage(ctx){
    let userData = getUserData();
    let userSpecificObjs = await getUserObjects(userData._id);
    debugger
    ctx.render(dashboardTemplate(userSpecificObjs));
}