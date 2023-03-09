let logoutButton = document.querySelector('a[id="logout"]');

let addButton = document.querySelector('button[class="add"]');
addButton.addEventListener('click', addCatch);
let addForm = document.querySelector('form[id="addForm"]');

let loadButton = document.querySelector('button[class="load"]');
loadButton.addEventListener('click', loadCatches);
let catchesDiv = document.getElementById('catches');
catchesDiv.innerHTML = '';

let mainFields = document.getElementById('main');
mainFields.style.display = 'none';

let paragraphHeading = document.createElement('p');
paragraphHeading.textContent = 'Click to load catches';
paragraphHeading.style.textAlign = 'center';

let homeSection = document.getElementById('home-view');
homeSection.prepend(paragraphHeading);

let userData = JSON.parse(localStorage.getItem('userData'));

let authorizationToken;

if(userData){
    authorizationToken = JSON.parse(localStorage.getItem('userData')).accessToken;
    document.querySelector('span').textContent = userData.email;
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.querySelector('button[class="add"]').disabled = false;
}else{
    logoutButton.style.display = 'none';
    addButton.disabled = true;
}

logoutButton.addEventListener('click', async () => {
        
        await fetch('http://localhost:3030/users/logout', {
            headers: {'X-Authorization': authorizationToken}
        });

        localStorage.removeItem('userData');

        window.location = './index.html';
});


async function addCatch(event){
    event.preventDefault();
    let formData = new FormData(addForm);
    let {angler, weight, species, location, bait, captureTime} = Object.fromEntries(formData);
    weight = Number(weight);
    captureTime = Number(captureTime);

    let data = {
        angler,
        weight,
        species,
        location, 
        bait,
        captureTime
    }

    let options = {
        method: 'post',
        headers: {
            'Content-type': 'application-json',
            'X-Authorization': userData.accessToken
        },
        body: JSON.stringify(data)
    }
    debugger


    try {
        if(Object.values(data).some(e => e == '' || e == 0)){
            let error = new Error();
            error.message = 'All fields should be filled!'; 
            throw error;
        }

        let addCatchResponse = await fetch('http://localhost:3030/data/catches', options);

        if(!addCatchResponse.ok){
            let error = new Error();
            error.message = addCatchResponse.message;
        }
        
        await addCatchResponse.json();

        addForm.reset();
        loadButton.click();

    } catch (error) {
        addForm.reset();
        throw alert(error.message);
    }
}

async function loadCatches(event){
    paragraphHeading.remove();
    mainFields.style.display = 'inline-table';
    try {
        let loadResponse = await fetch('http://localhost:3030/data/catches');
        
        if(!loadResponse.ok){
            let error = new Error(loadResponse.message);
            throw error;
        }

        let loadData = await loadResponse.json();

        let innerString = '';

        for (const fish of loadData) {
            
            let currentInner = `<div class="catch">
                    <label>Angler</label>
                    <input type="text" class="angler" value="${fish.angler}">
                    <label>Weight</label>
                    <input type="text" class="weight" value="${fish.weight}">
                    <label>Species</label>
                    <input type="text" class="species" value="${fish.species}">
                    <label>Location</label>
                    <input type="text" class="location" value="${fish.location}">
                    <label>Bait</label>
                    <input type="text" class="bait" value="${fish.bait}">
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${fish.captureTime}">
                    <button class="update" data-id="${fish._ownerId}" data-self="${fish._id}">Update</button>
                    <button class="delete" data-id="${fish._ownerId}" data-self="${fish._id}">Delete</button>
                </div>`;

                innerString += currentInner;
        }

        catchesDiv.innerHTML = innerString;

        let buttons = document.querySelectorAll('button');

        for (const button of Array.from(buttons)) {
            if(userData){
                if(button.classList.contains('update') || button.classList.contains('delete')){
                    if(button.dataset.id != userData.id){
                        button.disabled = true;
                    }
                }
            }else{
                button.disabled = true;
            }
        }

        for (const button of Array.from(buttons)) {
            if(userData){
                if(button.classList.contains('update')){
                    button.addEventListener('click', updateCatch);
                } else if(button.classList.contains('delete')){
                    button.addEventListener('click', deleteCatch);
                }
            }
        }
        
    } catch (error) {
        alert(error.message);
        throw error;
        
    }
}

async function deleteCatch(event){
    let currentCatch = event.target.dataset.self;

    try {
        let deleteResponse = await fetch(`http://localhost:3030/data/catches/${currentCatch}`, {
            method: 'delete',
            headers: {
                'Content-type': 'application-json',
                'X-Authorization': userData.accessToken
            },
        });

        if(!deleteResponse.ok){
            let error = new Error(deleteResponse.message);
            throw error;
        }
    
        // await deleteResponse.json();
    
        loadButton.click();
        
    } catch (error) {
        alert(error.message);
        throw error;
        
    }
}


async function updateCatch(event){
    let inputSet = Array.from(event.target.parentElement.querySelectorAll('input'));
    let catchId = event.target.dataset.self;
    let data = {
        "angler": inputSet[0].value,
        "weight": Number(inputSet[1].value),
        "species": inputSet[2].value,
        "location": inputSet[3].value,
        "bait": inputSet[4].value,
        "captureTime": Number(inputSet[5].value)
    }
    
    let options = {
        method: 'put',
        headers: {
            'Content-type': 'application-json',
            'X-Authorization': userData.accessToken
        },
        body: JSON.stringify(data)
    }

    try {
        
    let updateResponse = await fetch(`http://localhost:3030/data/catches/${catchId}`, options);

    if(!updateResponse.ok){
        let error = new Error(updateResponse.message);
        throw error;
    }

    // await updateResponse.json();

    loadButton.click();
        
    } catch (error) {
        alert(error.message);
        throw error;
    }


}
