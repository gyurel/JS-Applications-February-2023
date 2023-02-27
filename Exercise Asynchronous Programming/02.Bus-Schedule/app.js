function solve() {

    let currentStop = "depot";
    let nextStop;
    let infoDiv = document.querySelector("#info span.info");
    let departButton = document.getElementById("depart");
    let arriveButton = document.getElementById("arrive");

    let currnetData;


    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${currentStop}`)
        .then((response) => response.json())
        .then((data) =>{
            currnetData = data;
            // console.log(data);
            infoDiv.textContent = `Next stop ${data.name}`;
            nextStop = data.next;
            departButton.disabled = true;
            arriveButton.disabled = false;
        })
        .catch((error) => {
            departButton.disabled = true;
            arriveButton.disabled = true;
            infoDiv.textContent = "Error";
        })
    }

    function arrive() {
        infoDiv.textContent = `Arriving at ${currnetData.name}`;
        nextStop = currnetData.next;
        departButton.disabled = false;
        arriveButton.disabled = true;
        currentStop = nextStop
    }

    return {
        depart,
        arrive
    };
}

let result = solve();