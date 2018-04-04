import React, { Component } from 'react'

class Weather1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      weather: 'Loading...',
      hiTemp: '',
      loTemp: ''
    }
  }

  componentDidMount() {
    let that = this
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        // console.log('lat:', lat)
        // console.log('lon:', lon)
    
        // openWeatherMap API — 5 day forecast
        const API_KEY = '180941bca5b78acdc59f94ee39b4e9f1'
        const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&APPID=' + API_KEY
    
        // console.log('url:', url)

        fetch(url)
        .then(function(response) {
          response.json()
          .then(data => {
            console.log(data)
            const timeConverter = (unixTime) => {
              let a = new Date(unixTime * 1000)
              let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']         
              let month = months[a.getMonth()]
              let date = a.getDate()
              return month + ' ' + date
            }
    
            let forecastTimeArray = []
            for (let i = 0; i < data.list.length; i++) {          
              forecastTimeArray.push(data.list[i].dt)          
            }            
            const mapped = forecastTimeArray.map(x => timeConverter(x))
            // console.log('mapped', mapped)
    
            let indexArr = []        
            for (let i = 0; i < mapped.length; i++) {          
              if (mapped[i] !== mapped[i+1]) {
                indexArr.push(mapped.indexOf(mapped[i]))
              }
            }
            console.log('indexArray:', indexArr)
                
            let day1 = indexArr[1]
            let day2 = indexArr[2]           
            
            // day 1 ————————————————————————————————————————————
            const day1_data = data.list.slice(day1-1, day2-1)        
            console.log('day 1 data:', day1_data)
            const day1_temps = []
            for(let i = 1; i < day1_data.length; i++) {
              day1_temps.push(day1_data[i].main.temp)
            }
            const day1_maxTemp = Math.round((9 / 5) * (Math.max(...day1_temps) - 273) + 32) + '°F'
            console.log('day1 MAX temp:', day1_maxTemp)
            const day1_minTemp = Math.round((9 / 5) * (Math.min(...day1_temps) - 273) + 32) + '°F'
            console.log('day1 MIN temp:', day1_minTemp)

            let date = timeConverter(data.list[day1].dt)
            let weather = data.list[day1+4].weather[0].description

            that.setState({
              date: date,
              weather: weather,
              hiTemp: 'hi: ' + day1_maxTemp,
              loTemp: 'lo: ' + day1_minTemp
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
    return (
      <div>
        <p className="day">{this.state.date}</p>
        <p className="weather">{this.state.weather}</p>
        <p>{this.state.hiTemp}</p>
        <p>{this.state.loTemp}</p>
      </div>
    )
  }
}

export default Weather1