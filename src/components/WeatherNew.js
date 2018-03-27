import React, { Component } from 'react'

class WeatherNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '_____',
      temp: 'loading...',
      weather: ''
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    let that = this
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        console.log('lat:', lat)
        console.log('lon:', lon)
    
        // openWeatherMap API
        const API_KEY = '180941bca5b78acdc59f94ee39b4e9f1'
        const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + API_KEY
    
        console.log('url:', url)

        fetch(url)    
        .then(function(response) {
          response.json()       
          .then(data => {
            console.log(data)
            let city = data.name
            console.log('name:', city)
            let temp = Math.round((9/5)*(data.main.temp-273)+32) + '°F'
            console.log('temp:', temp)
            let weather = data.weather[0].description
            console.log('weather:', weather)
            that.setState({
              city: city,
              temp: temp,
              weather: weather
            })
          })
        })
        .catch(function(error) {
          console.log('error')
        })
    
      },
      function(error) {
        console.log('error with geolocation')
      },
        {
        timeout: 600000000,
        maximumAge: 0,
        enableHightAccuracy: false
        }
      )
    }
  }

  render() {
    let location = this.state.city
    let temperature = this.state.temp
    let weather = this.state.weather
    return (
      <div className="App-weather">
      <p>Current weather in <i>{location}</i>:</p>
        <div className="border mg-tp-xs mg-bt-md">
          <h2>{temperature}</h2>
          <p>{weather}</p>
        </div>
      </div>
    )
  }

}
export default WeatherNew