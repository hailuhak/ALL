const forcast = document.querySelector('.forcast');
const inputCity = document.querySelector('.Enter-city');
const showWeather = document.querySelector('.show-weather')
const APIkey = '6a62ae9597a737cd783f5146dc35bf20';

forcast.addEventListener('submit', async event => {
   event.preventDefault();
   const city = inputCity.value;

   if (city) {
      try {
         const weatherData = await getWeather(city)
         displayWeather(weatherData);
      } catch (error) {
         displayError(error);
      }
   }
   else {
      displayError('Pleas Enter a city');
   }
})

async function getWeather(city) {
   const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city }&appid=${APIkey}`)
   
      if (!responce.ok) {
         throw new Error("coudn't fatch from api")
      }
   return await responce.json();
 
}

function displayWeather(data) {
   const { name: city,
             main: { temp, humidity }, 
             weather: [{ description, id }] } = data;
   showWeather.textContent = '';
   showWeather.style.display = 'block';
   const disCity = document.createElement('p');
   const tempratur = document.createElement('p');
   const humid = document.createElement('p');
   const condition = document.createElement('p');
   const emoji = document.createElement('p');
   console.log(data)
   

   disCity.textContent = city;
   tempratur.textContent =`${(temp-273.15).toFixed(1)}°C`
   humid.textContent = `humidity:${humidity}`;
   condition.textContent = description;
   emoji.textContent = getEmoji(id);

   disCity.classList.add('city');
   tempratur.classList.add('temp');
   condition.classList.add('condition');
   humid.classList.add('humidity');
   emoji.classList.add('symbol');
   

   showWeather.appendChild(disCity)
   showWeather.appendChild(tempratur);
   showWeather.appendChild(humid)
   showWeather.appendChild(condition)
   showWeather.appendChild(emoji)
   
}
function getEmoji(symbol) {
   switch(true) {
      case symbol >= 200 && symbol < 300:
         return '⛈️'; // Thunderstorm
      case symbol >= 300 && symbol < 400:
         return '🌧️'; // Drizzle
      case symbol >= 500 && symbol < 600:
         return '🌧️'; // Rain
      case symbol >= 600 && symbol < 700:
         return '❄️'; // Snow
      case symbol >= 700 && symbol < 800:
         return '🌫️'; // Atmosphere
      case symbol === 800:
         return '☀️'; // Clear
      case symbol > 800:
         return '☁️'; // Clouds
      default:
         return '';
   }
   
}
function displayError(message) {
   const errorDisplay = document.createElement('p');
   errorDisplay.textContent = message;
   errorDisplay.classList.add('error');


   showWeather.textContent = '';
   showWeather.style.display = 'block';
   showWeather.appendChild(errorDisplay)
   
}

