
function getWeather() {
    const cityInput = document.getElementById('city');
    const cityName = cityInput.value.trim();

    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    const apiKey = '97d844ed960a391d9dba5f309e7eb80d'; // Use your OpenWeather API key
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
            cityInput.value = ''; // Clear input after fetching data
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
    const description = data.weather[0].description.toLowerCase(); // Convert to lowercase for consistent matching

    // Determine video source based on weather description
    let videoSource;
    if (description.includes('clear')) {
        videoSource = 'videos/sunny.mp4'; // Path to your sunny video
    } else if (description.includes('cloud')) {
        videoSource = 'videos/cloudy.mp4'; // Path to your cloudy video
    } else if (description.includes('rain')) {
        videoSource = 'videos/rainy.mp4'; // Path to your rainy video
    } else if (description.includes('thunderstorm')) {
        videoSource = 'videos/thunderstorm.mp4'; // Path to your rainy video
    }
    else {
        videoSource = 'videos/default.mp4'; // Default video
    }

    // Update the video source
    const backgroundVideo = document.getElementById('backgroundVideo');
    backgroundVideo.src = videoSource;
    backgroundVideo.load(); // Reload the video with the new source

    const weatherContent = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
    `;

    weatherInfo.innerHTML = weatherContent;
}

function displayError(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p style="color: red;">${message}</p>`;
}
