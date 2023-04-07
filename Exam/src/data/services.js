import { del, get, post, put } from "./api.js"

const endpoints = {
    // TODO review all endpoints
    objects: '/data/fruits?sortBy=_createdOn%20desc',
    addNewObj: '/data/fruits',
    byId: '/data/fruits/'
}

export async function getSearched(queryParameter){
    let searchUrl = `/data/fruits?where=name%20LIKE%20%22${queryParameter}%22`;
    const result = get(searchUrl);
    return result;
}

export async function getAllObj(){
    const albums =  await get(endpoints.objects);
    return albums;
}

export async function addObj(data){
    return await post(endpoints.addNewObj, data);
}

export async function getObjDetails(id){
    return await get(endpoints.byId + id);
}

export async function editObjDetails(id, {
    //TODO change object and its properties based on requirements 
    name,
    imageUrl, 
    description, 
    nutrition

  }){
    const editedFruit = await put(endpoints.byId + id, {
        //TODO change object and its properties based on requirements 
        name,
        imageUrl, 
        description, 
        nutrition

      });

    return editedFruit;
}

export async function numberOfUserLikes(objId, userId){
    // TODO review link
    let userLikesUrl = `/data/likes?where=albumId%3D%22${objId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    let userLikes = await get(userLikesUrl);

    return userLikes;
}

export async function numberOfTotalLIkes(objId){
    // TODO review link
    let likesUrl = `/data/likes?where=albumId%3D%22${objId}%22&distinct=_ownerId&count`;
    let totalLikes = await get(likesUrl);
    
    return totalLikes;
}


//TODO  rename the cardId according to the requirements !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export async function likeAnObj(cardId){
    let likedObj = await post(endpoints.addLike, {cardId});

    return likedObj;
}


export async function deleteObj(id){
    let deletionTime = await del(endpoints.byId + id);
    return deletionTime;
}