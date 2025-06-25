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
    </div>
    <p class="weather-error label" v-else>{{ weatherError }}</p>
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
const weatherError = ref(null);
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
      console.log('UNSPLASH API ERROR:', error.response.data);
    })

  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    // CURRENT WEATHER DATA
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.WEATHER_KEY}`)
      .then(response => {
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

        city.value = response.data.name;
      })
      .catch(error => {
        console.error('WEATHER API ERROR:', error.response.data);
      })
  });

  setTimeout(() => {
    weatherError.value = 'Allow your browser to access your location in order to get weather data.';
  }, 2000);

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
</style>
