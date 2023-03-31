import { del, get, post, put } from "./api.js"

const endpoints = {
    // TODO review all endpoints
    objects: '/data/products?sortBy=_createdOn%20desc',
    addNewObj: '/data/products',
    byId: '/data/products/',
    buy: '/data/bought'
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
    category, 
    description, 
    price}){
    const editedAlbum = await put(endpoints.byId + id, {
        //TODO change object and its properties based on requirements 
        name,
        imageUrl, 
        category, 
        description, 
        price});

    return editedAlbum;
}

export async function numberOfUserBuys(objId, userId){
    // TODO review link
    let userLikesUrl = `/data/bought?where=productId%3D%22${objId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    let userLikes = await get(userLikesUrl);

    return userLikes;
}

export async function numberOfTotalBuys(objId){
    // TODO review link
    let likesUrl = `/data/bought?where=productId%3D%22${objId}%22&distinct=_ownerId&count`;
    let totalLikes = await get(likesUrl);
    
    return totalLikes;
}


//TODO  rename the cardId according to the requirements !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export async function buyAnObj(productId){
    let likedObj = await post(endpoints.buy, {productId});

    return likedObj;
}


export async function deleteObj(id){
    let deletionTime = await del(endpoints.byId + id);
    return deletionTime;

}