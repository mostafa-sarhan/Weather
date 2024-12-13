const api_key = "92fb353929d24f14a52142209240607";


///////////////////
//  DOM Elements //
// ///////////////
const temperature = document.querySelector(".result_box .temperature h3");
const status_temp = document.querySelector(".hero .result_box .statues p");
const humidity = document.querySelector(".condition .humidity .condition_box span");
const wind = document.querySelector(".hero .result_box .condition .wind .wind_box span");
const image = document.querySelector(".hero .result_box .image img");
const search_current = document.querySelector(".hero .result_box .search_current p");
const hero = document.querySelector(".hero");
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const box_error = document.querySelector(".container .error");
// ///////////////




async function getWeatherData(city){
    try {
        let response =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=1`);
        console.log(response.status);
        let data =await response.json();
        console.log(data);

        if(response.status ==200){
            hero.classList.add("show");
// ///////////////////////////
box_error.classList.remove("show_error");
// ///////////////////////////
        // Update DOM with weather data //
        search_current.textContent = data.location.name;
        temperature.textContent = data.current.temp_c;
        status_temp.textContent = data.current.condition.text;
        humidity.textContent = data.current.humidity + "%";
        wind.textContent = data.current.wind_kph + " M / h";
        // call to change image statue
        handleCondition(data.current.condition.text)
        }
        else{
            box_error.classList.add("show_error");
            hero.classList.remove("show");
            console.log("The code contain Error");
            return;
        }

    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        box_error.classList.add("show_error")
        return;
    }
}





// on click the button
searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        box_error.classList.add("show_error")
    }
});


// on click the key
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
        getWeatherData(city);
    } else {
        box_error.classList.add("show_error")
    }
    }
});

function handleCondition(conditionText) {
    switch (conditionText) {
        case "Sunny":
            console.log("Display a sunny icon/image");
            image.src=`./image/clear.png`;
            break;
        case "Light drizzle":
            console.log("Display a Light drizzle icon/image");
            image.src=`./image/clear.png`;
            break;
        case "Partly cloudy":
            console.log("Display a partly cloudy icon/image");
            image.src=`./image/cloud.png`;
            break;
        case "Cloudy":
            image.src=`./image/cloud.png`;
            console.log("Display a cloudy icon/image");
            break;
        case "Rainy":
            image.src=`./image/rain.png`;
            console.log("Display a rainy icon/image");
            break;
        case "Thunderstorm":
            image.src=`./image/snow.png`;
            console.log("Display a thunderstorm icon/image");
            break;
        default:
            image.src=`./image/snow.png`;
            console.log("Display a default weather icon/image");
        }
}


// getWeatherData();
