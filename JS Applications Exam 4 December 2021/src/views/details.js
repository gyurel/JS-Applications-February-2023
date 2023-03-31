import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteObj, getObjDetails, likeAnObj, numberOfTotalLIkes, numberOfUserLikes } from "../data/services.js";
import { getUserData } from "../util.js";


//TODO Replace with actual view
const detailsTemplate = (obj, userData, onDelete) => html`
      <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src=${obj.imgUrl}>
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${obj.name}</h1>
                        <h3>Artist: ${obj.artist}</h3>
                        <h4>Genre: ${obj.genre}</h4>
                        <h4>Price: $${obj.price}</h4>
                        <h4>Date: ${obj.releaseDate}</h4>
                        <p>${obj.description}</p>
                    </div>

                    <!-- Only for registered user and creator of the album-->
                    ${userData && userData._id == obj._ownerId ? html`
                    <div class="actionBtn">
                        <a href="/edit/${obj._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                    </div>`: null}
                    
                </div>
            </div>
        </section>
`;

export async function detailsPage(ctx){
    let id = ctx.params.id;
    debugger
    let obj = await getObjDetails(id);
    let userData = getUserData();
    
    ctx.render(detailsTemplate(obj, userData, onDelete));


    async function onDelete(){
        const choice = confirm('Are you sure that you want to delete this album?');

        if(choice){
          let deletionTime = await deleteObj(id);
          ctx.page.redirect(`/dashboard`);
          return deletionTime;
        }
    }
}
