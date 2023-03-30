import { html } from "../../node_modules/lit-html/lit-html.js";
import { getObjDetails, editObjDetails } from "../data/services.js";
import { createSubmitHandler, getUserData } from "../util.js";


//TODO Replace with actual view
const editTemplate = (obj, onSubmit) => html`
      <section id="edit-page" class="edit">
            <form @submit=${onSubmit} id="edit-form" action="#" method="">
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" .value=${obj.title} id="title" value="A Court of Thorns and Roses">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" .value=${obj.description}
                                id="description">Feyre's survival rests upon her ability to hunt and kill – the forest where she lives is a cold, bleak place in the long winter months. So when she spots a deer in the forest being pursued by a wolf, she cannot resist fighting it for the flesh. But to do so, she must kill the predator and killing something so precious comes at a price ...</textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" .value=${obj.imageUrl} id="image" value="/images/book1.png">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" .value=${obj.type}>
                                <option value="Fiction" selected>Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>
`;

export async function editPage(ctx){
    let id = ctx.params.id;
    let obj = await getObjDetails(id);
    ctx.render(editTemplate(obj, createSubmitHandler(onSubmit)));

    async function onSubmit({
      title,
      description,
      imageUrl,
      type
    }
    , form 
    ){
      if([title,
        description,
        imageUrl,
        type].some(e => e == '')){
          return alert('All field are mandatory!')
      }

      let editedObj = await editObjDetails(id, {
        title,
        description,
        imageUrl,
        type
      });

      form.reset();
      ctx.page.redirect(`/dashboard/${id}`);

      return editedObj;
    }
}