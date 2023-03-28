import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbum, getAlbumDetails, likeAnAlbum, numberOfTotalLIkes, numberOfUserLikes } from "../data/albums.js";
import { getUserData } from "../util.js";


//TODO Replace with actual view
const detailsTemplate = (album, userData, userLikes, totalLIkes, onLike, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src="${album.imageUrl}" alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${totalLIkes}</span></div>

          <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${userData == null ? null:
            userData._id == album._ownerId ? html`
            <a href="/edit/${album._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`: 
            userLikes == 0 ? html`<a @click=${onLike} href="" id="like-btn">Like</a>`: null}
          </div>
        </div>
      </section>
`;

export async function detailsPage(ctx){
    let id = ctx.params.id;
    let album = await getAlbumDetails(id);
    let userData = getUserData();
    let userLikes = userData ? await numberOfUserLikes(id, userData._id): null;
    let totalLIkes = await numberOfTotalLIkes(id);
    
    ctx.render(detailsTemplate(album, userData, userLikes, totalLIkes, onLike, onDelete));


    async function onLike(){
        let currentAlbum = await likeAnAlbum(id);

        ctx.page.redirect(`/dashboard/${id}`);

        return currentAlbum;
    }

    async function onDelete(){
        confirm('Are you sure that you want to delete this album?');
        let deletionTime = await deleteAlbum(id);
        ctx.page.redirect(`/dashboard`);
        return deletionTime;
    }
}



   