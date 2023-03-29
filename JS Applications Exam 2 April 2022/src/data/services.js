import { del, get, post, put } from "./api.js"

const endpoints = {
    // TODO review all endpoints
    objects: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    addNewObj: '/data/pets',
    byId: '/data/pets/',
    addDonation: '/data/donation'
}

export async function getAllObj(){
    const albums =  await get(endpoints.objects);
    return albums;
}

export async function addObj(data){
    debugger
    return await post(endpoints.addNewObj, data);
}

export async function getObjDetails(id){
    return await get(endpoints.byId + id);
}

export async function editObjDetails(id, {
    //TODO change object and its properties based on requirements 
    name, breed, age, weight, image
  }){
    const editedAlbum = await put(endpoints.byId + id, {
        //TODO change object and its properties based on requirements 
        name, breed, age, weight, image
      });

    return editedAlbum;
}

export async function numberOfUserDonations(objId, userId){
    // TODO review link
    debugger
    let userDonationsUrl = `/data/donation?where=petId%3D%22${objId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    let userDonations = await get(userDonationsUrl);

    return userDonations;
}

export async function numberOfTotalDonations(objId){
    // TODO review link
    let donationsUrl = `/data/donation?where=petId%3D%22${objId}%22&distinct=_ownerId&count`;
    let totalDonations = await get(donationsUrl);
    
    return totalDonations;
}

export async function donateToAnObj(objId){
    let donatedPet = await post(endpoints.addDonation, {objId});

    return donatedPet;
}


export async function deleteObj(id){
    let deletionTime = await del(endpoints.byId + id);
    return deletionTime;

}