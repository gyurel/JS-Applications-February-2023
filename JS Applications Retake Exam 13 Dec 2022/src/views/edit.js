import { html } from "../../node_modules/lit-html/lit-html.js";
import { getObjDetails, editObjDetails } from "../data/services.js";
import { createSubmitHandler, getUserData } from "../util.js";


//TODO Replace with actual view
const editTemplate = (album, onSubmit) => html`
      <section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                .value=${album.name}
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${album.imageUrl}
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                .value=${album.category}
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                .value=${album.description}
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                .value=${album.price}
                id="product-price"
                placeholder="Price"
              />
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
      category, 
      description, 
      price

    }, form 
    ){
      if([name,
        imageUrl, 
        category, 
        description, 
        price].some(e => e == '')){
          return alert('All field are mandatory!')
      }

      let editedObj = await editObjDetails(id, {
        name,
        imageUrl, 
        category, 
        description, 
        price});

      ctx.page.redirect(`/dashboard/${id}`);

      return editedObj;
    }
}