function attachEvents() {
    let phoneBookField = document.getElementById('phonebook');

    let loadButton = document.getElementById('btnLoad');
    loadButton.addEventListener('click', loadPhoneBook);
    let nameField = document.getElementById('person');
    let phoneField = document.getElementById('phone');
    let createButton = document.getElementById('btnCreate');
    createButton.addEventListener('click', createNewEntry);

    async function loadPhoneBook(){

        phoneBookField.innerHTML = '';

        let phoneBookResponse = await fetch('http://localhost:3030/jsonstore/phonebook');

        let phoneBookData = await phoneBookResponse.json();

        // let ulInner = '';

        for (const key in phoneBookData) {
            let currentName = phoneBookData[key].person;
            let currentPhone = phoneBookData[key].phone;
            // let currentLi = `<li value="${key}">${currentName}:${currentPhone}</li>`;
            let currentLi = document.createElement('li');
            currentLi.textContent = `${currentName}: ${currentPhone}`;
            let currentDeleteButton = document.createElement('button');
            currentDeleteButton.value = key;
            currentDeleteButton.textContent = 'Delete';
            currentDeleteButton.addEventListener('click', delteEntry);
            currentLi.appendChild(currentDeleteButton);

            phoneBookField.appendChild(currentLi);



            // ulInner += currentLi;
        }

        // phoneBookField.innerHTML = ulInner;

        async function delteEntry(event){
            await fetch(`http://localhost:3030/jsonstore/phonebook/${event.target.value}`, {method: 'delete'});
            loadButton.click();

        }

    }

    async function createNewEntry(){

        let person = nameField.value;
        let phone = phoneField.value;

        if(person == '' || phone == ''){
            return;
        }


        let data = {
            person,
            phone
        };

        let options = {
            method: 'post',
            header: {'Content-type': 'application/json'},
            body: JSON.stringify(data),
        }
        
        let phoneBookResponse = await fetch('http://localhost:3030/jsonstore/phonebook', options);

        nameField.value = '';
        phoneField.value = '';

        loadButton.click();
    }


}

attachEvents();