import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteObj, getObjDetails } from "../data/services.js";
import { getUserData } from "../util.js";


//TODO Replace with actual view
const detailsTemplate = (obj, userData, onDelete) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${obj.imageUrl} />
            <p id="details-title">${obj.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>
                  ${obj.description}
                  </p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">
                      ${obj.nutrition}
                        </p>
              </div>
               <!--Edit and Delete are only for creator-->
               ${userData && userData._id == obj._ownerId ? html`
              <div id="action-buttons">
              <a href="/edit/${obj._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
              </div>`: null}
         
            </div>
        </div>
      </section>
`;

export async function detailsPage(ctx){
    let id = ctx.params.id;
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
