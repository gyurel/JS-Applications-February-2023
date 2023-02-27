function getInfo() {
    // location.reload();
    let sotIdInputField = document.getElementById("stopId");
    let stopId = sotIdInputField.value;
    if(stopId == ""){
        return;
    }

    let bussesUl = document.getElementById("buses");
    bussesUl.innerHTML = "";
    let stopNameDiv = document.getElementById("stopName");
    stopNameDiv.textContent = "";

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
    .then((response) => response.json())
    .then((data) =>{
        // console.log(data);
        sotIdInputField.value = "";
        stopNameDiv.textContent = data["name"];
        for (const [key, val] of Object.entries(data.buses)) {
            let li = document.createElement('li');
            li.textContent = `Bus ${key} arrives in ${val} minutes`
            bussesUl.appendChild(li);
        }
    })
    .catch((error) => {
        sotIdInputField.value = "";
        stopNameDiv.textContent = `${"Error"}`;
    })
}
