import { html } from "../../node_modules/lit-html/lit-html.js";
import { getObjDetails, editObjDetails } from "../data/services.js";
import { createSubmitHandler, getUserData } from "../util.js";


//TODO Replace with actual view
const editTemplate = (album, onSubmit) => html`
      <section class="editPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" .value=${album.name} class="name" type="text" value="In These Silent Days">

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" .value=${album.imgUrl} class="imgUrl" type="text" value="./img/BrandiCarlile.png">

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" .value=${album.price} class="price" type="text" value="12.80">

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" .value=${album.releaseDate} class="releaseDate" type="text" value="October 1, 2021">

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" .value=${album.artist} class="artist" type="text" value="Brandi Carlile">

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" .value=${album.genre} class="genre" type="text" value="Low Country Sound Music">

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" .value=${album.description} class="description" rows="10"
                            cols="10">Upon release, In These Silent Days received positive reviews from critics. At Metacritic, which assigns a normalized rating out of 100 to reviews from mainstream critics, the album has an average score of 87 out of 100, which indicates 'universal acclaim'.</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
`;

export async function editPage(ctx){
    let id = ctx.params.id;
    let obj = await getObjDetails(id);
    ctx.render(editTemplate(obj, createSubmitHandler(onSubmit)));

    async function onSubmit({
      name,
      imgUrl,
      price,
      releaseDate,
      artist,
      genre,
      description
    }, form 
    ){
      if([name,
      imgUrl,
      price,
      releaseDate,
      artist,
      genre,
      description].some(e => e == '')){
          return alert('All field are mandatory!')
      }

      let editedObj = await editObjDetails(id, {
        name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description
      });

      ctx.page.redirect(`/dashboard/${id}`);

      return editedObj;
    }
}