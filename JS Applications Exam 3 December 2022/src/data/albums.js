import { del, get, post, put } from "./api.js"

const endpoints = {
    albums: '/data/albums?sortBy=_createdOn%20desc',
    addNewAlbum: '/data/albums',
    byId: '/data/albums/',
    addLike: '/data/likes'
}

export async function getAllAlbums(){
    const albums =  await get(endpoints.albums);
    return albums;
}

export async function addAlbum(data){
    const album = await post(endpoints.addNewAlbum, data);
    return album;
}

export async function getAlbumDetails(id){
    return await get(endpoints.byId + id);
}

export async function postAlbumDetails(id, {
    singer,
    album, 
    imageUrl, 
    release, 
    label, 
    sales
  }){
    const editedAlbum = await put(endpoints.byId + id, {
        singer,
        album, 
        imageUrl, 
        release, 
        label, 
        sales
      });

    return editedAlbum;
}

export async function numberOfUserLikes(albumId, userId){
    let userLikesUrl = `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    let userLikes = await get(userLikesUrl);

    return userLikes;
}

export async function numberOfTotalLIkes(albumId){
    let likesUrl = `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`;
    let totalLikes = await get(likesUrl);
    
    return totalLikes;
}

export async function likeAnAlbum(albumId){
    let likedAlbum = await post(endpoints.addLike, {albumId});

    return likedAlbum;
}


export async function deleteAlbum(id){
    let deletionTime = await del(endpoints.byId + id);
    return deletionTime;

}