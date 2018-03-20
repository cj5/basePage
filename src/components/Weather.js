import React, { Component } from 'react'

// openWeatherMap API
const API_KEY = '180941bca5b78acdc59f94ee39b4e9f1'
const cityID_mpls = 5037649
// const cityID_collierville = 4614748
const url = 'http://api.openweathermap.org/data/2.5/weather?id='+ cityID_mpls + '&APPID=' + API_KEY

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: '—°F',
      location: 'Location'
    }
  }
  componentDidMount() {    
    let that = this
    fetch(url)    
    .then(function(response) {
      response.json()       
      .then(function(data) {
        console.log(data)
        let tempKelvin = data.main.temp
        let temp = Math.round((9 / 5) * (tempKelvin - 273) + 32) + '°F'
        let loc = data.name
        console.log('temp =', temp)
        console.log('loc =', loc)
        that.setState({
          temperature: temp,
          location: loc
        })
      })
    })
    .catch(function(error) {
      console.log('error')
    })
  }

  render() {
    let temperature = this.state.temperature
    let location = this.state.location
    return (
      <div className="App-weather">
        <p>Current temperature in {location}:</p>
        <h2 className="border">{temperature}</h2>
      </div>      
    )
  }
}
export default Weather