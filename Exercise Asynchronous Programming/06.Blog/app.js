async function attachEvents() {
    let responsePosts = await fetch('http://localhost:3030/jsonstore/blog/posts');

    let postsData = await responsePosts.json();

    let postsSelect = document.getElementById('posts');
    let loadButton = document.getElementById('btnLoadPosts');
    loadButton.addEventListener('click', loadPosts);

    let h1PostTitle = document.getElementById('post-title');
    let viewButton = document.getElementById('btnViewPost');
    viewButton.addEventListener('click', viewPostAndComments);

    let postText = document.getElementById('post-body');

    let commentsElement = document.getElementById('post-comments');

    function loadPosts(){
        let innerHtmlString = '';

        for (const key in postsData) {
            let currentOptionTitle = postsData[key].title;

            let currentOptionTag = `<option value="${key}">${currentOptionTitle}`;

            innerHtmlString += currentOptionTag;
        }

        postsSelect.innerHTML = innerHtmlString;
    }

    async function viewPostAndComments(event){
        h1PostTitle.textContent = postsData[postsSelect.value].title;
        postText.textContent = postsData[postsSelect.value].body;

        let commentsResponse = await fetch('http://localhost:3030/jsonstore/blog/comments');

        let commentsData = await commentsResponse.json();

        let commentsInner = '';
        debugger

        for (const key in commentsData) {
            debugger
            let currentComment = commentsData[key];
            if(currentComment.postId == postsSelect.value){
                let currentCommentLi = `<li id="${key}">${currentComment.text}</li>`;
                commentsInner += currentCommentLi;
            }
        }

        commentsElement.innerHTML = commentsInner;

    }


}

attachEvents();