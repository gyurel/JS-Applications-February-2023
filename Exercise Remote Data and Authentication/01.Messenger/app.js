function attachEvents() {

    let submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', publishMessage);

    let refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', showMessages);

    let textArea = document.getElementById('messages');

    async function publishMessage(){
        let nameField = document.querySelector('input[name="author"]');
        let messageField = document.querySelector('input[name="content"]');
        
        const data = {
            author: nameField.value,
            content: messageField.value,
        };

        let options = {
            method: 'post', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data),
        }

        let responsePost = await fetch('http://localhost:3030/jsonstore/messenger', options);

        nameField.value = '';
        messageField.value = '';
    }

    async function showMessages(){
        let messagesResponse = await fetch('http://localhost:3030/jsonstore/messenger');

        let messagesData = await messagesResponse.json();

        let messagesArray = [];

        for (const key in messagesData) {
            let currentMessage = messagesData[key];

            let currentMessageString = `${currentMessage.author}: ${currentMessage.content}`;
            messagesArray.push(currentMessageString);

        }

        textArea.value = messagesArray.join('\n');
    }
}

attachEvents();