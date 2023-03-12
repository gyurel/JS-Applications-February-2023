import { showComments } from "./comments.js";

const postButton = document.getElementById('postBtn');
postButton.addEventListener('click', publishNewPost)

const cancelButton = document.getElementById('cancelBtn');
cancelButton.addEventListener('click', cancelPost);

const postsDiv = document.querySelector('.topic-title');
postsDiv.innerHTML = '';


const homeView = document.getElementById('home');
const postForm = homeView.querySelector('form');
homeView.remove();



export async function showHome(event){
    
    if(event != undefined){
        event.preventDefault();
    }

    try {
        const postsResponse = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');

        if(!postsResponse.ok){
            let error = postsResponse.json();
            throw new Error(error.message);
        }

        const postsData = await postsResponse.json();

        let innerString = '';

        for (const key of Object.keys(postsData)) {
            let currentPost = postsData[key];

            // let currentTime = new Date();

            let currentInner = `<div class="topic-container">
            <div class="topic-name-wrapper">
                    <div class="topic-name">
                        <a href="javascript:void(0)" data-postid="${currentPost['_id']}" class="normal">
                            <h2>${currentPost.topicName}</h2>
                        </a>
                        <div class="columns">
                            <div>
                                <p>Date: <time>${currentPost.creationTime}</time></p>
                                <div class="nick-name">
                                    <p>Username: <span>${currentPost.userName}</span></p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>`;

            innerString += currentInner;

        }

        postsDiv.innerHTML = innerString;

        const anchorElements = Array.from(postsDiv.querySelectorAll('h2'));
        
        anchorElements.forEach(element => element.addEventListener('click', showComments));

        document.querySelector('.container').replaceChildren(homeView);
        
    } catch (error) {
        alert(error.message);
        throw error;
        
    }


}

async function publishNewPost(event){
    event.preventDefault();

    let formData = new FormData(postForm);
    let {topicName, userName, postText} = Object.fromEntries(formData);

    let arr = formData.values();

    
    // let currentId = String(Math.floor(Math.random() * 100000000000000));
    let creationTime = new Date();

    
    let data = {
        topicName, 
        userName,
        postText,
        creationTime
        // 'id': currentId
    }
    
    if(Object.values(data).some(e => e == '')){
        postForm.reset();
        return;
    }

    let options = {
        method: 'post',
        headers: {'Content-type': 'application-json'},
        body: JSON.stringify(data)
    }


    try {
        let postRespons = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', options);

        if(!postRespons.ok){
            let error = postRespons.json();
            throw new Error(error.message);
        }

        // let postData = await postRespons.json();

        postForm.reset();

        showHome();

    } catch (error) {
        alert(error.message);
        throw error;
    }
}


function cancelPost(event){
    event.preventDefault();
    postForm.reset();
}