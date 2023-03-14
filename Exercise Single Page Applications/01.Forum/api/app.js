import { showHome, publishNewPost, cancelPost } from "./home.js";


const showHomeLink = document.getElementById('homeLink');
showHomeLink.addEventListener('click', showHome);

const postButton = document.getElementById('postBtn');

postButton.addEventListener('click', publishNewPost)


const cancelButton = document.getElementById('cancelBtn');
cancelButton.addEventListener('click', cancelPost);


let commentsDiv = document.querySelector('.theme-content');
commentsDiv.remove();


showHome();


