import { html } from "../../node_modules/lit-html/lit-html.js";
import { getObjDetails, editObjDetails } from "../data/services.js";
import { createSubmitHandler, getUserData } from "../util.js";


//TODO Replace with actual view
const editTemplate = (fruit, onSubmit) => html`
      <section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                .value=${fruit.name}
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${fruit.imageUrl}
                id="Fruit-image"
                placeholder="Fruit Image URL"
              />
              <textarea
                id="fruit-description"
                name="description"
                .value=${fruit.description}
                placeholder="Description"
                rows="10"
                cols="50"
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                .value=${fruit.nutrition}
                placeholder="Nutrition"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx){
    let id = ctx.params.id;
    let obj = await getObjDetails(id);
    ctx.render(editTemplate(obj, createSubmitHandler(onSubmit)));

    async function onSubmit({
      name,
      imageUrl, 
      description, 
      nutrition

    }, form 
    ){
      if([name,
        imageUrl, 
        description, 
        nutrition
      ].some(e => e == '')){
          return alert('All field are mandatory!')
      }

      let editedObj = await editObjDetails(id, {
        name,
        imageUrl, 
        description, 
        nutrition

      });

      ctx.page.redirect(`/dashboard/${id}`);

      return editedObj;
    }
}