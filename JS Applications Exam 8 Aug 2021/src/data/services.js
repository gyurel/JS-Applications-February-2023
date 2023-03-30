import { del, get, post, put } from "./api.js"

const endpoints = {
    // TODO review all endpoints
    objects: '/data/books?sortBy=_createdOn%20desc',
    addNewObj: '/data/books',
    byId: '/data/books/',
    addLike: '/data/likes'
}

export async function getAllObj(){
    const albums =  await get(endpoints.objects);
    return albums;
}

export async function getUserObjects(userId){
    const userObjectsUrl = `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
    const userObjects = await get(userObjectsUrl);
    return userObjects;
}

export async function addObj(data){
    return await post(endpoints.addNewObj, data);
}

export async function getObjDetails(id){
    return await get(endpoints.byId + id);
}

export async function editObjDetails(id, {
    //TODO change object and its properties based on requirements 
        title,
        description,
        imageUrl,
        type
    }){
    const editedAlbum = await put(endpoints.byId + id, {
        //TODO change object and its properties based on requirements 
        title,
        description,
        imageUrl,
        type
      });

    return editedAlbum;
}

export async function numberOfUserLikes(objId, userId){
    // TODO review link
    let userLikesUrl = `/data/likes?where=bookId%3D%22${objId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    let userLikes = await get(userLikesUrl);

    return userLikes;
}

export async function numberOfTotalLIkes(objId){
    // TODO review link
    let likesUrl = `/data/likes?where=bookId%3D%22${objId}%22&distinct=_ownerId&count`;

    let totalLikes = await get(likesUrl);
    
    return totalLikes;
}


export async function likeAnObj(bookId){
    let like = await post(endpoints.addLike, {bookId});

    return like;
}


export async function deleteObj(id){
    let deletionTime = await del(endpoints.byId + id);
    return deletionTime;

}