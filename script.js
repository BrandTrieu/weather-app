async function getWeatherData(city) {
    try {
        const apiKey = 'F3JGQLM875M4QJ8KKMGB25X26';
        const weatherFetched = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`,
                {mode: 'cors'}
            )
        const weatherData = await weatherFetched.json();
        return weatherData
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

async function processWeatherData(city) {
    try {
        const weatherData = await getWeatherData(city);
        const { 
            currentConditions: { temp, feelslike, conditions },
            resolvedAddress } = weatherData; 
        return {
            currentConditions: { temp, feelslike, conditions },    
            resolvedAddress }
    } catch (error) {
        console.error('Error processing weather data:', error);
        return null;
    }
}

async function displayWeatherData(city) {

    const weatherData = await processWeatherData(city);
    const weatherResult = document.querySelector('#weather-result');
    document.querySelector('#citytext').textContent = weatherData.resolvedAddress;
    document.querySelector('#temp').textContent = `Temperature: ${weatherData.currentConditions.temp}°F`;
    document.querySelector('#feelslike').textContent = `Feels like: ${weatherData.currentConditions.feelslike}°C`;
    document.querySelector('#conditions').textContent = `Conditions: ${weatherData.currentConditions.conditions}`;
}

function getCity() {
    //Get the form element and add an event listener for the submit event
    const weatherForm = document.querySelector('#weather-form');
    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault();
        //Get the value of the input field and pass it to displayWeatherData
        let cityInput = document.querySelector('#city')
        displayWeatherData(cityInput.value);
        cityInput.value = '';
    })
}

getCity();


