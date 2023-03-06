function solve(){
    let loadButton = document.getElementById('loadBooks');
    loadButton.addEventListener('click', loadBooks);
    let table = document.querySelector('tbody');
    table.innerHTML = '';

    let inputTitle = document.querySelector('input[name="title"]');
    let inputAuthor = document.querySelector('input[name="author"]');
    let submitButton = document.querySelector('form>button');
    submitButton.addEventListener('click', submitBook);

    let h3 = document.querySelector('h3');


    async function loadBooks(){
        let booksResponse = await fetch('http://localhost:3030/jsonstore/collections/books');

        let booksData = await booksResponse.json();

        let innerString = '';

        for (const key in booksData) {
            let currentBook = booksData[key];

            let currentString = `<tr>
                                    <td>${currentBook.title}</td>
                                    <td>${currentBook.author}</td>
                                    <td>
                                        <button value="${key}">Edit</button>
                                        <button value="${key}">Delete</button>
                                    </td>
                                </tr>`

            innerString += currentString;
        }

        table.innerHTML = innerString;

        let allButtons = document.querySelectorAll('button');
        let buttonsArray = Array.from(allButtons);
        buttonsArray.shift();
        buttonsArray.pop();

        for (let index = 0; index < buttonsArray.length; index++) {
            let currentButton = buttonsArray[index];
            if(index % 2 == 0){
                currentButton.addEventListener('click', editBook);
            }else{
                currentButton.addEventListener('click', deleteBook);
            }
        }
    }


    async function editBook(event){
        
        let currentBookId = event.target.value;
        h3.textContent = 'Edit FORM';
        submitButton.textContent = 'Save';
        submitButton.removeEventListener('click', submitBook);
        
        let bookResponse = await fetch(`http://localhost:3030/jsonstore/collections/books/${currentBookId}`);
        
        let bookData = await bookResponse.json();
        
        let author = bookData.author;
        let title = bookData.title;
        
        
        inputAuthor.value = author;
        inputTitle.value = title;
        
        submitButton.addEventListener('click', saveBook);

        let buttons = Array.from(document.querySelectorAll('button'));
        let editButtons = buttons.slice(1, buttons.length - 1);

        for (const editButton of buttons) {
            debugger
            if(editButton.textContent == 'Edit'){
                editButton.disabled = true;
            }
            
        }


        async function saveBook(event){
            event.preventDefault();

            let author = inputAuthor.value;
            let title = inputTitle.value;
            
            if(author == '' || title == ''){
                return;
            }

            
            let data = {
                author,
                title
            };

            let options = {
                method: 'put',
                headers: {'Content-type': 'application-json'},
                body: JSON.stringify(data)
            }

            await fetch(`http://localhost:3030/jsonstore/collections/books/${currentBookId}`, options);

            inputAuthor.value = '';
            inputTitle.value = '';

            h3.textContent = 'FORM';
            submitButton.textContent = 'Submit';

            submitButton.removeEventListener('click', saveBook);

            submitButton.addEventListener('click', submitBook);

            let buttons = Array.from(document.querySelectorAll('button'));
            let editButtons = buttons.slice(1, buttons.length - 1);
    
            for (const editButton of buttons) {
                debugger
                if(editButton.textContent == 'Edit'){
                    editButton.disabled = false;
                }
                
            }

            loadButton.click();
        }
    }


    async function deleteBook(event){
        let currentButton = event.target;

        let options = {
            method: 'delete',
            headers: {'Content-type': 'application/json'}
        }

        await fetch(`http://localhost:3030/jsonstore/collections/books/${currentButton.value}`, options);

        loadButton.click();
    }


    async function submitBook(event){
        event.preventDefault();

        let author = inputAuthor.value;
        let title = inputTitle.value;

        if(author == '' || title == ''){
            return;
        }

        let data = {
            author,
            title
        };

        let options = {
            method: 'post',
            headers: {'Content-type': 'application-json'},
            body: JSON.stringify(data)
        }


        await fetch('http://localhost:3030/jsonstore/collections/books', options);

        inputAuthor.value = '';
        inputTitle.value = '';

        loadButton.click();
    }

}

solve();