import { html } from "../../node_modules/lit-html/lit-html.js";
import { addObj } from "../data/services.js";
// import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";


//TODO Replace with actual view
const addObjTemplate = (onCreate) => html`
      <section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form @submit=${onCreate} class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>`;

export function addObjPage(ctx){
    ctx.render(addObjTemplate(createSubmitHandler(onCreate)));

    //TODO change object and its properties based on requirements 
    async function onCreate({name, imageUrl, description, nutrition}, form){
        if(name == '' || imageUrl == '' || description == '' || nutrition == ''){
            form.reset();
            return alert('All fields are required!')
        }

        await addObj(
          {name,
          imageUrl, 
          description, 
          nutrition
        });
        form.reset();
        ctx.page.redirect('/dashboard');
    }
}