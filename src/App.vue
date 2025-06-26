<template>
  <div class="img-wrap" v-if="imgSrc">
    <img :src="imgSrc" :alt="imgAlt">
    <div class="filter"></div>
  </div>

  <div class="content">
    <div class="time-date">
      <p class="time">{{ time }}</p>
      <p class="date">{{ date }}</p>
    </div>

    <!-- <div class="weather" v-if="temp && !showSpinner"> -->
    <div class="weather" v-if="temp">
      <div class="main-weather">
        <img :src="icon" alt="" class="weather-icon" v-if="icon">
        <p class="temp">{{ temp }}</p>
      </div>
      <p class="description">
        {{ description }}
        <span class="city label">| {{ city }}</span>
      </p>
      <p><span class="label">Feels like:</span> {{ feelsTemp }}</p>
      <p><span class="label">Hi:</span> {{ hiTemp }}</p>
      <p><span class="label">Lo:</span> {{ loTemp }}</p>
      <p class="humidity"><span class="label">Humidity:</span> {{ humidity }}</p>
      <p class="wind"><span class="label">Wind:</span> {{ wind }}</p>
      <p class="sunrise"><span class="label">Sunrise:</span> {{ sunrise }}</p>
      <p class="sunset"><span class="label">Sunset:</span> {{ sunset }}</p>
      <p class="last-updated"><span class="label">Last updated:</span> {{ lastUpdated }}</p>
    </div>

    <!-- <div v-if="showSpinner" class="spinner-wrap" ref="spinnerWrapEl">
      <p>Loading weather...</p>
    </div> -->

    <p class="weather-error label" v-if="weatherError">{{ weatherError }}</p>

    <p class="copyright" v-if="imgSrc">
      <a :href="photoUrl + utmParams" target="_blank">Photo</a> /
      <a :href="authorUrl + utmParams" target="_blank">{{ authorName }}</a> /
      <a :href="`https://unsplash.com${utmParams}`" target="_blank">Unsplash</a>
    </p>

    <p class="location" v-if="photoLocation">{{ photoLocation }}</p>
  </div>
</template>

<script setup>
import { env } from '../env';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
// import { Spinner } from 'spin.js';
// import 'spin.js/spin.css';

const imgSrc = ref(null);
const imgAlt = ref(null);
const photoUrl = ref(null);
const authorUrl = ref(null);
const authorName = ref(null);
const photoLocation = ref(null);
const time = ref(null);
const date = ref(null);
const city = ref(null);
const temp = ref(null);
const hiTemp = ref(null);
const loTemp = ref(null);
const feelsTemp = ref(null);
const description = ref(null);
const icon = ref(null);
const humidity = ref(null);
const wind = ref(null);
const sunrise = ref(null);
const sunset = ref(null);
const lastUpdated = ref(null);
const weatherError = ref(null);
// const spinnerWrapEl = ref(null);
// const showSpinner = ref(true);
const utmParams = '?utm_source=basepage&utm_medium=referral';

function getDate() {
  time.value = dayjs().format('h:mm A');
  date.value = dayjs().format('dddd, MMMM D');
}

function kToF(k) {
  return Math.round(k * (9/5) - 459.67);
}

function metersSecToMilesHour(mps) {
  return Math.round(mps * 2.2369);
}

