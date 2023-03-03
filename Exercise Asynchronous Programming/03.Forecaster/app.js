function attachEvents() {
    let getWeatherButton = document.getElementById("submit");
    getWeatherButton.addEventListener('click', getForcast);

    let inputField = document.getElementById("location");
    
    let weatherIcon = {
        "Sunny": "&#x2600", // ☀
        "Partly sunny": "&#x26C5", // ⛅
        "Overcast": "&#x2601", // ☁
        "Rain": "&#x2614", // ☂
        "Degrees": "&#176",   // °

    }
    
    let forecastDiv = document.getElementById("forecast");

    async function getForcast(){

    //     forecastDiv.innerHTML = `<div id="current">
    //     <div class="label">Current conditions</div>
    // </div>
    // <div id="upcoming">
    //     <div class="label">Three-day forecast</div>
    // </div>`;

        

        try {
            let locationName = inputField.value;
            let locationCode;
            let locationsUrl = `http://localhost:3030/jsonstore/forecaster/locations`;
        
            const responseLocation = await fetch(locationsUrl);
            let error = new Error();
            
            if(responseLocation.ok == false){
                error.status = responseLocation.status;
                error.statusText = responseLocation.statusText;
                throw error;
            }
        
            let locations = await responseLocation.json();
            

            for (const city of locations) {
                if(city.name == locationName){
                    locationCode = city.code;
                    break;
                }
            }

            if(!locationCode){
                throw error;
            }
            
            let responseCurrentConditions = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`);

            if(responseCurrentConditions.ok == false){
                error.status = responseCurrentConditions.status;
                error.statusText = responseCurrentConditions.statusText;
                throw error;
            }

            let currentCondition = await responseCurrentConditions.json();

            if(!currentCondition){
                throw error;
            }

            let  response3DayForecast = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`);

            if(response3DayForecast.ok == false){
                error.status = response3DayForecast.status;
                error.statusText = response3DayForecast.statusText;
                throw error;
            }

            let threeDayForecast = await response3DayForecast.json();

            if(!threeDayForecast){
                throw error;
            }

            
            
            forecastDiv.style.display = 'block';

            let divCurrent = document.getElementById('current');

            let forecastsDiv = document.createElement('div');
            forecastsDiv.className = 'forecasts';

            let forecastsDivInner = `<span class="condition symbol">${weatherIcon[currentCondition['forecast']['condition']]}</span>
                                    <span class="condition">
                                        <span class="forecast-data">${currentCondition['name']}</span>
                                        <span class="forecast-data">${currentCondition['forecast']['low']}${weatherIcon['Degrees']}/${currentCondition['forecast']['high']}${weatherIcon['Degrees']}</span>
                                        <span class="forecast-data">${currentCondition['forecast']['condition']}</span>
                                    </span>`;
            forecastsDiv.innerHTML = forecastsDivInner;

            divCurrent.appendChild(forecastsDiv);

            let divUpcoming = document.getElementById('upcoming');

            let divForcastInfo = document.createElement('div');
            divForcastInfo.classList.add('forecast-info');

            for (const dayForecast of threeDayForecast.forecast) {
                let span = document.createElement('span');
                span.classList.add('upcoming');

                let symbolSpan = document.createElement('span');
                symbolSpan.classList.add('symbol');
                symbolSpan.innerHTML = weatherIcon[dayForecast.condition];
                span.appendChild(symbolSpan);

                let degreesSpan = document.createElement('span');
                degreesSpan.classList.add('forecast-data');
                degreesSpan.innerHTML = `${dayForecast.low}${weatherIcon['Degrees']}/${dayForecast.high}${weatherIcon['Degrees']}`;
                span.appendChild(degreesSpan);

                let forecastSpan = document.createElement('span');
                forecastSpan.classList.add('forecast-data');
                forecastSpan.textContent = `${dayForecast.condition}`;
                span.appendChild(forecastSpan);

                divForcastInfo.appendChild(span);
            }
            
            divUpcoming.appendChild(divForcastInfo);

            inputField.value = '';
            
        } catch (error) {
            debugger

            // let divCurrent = document.getElementById('current');

            let forecastDiv = document.getElementById('forecast');
            forecastDiv.innerHTML = '';
            forecastDiv.style.display = 'block';
            forecastDiv.textContent = 'Error';
            


            // let forecastsDiv = document.createElement('div');
            // forecastsDiv.className = 'forecasts';

            // let span = document.createElement('span');
            // span.textContent = 'Error';
            // forecastDiv.appendChild(span);
            // divCurrent.appendChild(forecastDiv);
        }
    }
}


attachEvents();