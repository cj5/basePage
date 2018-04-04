import React, { Component } from 'react'

class Weather2 extends Component {
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
    
            let indexArr = []        
            for (let i = 0; i < mapped.length; i++) {          
              if (mapped[i] !== mapped[i+1]) {
                indexArr.push(mapped.indexOf(mapped[i]))
              }
            }
            console.log('indexArray:', indexArr)
                
            let day2 = indexArr[2]
            let day3 = indexArr[3]           
            
            // day 2 ————————————————————————————————————————————
            const day2_data = data.list.slice(day2-1, day3-1)        
            console.log('day 2 data:', day2_data)
            const day2_temps = []
            for(let i = 1; i < day2_data.length; i++) {
              day2_temps.push(day2_data[i].main.temp)
            }
            const day2_maxTemp = Math.round((9 / 5) * (Math.max(...day2_temps) - 273) + 32) + '°F'
            console.log('day2 MAX temp:', day2_maxTemp)
            const day2_minTemp = Math.round((9 / 5) * (Math.min(...day2_temps) - 273) + 32) + '°F'
            console.log('day2 MIN temp:', day2_minTemp)

            let date = timeConverter(data.list[day2].dt)
            let weather = data.list[day2+4].weather[0].description

            that.setState({
              date: date,
              weather: weather,
              hiTemp: 'hi: ' + day2_maxTemp,
              loTemp: 'lo: ' + day2_minTemp
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

export default Weather2