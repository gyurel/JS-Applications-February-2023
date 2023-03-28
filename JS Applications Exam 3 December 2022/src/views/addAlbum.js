import { html } from "../../node_modules/lit-html/lit-html.js";
import { addAlbum } from "../data/albums.js";
// import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";


//TODO Replace with actual view
const addAlbumTemplate = (onCreate) => html`
      <section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form @submit=${onCreate} class="create-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />
            <button type="submit">post</button>
          </form>
        </div>
      </section>`;

export function addAlbumPage(ctx){
    ctx.render(addAlbumTemplate(createSubmitHandler(onCreate)));
    //TODO change user object based on requirements 

    async function onCreate({singer, album, imageUrl, release, label, sales}, form){
        if(singer == '' || album == '' || imageUrl == '' || release == '' || label == '' || sales == ''){
            form.reset();
            throw alert('All fields are required!')
        }

        await addAlbum({singer, album, imageUrl, release, label, sales});
        form.reset();
        ctx.page.redirect('/dashboard');
    }
}