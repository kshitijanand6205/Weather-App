const inputField = document.querySelector('#cityinput');
const searchButton = document.querySelector('#add');
const cityOutput = document.querySelector('#cityoutput');
const descriptionOutput = document.querySelector('#description');
const tempOutput = document.querySelector('#temp');
const windOutput = document.querySelector('#wind');
const loader = document.querySelector('#loader'); // Optional: Add a loader element in your HTML

const API_KEY = "ac077bc27a34f5976a26235e420dc6d9"; // Your API Key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2); // Convert Kelvin to Celsius
}

function mpsToKmh(mps) {
    return (mps * 3.6).toFixed(2); // Convert m/s to km/h
}

function clearOutputs() {
    cityOutput.innerHTML = '';
    descriptionOutput.innerHTML = '';
    tempOutput.innerHTML = '';
    windOutput.innerHTML = '';
}

function toggleLoader(show) {
    if (loader) {
        loader.style.display = show ? 'block' : 'none';
    }
}

searchButton.addEventListener('click', async () => {
    const cityName = inputField.value.trim();

    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }

    clearOutputs(); // Clear any existing output
    toggleLoader(true); // Show loader while fetching data

    try {
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error("City not found. Please check the name and try again.");
        }

        const data = await response.json();
        const { name, weather, main, wind } = data;

        cityOutput.innerHTML = `Weather of <span>${name}</span>`;
        descriptionOutput.innerHTML = `Sky Conditions: <span>${weather[0].description}</span>`;
        tempOutput.innerHTML = `Temperature: <span>${kelvinToCelsius(main.temp)} °C</span>`;
        windOutput.innerHTML = `Wind Speed: <span>${mpsToKmh(wind.speed)} km/h</span>`;
    } catch (error) {
        alert(error.message);
    } finally {
        toggleLoader(false); // Hide loader
    }
});



