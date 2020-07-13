<template>
  <div id="app">
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
      </div>
      <p class="weather-error label" v-else>{{ weatherError }}</p>
      <p class="copyright" v-if="imgSrc">
        <a :href="photoUrl + utmParams" target="_blank">Photo</a> / 
        <a :href="authorUrl + utmParams" target="_blank">{{ authorName }}</a> / 
        <a :href="`https://unsplash.com${utmParams}`" target="_blank">Unsplash</a>
      </p>
      <p class="location" v-if="photoLocation">{{ photoLocation }}</p>
    </div>
  </div>
</template>

<script>
import { env } from '../env'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'App',
  data() {
    return {
      imgSrc: null,
      imgAlt: null,
      photoUrl: null,
      authorUrl: null,
      authorName: null,
      photoLocation: null,
      time: null,
      date: null,
      city: null,
      temp: null,
      hiTemp: null,
      loTemp: null,
      feelsTemp: null,
      description: null,
      icon: null,
      humidity: null,
      weatherError: null,
      utmParams: '?utm_source=basepage&utm_medium=referral'
    }
  },
  methods: {
    getDate() {
      this.time = moment().format('h:mm A')
      this.date = moment().format('dddd, MMMM D')
    },
    kToF(k) {
      return Math.round(k * (9/5) - 459.67)
    }
  },
  mounted() {
    // UNSPLASH IMAGES
    axios.get(`https://api.unsplash.com/photos/random/?client_id=${env.ACCESS_KEY}&orientation=landscape&query=wallpapers`)
      .then(response => {
        const photo = response.data
        console.log('UNSPLASH:', photo)

        this.imgSrc = photo.urls.regular
        this.imgAlt = photo.alt_description
        this.photoUrl = photo.links.html
        this.authorUrl = photo.user.links.html
        this.authorName = photo.user.name
        this.photoLocation = photo.location.name
      })
      .catch(error => {
        console.log('UNSPLASH API ERROR:', error.response.data)
      })

    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude

      // "ONE CALL" WEATHER DATA
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${env.WEATHER_KEY}`)
        .then(response => {
          console.log('WEATHER:', response)

          const current = response.data.current
          const daily = response.data.daily[0]

          this.temp = `${this.kToF(current.temp)}°`
          this.feelsTemp = `${this.kToF(current.feels_like)}°`
          this.hiTemp = `${this.kToF(daily.temp.max)}°`
          this.loTemp = `${this.kToF(daily.temp.min)}°`
          this.description = current.weather[0].description
          this.icon = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
          this.humidity = `${current.humidity}%`
        })
        .catch(error => {
          console.log('WEATHER API ERROR:', error.response.data)
        })

      // CURRENT WEATHER DATA
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.WEATHER_KEY}`)
        .then(response => {
          this.city = response.data.name
        })
        .catch(error => {
          console.log('WEATHER API ERROR:', error.response.data)
        })

    });

    setTimeout(() => {
      this.weatherError = 'Allow your browser to access your location in order to get weather data.'
    }, 2000)

    setInterval(this.getDate, 1000)
  }
}
</script>

<style lang="scss">
  @import 'app';
</style>