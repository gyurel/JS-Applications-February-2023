import { checkResponseStatus } from "./utils.js";




export async function showComments(event){
    let mainContainer = document.querySelector('.container');
    mainContainer.innerHTML = '';

    let currentLink = event.target;
    
    let postId = event.target.parentElement.dataset.postid;

    const mainDiv = document.createElement('div');
    mainDiv.className = 'theme-content';

    try {

        let currentPostResponse = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`);

        checkResponseStatus(currentPostResponse);
        

        let postData = await currentPostResponse.json();
        

        let divThemeTitle = document.createElement('div');
        divThemeTitle.className = 'theme-title';

        let divThemeTitleInnerHTML = `<div class="theme-name-wrapper">
                                        <div class="theme-name">
                                            <h2>${postData.topicName}</h2>
                                        </div>
                                    </div>`;

        divThemeTitle.innerHTML = divThemeTitleInnerHTML;
        mainDiv.appendChild(divThemeTitle);


        let divClassComment = document.createElement('div');
        divClassComment.className = 'comment';

        let divClassCommentInner = '';

        let postBody = `<div class="header">
                            <img src="./static/profile.png" alt="avatar">
                            <p><span>${postData.userName}</span> posted on <time>${postData.creationTime}</time></p>

                            <p class="post-content">${postData.postText}</p>
                        </div>`;

        divClassComment.innerHTML = postBody;

        let commentsResponse = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');

        checkResponseStatus(commentsResponse);

        let commentsData = await commentsResponse.json();
        
        for (const comment of Object.keys(commentsData)) {
            let currentComment = commentsData[comment];

            if(currentComment.postId == postId){
                let userCommentDiv = document.createElement('div');
                userCommentDiv.id = 'user-comment';

                let currentCommentInner = `<div class="topic-name-wrapper">
                                                <div class="topic-name">
                                                    <p><strong>${currentComment.username}</strong> commented on <time>${currentComment.creationTime}</time></p>
                                                    <div class="post-content">
                                                        <p>${currentComment.postText}</p>
                                                    </div>
                                                </div>
                                            </div>`;

                userCommentDiv.innerHTML = currentCommentInner;
                divClassComment.appendChild(userCommentDiv);
            }
            
        }

        mainDiv.appendChild(divClassComment);


        let divAnswerCommentForm = document.createElement('div');
        divAnswerCommentForm.className = 'answer-comment';
        let divAnswerCommentInner = `<p><span>currentUser</span> comment:</p>
                                        <div class="answer">
                                            <form>
                                                <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                                                <div>
                                                    <label for="username">Username <span class="red">*</span></label>
                                                    <input type="text" name="username" id="username">
                                                </div>
                                                <button>Post</button>
                                            </form>
                                        </div>`;

        divAnswerCommentForm.innerHTML = divAnswerCommentInner;


        mainDiv.appendChild(divAnswerCommentForm);
        
        mainDiv.querySelector('form').addEventListener('submit', submitComment);


    } catch (error) {
        alert(error.message);
        throw error;
        
    }
    
    document.querySelector('.container').replaceChildren(mainDiv);


    async function submitComment(event){
        event.preventDefault();
        

        let currentPost = currentLink;
    
        let commentForm = mainDiv.querySelector('form');
    
        let formData = new FormData(commentForm);
    
        let {username, postText} = Object.fromEntries(formData);

        let creationTime = new Date();
    
        let data ={
            username, 
            postText,
            creationTime,
            postId
        }
    
        let options = {
            method: 'post',
            headers: {'Content-type': 'application-json'},
            body: JSON.stringify(data)
        }
        
        try {
            let commentsResponse = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', options);

            checkResponseStatus(commentsResponse);
            debugger

            commentForm.reset();
            
            currentPost.click();
            

        } catch (error) {
            alert(error.message);
            throw error;
            
        }
    }
}

