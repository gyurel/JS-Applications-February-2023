import { html } from "../../node_modules/lit-html/lit-html.js";
import { addObj } from "../data/services.js";
// import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";


//TODO Replace with actual view
const addObjTemplate = (onCreate) => html`
      <section id="createPage">
            <form @submit=${onCreate} class="createForm">
                <img src="../images/cat-create.jpg">
                <div>
                    <h2>Create PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" placeholder="Max">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" placeholder="2 years">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" placeholder="5kg">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
                    </div>
                    <button class="btn" type="submit">Create Pet</button>
                </div>
            </form>
        </section>`;


export function addObjPage(ctx){
    ctx.render(addObjTemplate(createSubmitHandler(onCreate)));

    //TODO change object and its properties based on requirements 
    async function onCreate({name, breed, age, weight, image}, form){
        if(name == '' || breed == '' || age == '' || weight == '' || image == ''){
            form.reset();
            return alert('All fields are required!')
        }

        await addObj({name, breed, age, weight, image});
        form.reset();
        ctx.page.redirect('/');
    }
}