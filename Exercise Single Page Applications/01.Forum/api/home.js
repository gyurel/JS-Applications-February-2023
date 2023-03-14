import { showComments } from "./comments.js";
import { checkResponseStatus } from "./utils.js";


export async function showHome(event){
    

    const postsDiv = document.querySelector('.topic-title');
    postsDiv.innerHTML = '';

    // const homeView = document.getElementById('home');
    // homeView.remove();
    
    if(event != undefined){
        event.preventDefault();
    }

    try {
        const postsResponse = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');

        checkResponseStatus(postsResponse);

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

        // document.querySelector('.container').replaceChildren(homeView);
        
    } catch (error) {
        alert(error.message);
        throw error;
        
    }


}

export async function publishNewPost(event){
    event.preventDefault();

    const postForm = document.querySelector('form');

    let formData = new FormData(postForm);
    let {topicName, userName, postText} = Object.fromEntries(formData);

    let arr = formData.values();

    
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

        checkResponseStatus(postRespons);


        postForm.reset();

        showHome();

    } catch (error) {
        alert(error.message);
        throw error;
    }
}


export function cancelPost(event){
    event.preventDefault();
    postForm.reset();
}