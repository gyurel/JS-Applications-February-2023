import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteObj, getObjDetails, buyAnObj, numberOfTotalBuys, numberOfUserBuys } from "../data/services.js";
import { getUserData } from "../util.js";


//TODO Replace with actual view
const detailsTemplate = (obj, userData, userBuys, totalBuys, onBuy, onDelete) => html`
      <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${obj.imageUrl} />
            <p id="details-title">${obj.name}</p>
            <p id="details-category">
              Category: <span id="categories">${obj.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${obj.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${totalBuys}</span> times.</h4>
                <span
                  >${obj.description}</span
                >
              </div>
            </div>
            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
              <!--Bonus - Only for logged-in users ( not authors )-->
              ${userData == null ? null:
              userData._id == obj._ownerId ? html`
              <a href="/edit/${obj._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`: 
              userBuys == 0 ? html`<a @click=${onBuy} href="javascript:void(0)" id="buy-btn">Buy</a>`: null}
            </div>
          </div>
        </section>`;

export async function detailsPage(ctx){
    let id = ctx.params.id;
    let obj = await getObjDetails(id);
    let userData = getUserData();
    let userBuys = userData ? await numberOfUserBuys(id, userData._id): null;
    let totalBuys = await numberOfTotalBuys(id);
    
    ctx.render(detailsTemplate(obj, userData, userBuys, totalBuys, onBuy, onDelete));


    async function onBuy(){
        let currentObj = await buyAnObj(id);

        ctx.page.redirect(`/dashboard/${id}`);

        return currentObj;
    }

    async function onDelete(){
        const choice = confirm('Are you sure that you want to delete this album?');

        if(choice){
          let deletionTime = await deleteObj(id);
          ctx.page.redirect(`/dashboard`);
          return deletionTime;
        }
    }
}
