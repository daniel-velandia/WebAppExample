const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "07dd8fef7c7509613c491da20ef0d1d9";
const units = "metric";

document.addEventListener("DOMContentLoaded", () => {
    if("geolocation" in navigator) {
        getWeather();
    } else {
        geolocationError();
    }
});


function getWeather() {
    navigator.geolocation.getCurrentPosition((position) => {
    
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        fetch(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
        .then(response => response.json())
        .then(data => renderWeather(data))
    })
}

function geolocationError() {
    alert("El navegador no es compatible con geolocalización");
}

function renderWeather(data) {

    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("d-none");
    }

    let temp = document.getElementById("temp");
    let location = document.getElementById("location");
    let weatherIcon = document.getElementById("weatherIcon");
    let feelsLike = document.getElementById("feelsLike");
    let pressure = document.getElementById("pressure");
    let humidity = document.getElementById("humidity");

    temp.innerHTML = `${data.main.temp}°C`;
    location.innerHTML = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    feelsLike.innerHTML = `${data.main.feels_like}°C`;
    pressure.innerHTML = `${data.main.pressure}hPa`;
    humidity.innerHTML = `${data.main.humidity}%`;
}