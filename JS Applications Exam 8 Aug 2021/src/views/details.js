import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteObj, getObjDetails, likeAnObj, numberOfTotalLIkes, numberOfUserLikes } from "../data/services.js";
import { getUserData } from "../util.js";


//TODO Replace with actual view
const detailsTemplate = (obj, userData, userLikes, totalLIkes, onLike, onDelete) => html`
      <section id="details-page" class="details">
            <div class="book-information">
                <h3>${obj.title}</h3>
                <p class="type">Type: ${obj.type}</p>
                <p class="img"><img src=${obj.imageUrl}></p>
                <div class="actions">
                  ${userData == null ? null:
                  userData._id == obj._ownerId ? html`
                  <a class="button" href="/edit/${obj._id}">Edit</a>
                  <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`: 
                  userLikes == 0 ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`: null}
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${totalLIkes}</span>
                    </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${obj.description}</p>
            </div>
        </section>`;

export async function detailsPage(ctx){
    let id = ctx.params.id;
    let obj = await getObjDetails(id);
    let userData = getUserData();
    debugger
    let userLikes = userData ? await numberOfUserLikes(id, userData._id): null;
    let totalLIkes = await numberOfTotalLIkes(id);
    debugger

    ctx.render(detailsTemplate(obj, userData, userLikes, totalLIkes, onLike, onDelete));


    async function onLike(){
        await likeAnObj(id);

        ctx.page.redirect(`/dashboard/${id}`);
    }

    async function onDelete(){
        const choice = confirm('Are you sure that you want to delete this album?');

        if(choice){
          let deletionTime = await deleteObj(id);
          ctx.page.redirect(`/`);
          return deletionTime;
        }
    }
}