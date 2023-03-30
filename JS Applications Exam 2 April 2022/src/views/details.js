import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteObj, getObjDetails, donateToAnObj, numberOfTotalDonations, numberOfUserDonations } from "../data/services.js";
import { getUserData } from "../util.js";


//TODO Replace with actual view
const detailsTemplate = (obj, userData, userDonations, totalDonations, onDonate, onDelete) => html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${obj.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${obj.name}</h1>
                        <h3>Breed: ${obj.breed}</h3>
                        <h4>Age: ${obj.age}</h4>
                        <h4>Weight: ${obj.weight}</h4>
                        <h4 class="donation">Donation: ${totalDonations * 100}$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    <div class="actionBtn">
                        ${userData == null ? null: 
                        userData._id == obj._ownerId ? html`
                        <a href="/edit/${obj._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`: 
                        userDonations == 0 ? html`
                        <a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`: null}    
                    </div>
                </div>
            </div>
        </section>`;


export async function detailsPage(ctx){
    let id = ctx.params.id;
    let obj = await getObjDetails(id);
    let userData = getUserData();
    let userDonations = userData ? await numberOfUserDonations(id, userData._id): null;
    let totalDonations = await numberOfTotalDonations(id);
    debugger
    
    ctx.render(detailsTemplate(obj, userData, userDonations, totalDonations, onDonate, onDelete));


    async function onDonate(){
        debugger
        await donateToAnObj(id);

        ctx.page.redirect(`/dashboard/${id}`);
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
