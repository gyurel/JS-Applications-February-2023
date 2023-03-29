import { html } from "../../node_modules/lit-html/lit-html.js";
import { getObjDetails, editObjDetails } from "../data/services.js";
import { createSubmitHandler, getUserData } from "../util.js";


//TODO Replace with actual view
const editTemplate = (album, onSubmit) => html`
    <section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="singer" .value=${album.singer} id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" .value=${album.album} id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" .value=${album.imageUrl} id="album-img" placeholder="Image url" />
            <input type="text" name="release" .value=${album.release} id="album-release" placeholder="Release date" />
            <input type="text" name="label" .value=${album.label} id="album-label" placeholder="Label" />
            <input type="text" name="sales" .value=${album.sales} id="album-sales" placeholder="Sales" />

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
      singer,
      album, 
      imageUrl, 
      release, 
      label, 
      sales
    }, form 
    ){
      if([singer,
        album, 
        imageUrl, 
        release, 
        label, 
        sales].some(e => e == '')){
          return alert('All field are mandatory!')
      }

      let editedObj = await editObjDetails(id, {
        singer,
        album, 
        imageUrl, 
        release, 
        label, 
        sales
      });

      ctx.page.redirect(`/dashboard/${id}`);

      return editedObj;
    }
}