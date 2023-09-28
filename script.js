const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".feather-search");

const card = document.querySelector(".card");

const cityNameSpan = document.querySelector(".city");
const timeSpan = document.querySelector(".time");
const aqiSpan = document.querySelector(".aqi");
const testSpan = document.querySelector(".test");
const weatherImg = document.querySelector(".weatherImg");

//əsas fetch atdığımız funksiya
async function logWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d348a62ee12b2bb05648ea0a4a52078`
    );
    if (!response.ok) {
      throw new Error("Axtardığınız şəhər tapılmadı :(");
    }
    const weatherData = await response.json();
    console.log(weatherData);

    // melumatlari ekranda gostermek

    searchInput.style.width = "100%";
    card.classList.add("active");
    cityNameSpan.textContent = weatherData.name;
    timeSpan.textContent = weatherData.sys.country;
    aqiSpan.textContent = `${(weatherData.main.temp - 273.15).toFixed(2)}°C`;
    testSpan.textContent = weatherData.weather[0].main;
    weatherImg.classList.remove("active");

    if (
      weatherData.weather[0].main == "Cloud" ||
      weatherData.weather[0].main == "Clouds"
    ) {
      weatherImg.setAttribute("src", "./assets/images/03_cloud_color.png");
    } else if (weatherData.weather[0].main == "Clear") {
      weatherImg.setAttribute("src", "./assets/images/40_rainbow_color.png");
    } else if (weatherData.weather[0].main == "Fog") {
      weatherImg.setAttribute("src", "./assets/images/15_fog_color.png");
    } else if (weatherData.weather[0].main == "Rain") {
      weatherImg.setAttribute(
        "src",
        "./assets/images/13_heavy_rainstorm_color.png"
      );
    } else if (weatherData.weather[0].main == "Sunny") {
      weatherImg.setAttribute("src", "./assets/images/01_sunny_color_w512.png");
    }
    if (weatherData.name == "Qazax") {
      cityNameSpan.textContent = "Burda hava həmişə zordu";
      timeSpan.style.display = "none";
      testSpan.style.display = "none";
      aqiSpan.style.display = "none";
      weatherImg.setAttribute("src", "./assets/images/glass.png");
    }
  } catch (error) {
    console.error(error);
    searchInput.setAttribute("placeholder", "Axtardığınız şəhər tapılmadı :(");
    searchInput.style.width = "100%";
    cityNameSpan.textContent = "";
    timeSpan.textContent = "";
    aqiSpan.textContent = "";
    testSpan.textContent = "";
    weatherImg.classList.add("active");
    weatherImg.setAttribute("src", "./assets/images/na.png");
  }
}

// axtarışa klikləyəndə...
searchIcon.addEventListener("click", () => {
  if (searchInput.value) {
    logWeather(searchInput.value);
    searchInput.setAttribute("placeholder", searchInput.value);
    searchInput.value = "";
  }
});
