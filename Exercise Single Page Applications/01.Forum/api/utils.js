export async function checkResponseStatus(response){
    if(!response.ok){
        let error = await response.json();
        throw new Error(error.message);
    }
}