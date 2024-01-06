function getWeather() {
    const cityInput = document.getElementById('city');
    const cityName = cityInput.value;

    if (cityName.trim() === '') {
        alert('Please enter a city name.');
        return;
    }

    const apiKey = '97d844ed960a391d9dba5f309e7eb80d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError('Failed to fetch weather data. Please try again.');
        });
}
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';

    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    // Determine background color based on weather description
    let backgroundColor;
    if (description.includes('clear')) {
        backgroundColor = '#87CEEB'; // Light Blue for Clear Sky
    } else if (description.includes('cloud')) {
        backgroundColor = '#778899'; // Light Slate Gray for Cloudy
    } else if (description.includes('rain')) {
        backgroundColor = '#4682B4'; // Steel Blue for Rain
    } else {
        backgroundColor = '#265489'; // Default background color
    }

    // Apply background color
    document.body.style.backgroundColor = backgroundColor;

    const weatherContent = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
    `;

    weatherInfo.innerHTML = weatherContent;
}



