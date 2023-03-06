function createStudents(){
    let submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', submitNewStuden);
    let firstNameField = document.querySelector('input[name="firstName"]');
    let lastNameField = document.querySelector('input[name="lastName"]');
    let facultyNumberField = document.querySelector('input[name="facultyNumber"]');
    let gradeField = document.querySelector('input[name="grade"]');
    let table = document.querySelector('tbody');

    

    async function listStudens(){
        let studentsResponse = await fetch('http://localhost:3030/jsonstore/collections/students');

        let studentsData = await studentsResponse.json();

        for (const key in studentsData) {
            let currentStudent = studentsData[key];
            debugger

            
            let tr = document.createElement('tr');

            let td1 = document.createElement('td');
            td1.textContent = currentStudent['firstName'];
            tr.appendChild(td1);

            let td2 = document.createElement('td');
            td2.textContent = currentStudent['lastName'];
            tr.appendChild(td2);

            let td3 = document.createElement('td');
            td3.textContent = currentStudent['facultyNumber'];
            tr.appendChild(td3);

            let td4 = document.createElement('td');
            td4.textContent = currentStudent['grade'];
            tr.appendChild(td4);

            debugger

            table.appendChild(tr);
        }


    }

    listStudens();

    async function submitNewStuden(){
        let firstName = firstNameField.value;
        let lastName = lastNameField.value;
        let facultyNumber = facultyNumberField.value;
        let grade = gradeField.value;


        let data = {
            firstName,
            lastName,
            facultyNumber,
            grade
            };

            let options = {
                method: 'post',
                headers: {'Content-type':'application-json'},
                body: JSON.stringify(data)
            }
        
        if(firstName == '' 
        || lastName == ''
        || facultyNumber == ''
        || grade == ''){
            return;
        }

        let studentResponse = await fetch('http://localhost:3030/jsonstore/collections/students', options);
    }
}

createStudents();