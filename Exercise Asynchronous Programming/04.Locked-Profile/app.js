async function lockedProfile() {

    let mainDiv = document.getElementById('main');    

    try {
        let res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');

        let error = new Error();

        if(res.ok == false){
            throw error;
        }

        let data = await res.json();

        if(!data){
            throw error;
        }
        

        mainDiv.innerHTML = '';

        let innerProfilesString = '';

        let counter = 1;

        for (const key in data) {
            let currentProfile = data[key];
            

            let inner = `<div class="profile">
                    <img src="./iconProfile2.png" class="userIcon" />
                    <label>Lock</label>
                    <input type="radio" name="user${counter}Locked" value="lock" checked>
                    <label>Unlock</label>
                    <input type="radio" name="user${counter}Locked" value="unlock"><br>
                    <hr>
                    <label>Username</label>
                    <input type="text" name="user${counter}Username" value="${currentProfile.username}" disabled readonly />
                    <div class="hiddenInfo">
                        <hr>
                        <label>Email:</label>
                        <input type="email" name="user${counter}Email" value="${currentProfile.email}" disabled readonly />
                        <label>Age:</label>
                        <input type="email" name="user${counter}Age" value="${currentProfile.age}" disabled readonly />
                    </div>
                    
                    <button>Show more</button>
                </div>`;
            
            innerProfilesString += inner;

            counter++;
        }

        mainDiv.innerHTML = innerProfilesString;

        for (const profile of Array.from(mainDiv.children)) {
            let currentButton = profile.querySelector('button');
            currentButton.addEventListener('click', showHide);
        }

        function showHide(event){
            let input = event.target.parentElement.querySelector('input');
            let button = event.target;
            debugger
            if(input.checked == false){
                if(button.textContent == 'Show more'){
                    let currentHiddenDiv = event.target.parentElement.querySelector('div');
                    currentHiddenDiv.style.display = 'block';
                    for (const child of Array.from(currentHiddenDiv.children)) {
                        child.style.display = 'block';
                    }
                    button.textContent = 'Hide it';

                }else{
                    let currentHiddenDiv = event.target.parentElement.querySelector('div');
                    currentHiddenDiv.style.display = 'none';
                    for (const child of Array.from(currentHiddenDiv.children)) {
                        child.style.display = 'none';
                    }
                    button.textContent = 'Show more';
                }
            }
        }
    } catch (error) {
        return;        
    }
}