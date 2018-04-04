import React, { Component } from 'react'

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '_______',
      temperature: 'Loading...',       
      weather: ''
    }
  }

  componentDidMount() {
    let that = this
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        console.log('lat:', lat)
        console.log('lon:', lon)
    
        // openWeatherMap API — Current weather
        const API_KEY = '180941bca5b78acdc59f94ee39b4e9f1'
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + API_KEY
    
        console.log('url:', url)

        fetch(url)
        .then(function(response) {
          response.json()
          .then(data => {
            console.log(data)            
            let location = data.name
            let temp = Math.round((9/5)*(data.main.temp-273)+32) + '°F'
            let weather = data.weather[0].description
            that.setState({
              location: location,
              temperature: temp,
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
        enableHighAccuracy: false
        }
      )
    }
  }
  render() {
    let location = this.state.location
    let temperature = this.state.temperature
    let weather = this.state.weather
    return (
      <div className="App-weather">
      <h3>Weather in <i>{location}</i></h3>
        <p>Current:</p>
        <div className="border mg-tp-xs mg-bt-md">
          <h2>{temperature}</h2>
          <p>{weather}</p>
        </div>
      </div>
    )
  }
}
export default Weather