onMounted(() => {
  // UNSPLASH IMAGES
  axios.get(`https://api.unsplash.com/photos/random/?client_id=${env.ACCESS_KEY}&orientation=landscape&query=wallpapers`)
    .then(response => {
      const photo = response.data;
      console.log('Unsplash:', photo);

      imgSrc.value = photo.urls.regular;
      imgAlt.value = photo.alt_description;
      photoUrl.value = photo.links.html;
      authorUrl.value = photo.user.links.html;
      authorName.value = photo.user.name;
      photoLocation.value = photo.location.name;
    })
    .catch(error => {
      console.error('UNSPLASH API ERROR:', error);
    })

  function getWeatherData() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      // showSpinner.value = true;

      // CURRENT WEATHER DATA
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.WEATHER_KEY}`)
        .then(response => {
          weatherError.value = '';
          console.log('OpenWeather:', response.data, null, 2);

          const data = response.data;

          temp.value = `${kToF(data.main.temp)}°`;
          feelsTemp.value = `${kToF(data.main.feels_like)}°`;
          hiTemp.value = `${kToF(data.main.temp_max)}°`;
          loTemp.value = `${kToF(data.main.temp_min)}°`;
          description.value = data.weather[0].description;
          icon.value = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          humidity.value = `${data.main.humidity}%`;
          wind.value = `${metersSecToMilesHour(data.wind.speed)} mph`;
          sunrise.value = `${dayjs.unix(data.sys.sunrise).format('h:mm A')}`;
          sunset.value = `${dayjs.unix(data.sys.sunset).format('h:mm A')}`;
          city.value = response.data.name;
          lastUpdated.value = dayjs().format('h:mm:ss A');

          // showSpinner.value = false;
        })
        .catch(error => {
          // showSpinner.value = false;
          weatherError.value = 'There was an error getting weather data.';
          console.error('WEATHER API ERROR:', error);
        })
    }, error => {
      weatherError.value = 'Allow your browser to access your location in order to get weather data.';
      console.error('GEOLOCATION ERROR:', error);
    });
  }

  // const spinner = new Spinner({
  //   lines: 10,
  //   color: '#fff',
  //   animation: 'spinner-line-fade-more',
  // });
  // spinner.spin(spinnerWrapEl.value);

  getWeatherData();

  setInterval(() => {
    getWeatherData();
  }, 30000); // 30 sec

  setInterval(getDate, 1000);
}); // onMounted()
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400&display=swap');

$text-gray: #ccc;
$px: 20px;
$py: 14px;

body {
  margin: 0 !important;
  line-height: 1.25;
}
h1,h2,h3,h4,h5,h6 {
  margin: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  font-family: 'Source Code Pro', monospace;
  background-color: #000;
}
a {
  text-decoration: none;
  position: relative;
  display: inline-block;
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: transparent;
    transition: 0.1s all ease-in-out;
  }
  &:hover:after {
    background-color: $text-gray;
  }
}
p {
  margin: 0 0 10px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
img {
  width: 100%;
  object-fit: cover;
}
.img-wrap {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}
.filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(black, 0.45);
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
}

.time-date {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.time {
  font-size: 110px;
  border-bottom: 2px solid #eee;
  width: max-content;
}
.date {
  font-size: 40px;
  margin: 12px 0 0;
}

.weather,
.weather-error {
  position: absolute;
  top: $py;
  right: $px;
  text-align: right;
  .temp {
    font-size: 70px;
  }
  .main-weather {
    display: flex;
    justify-content: end;
  }
  .weather-icon {
    position: relative;
    bottom: 5px;
    max-width: 80px;
    margin-right: 20px;
  }
  .description {
    position: relative;
    bottom: 10px;
    margin-bottom: 15px;
    padding-bottom: 20px;
    border-bottom: 1px solid #fff;
  }
  .city {
    font-style: italic;
  }
}

.copyright {
  position: absolute;
  bottom: $py;
  left: $px;
  margin-bottom: 0;
}

.label,
.copyright,
.copyright a,
.location {
  font-size: 14px;
  color: $text-gray;
}

.location {
  position: absolute;
  right: $px;
  bottom: $py;
  margin: 0;
}

.last-updated {
  margin-top: 30px;
  color: $text-gray;
  font-style: italic;
}
.last-updated,
.last-updated * {
  font-size: 12px;
}

// .spinner-wrap {
//   position: absolute;
//   top: 0;
//   right: 16px;
//   p {
//     font-style: italic;
//     margin-top: 90px;
//     color: $text-gray;
//   }
// }
</style>
