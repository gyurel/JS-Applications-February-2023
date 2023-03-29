import { html } from "../../node_modules/lit-html/lit-html.js";
import { getObjDetails, editObjDetails } from "../data/services.js";
import { createSubmitHandler, getUserData } from "../util.js";


//TODO Replace with actual view
const editTemplate = (obj, onSubmit) => html`
    <section id="editPage">
            <form @submit=${onSubmit} class="editForm">
                <img src=${obj.image}>
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" .value=${obj.name} id="name" type="text" value="Max">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" .value=${obj.breed} id="breed" type="text" value="Shiba Inu">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" .value=${obj.age} id="age" type="text" value="2 years">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" .value=${obj.weight} id="weight" type="text" value="5kg">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" .value=${obj.image} id="image" type="text" value="./image/dog.jpeg">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
`;


export async function editPage(ctx){
    let id = ctx.params.id;
    let obj = await getObjDetails(id);
    ctx.render(editTemplate(obj, createSubmitHandler(onSubmit)));

    async function onSubmit({name, breed, age, weight, image}, form){
      if([name, breed, age, weight, image].some(e => e == '')){
          return alert('All field are mandatory!')
      }

      let editedObj = await editObjDetails(id, {name, breed, age, weight, image});

      ctx.page.redirect(`/dashboard/${id}`);

      return editedObj;
    }
}