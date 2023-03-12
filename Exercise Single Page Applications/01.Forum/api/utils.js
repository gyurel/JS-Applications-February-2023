export function checkResponseStatus(response){
    if(!response.ok){
        let error = response.json();
        throw new Error(error.message);
    }
}