<template>
  <div id="app">
    <div class="img-wrap">
      <img :src="imgSrc" :alt="imgAlt">
      <div class="filter"></div>
    </div>
    <div class="content">
      <div class="time-date">
        <p class="time">{{ time }}</p>
        <p class="date">{{ date }}</p>
      </div>
      <div class="weather">
        <div class="main-weather">
          <img :src="icon" alt="" class="weather-icon">
          <p class="temp">{{ temp }}</p>
        </div>
        <p class="description">{{ description }}</p>
        <p><span class="label">Feels like:</span> {{ feelsTemp }}</p>
        <p><span class="label">Hi:</span> {{ hiTemp }}</p>
        <p><span class="label">Lo:</span> {{ loTemp }}</p>
        <p class="humidity"><span class="label">Humidity:</span> {{ humidity }}</p>
      </div>
      <div class="copyright">
        <ul>
          <li><a :href="photoUrl" target="_blank">Photo</a></li>
          /
          <li><a :href="authorUrl" target="_blank">{{ authorName }}</a></li>
          /
          <li><a href="https://unsplash.com" target="_blank">Unsplash</a></li>
        </ul>
      </div>
      <p v-if="photoLocation" class="location">{{ photoLocation }}</p>
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
      temp: null,
      hiTemp: null,
      loTemp: null,
      feelsTemp: null,
      description: null,
      icon: null,
      humidity: null,
    }
  },
  methods: {
    getDate() {
      this.time = moment().format('h:mm A')
      this.date = `${moment().format('dddd, MMMM D')}`
    },
    kToF(k) {
      return Math.round(k * (9/5) - 459.67)
    }
  },
  mounted() {
    axios.get(`https://api.unsplash.com/photos/random/?client_id=${env.ACCESS_KEY}&orientation=landscape`)
      .then(response => {
        const photo = response.data
        console.log(photo)

        this.imgSrc = photo.urls.regular
        this.imgAlt = photo.alt_description
        this.photoUrl = photo.links.html
        this.authorUrl = photo.user.links.html
        this.authorName = photo.user.name
        this.photoLocation = photo.location.name
      })

    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

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
      });
    } else {
      console.log('location access is not supported')
    }

    setInterval(this.getDate, 1000)
  }
}
</script>

<style lang="scss">
  @import 'app';
</style>