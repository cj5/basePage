import React, { Component } from 'react'

// openWeatherMap API
const API_KEY = '180941bca5b78acdc59f94ee39b4e9f1'
const cityID = 5041926 // Plymouth
//5037649 // Minneapolis
//4614748 = collierville
const url = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&APPID=' + API_KEY

const urlForecast = 'http://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&APPID=' + API_KEY

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: '—°F',
      location: 'Location',
      weather: ' ',
      today_day: ' ',
      today_weather: ' ',
      today_minTemp: ' ',
      today_maxTemp: ' ',
      day1_day: ' ',
      day1_weather: ' ',
      day1_minTemp: ' ',
      day1_maxTemp: ' ',
      day2_day: ' ',
      day2_weather: ' ',
      day2_minTemp: ' ',
      day2_maxTemp: ' ',
      day3_day: ' ',
      day3_weather: ' ',
      day3_minTemp: ' ',
      day3_maxTemp: ' ',
      day4_day: ' ',
      day4_weather: ' ',
      day4_minTemp: ' ',
      day4_maxTemp: ' ',
      day5_day: ' ',
      day5_weather: ' ',
      day5_minTemp: ' ',
      day5_maxTemp: ' '
    }
  }
  componentDidMount() {    
    let that = this
    fetch(url)    
    .then(function(response) {
      response.json()       
      .then(function(data) {
        console.log(data)
        // const timeConverter = (unixTime) => {
        //   let a = new Date(unixTime * 1000);          
        //   let hour = a.getHours();
        //   let min = a.getMinutes();
        //   let sec = a.getSeconds();
        //   return hour + ':' + min + ':' + sec
        // }
        // console.log('unixConvert:', timeConverter(unixTime))
        let tempKelvin = data.main.temp
        let temp = Math.round((9 / 5) * (tempKelvin - 273) + 32) + '°F'
        let loc = data.name
        let weather = data.weather[0].description        
        console.log('temp =', temp)
        console.log('loc =', loc)
        console.log('weather =', weather)        
        that.setState({
          temperature: temp,
          location: loc,
          weather: weather
        })
      })
    })
    .catch(function(error) {
      console.log('error')
    })

    fetch(urlForecast)
    .then(function(response) {
      response.json()       
      .then(function(data) {
        console.log(data)
        // let unixTime = data.list[37].dt
        // console.log('unix:', unixTime)
        const timeConverter = (unixTime) => {
          let a = new Date(unixTime * 1000)
          let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']         
          let month = months[a.getMonth()]
          let date = a.getDate()
          // let hour = a.getHours()
          // let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
          return month + ' ' + date
          //  + ', ' + hour + ':' + min
        }
        // console.log('unixConvert:', timeConverter(unixTime))

        let forecastTimeArray = []
        for (let i = 0; i < data.list.length; i++) {          
          forecastTimeArray.push(data.list[i].dt)          
        }
        // console.log(forecastTimeArray)
        const mapped = forecastTimeArray.map(x => timeConverter(x))
        // console.log('mapped', mapped)

        let indexArr = []        
        for (let i = 0; i < mapped.length; i++) {          
          if (mapped[i] !== mapped[i+1]) {
            indexArr.push(mapped.indexOf(mapped[i]))
          }
        }
        console.log('indexArray:', indexArr)

        let today = indexArr[0]
        let day1 = indexArr[1]
        let day2 = indexArr[2]
        let day3 = indexArr[3]
        let day4 = indexArr[4]
        let day5 = indexArr[5]        

        // today ————————————————————————————————————————————
        const today_data = data.list.slice(0, day1-1)        
        console.log('today data:', today_data)
        const today_temps = []
        for(let i = 1; i < today_data.length; i++) {
          today_temps.push(today_data[i].main.temp)
        }
        const today_maxTemp = Math.round((9 / 5) * (Math.max(...today_temps) - 273) + 32) + '°F'
        console.log('today MAX temp:', today_maxTemp)
        const today_minTemp = Math.round((9 / 5) * (Math.min(...today_temps) - 273) + 32) + '°F'
        console.log('today MIN temp:', today_minTemp)
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
        // day 3 ————————————————————————————————————————————
        const day3_data = data.list.slice(day3-1, day4-1)        
        console.log('day 3 data:', day3_data)
        const day3_temps = []
        for(let i = 1; i < day3_data.length; i++) {
          day3_temps.push(day3_data[i].main.temp)
        }
        const day3_maxTemp = Math.round((9 / 5) * (Math.max(...day3_temps) - 273) + 32) + '°F'
        console.log('day3 MAX temp:', day3_maxTemp)
        const day3_minTemp = Math.round((9 / 5) * (Math.min(...day3_temps) - 273) + 32) + '°F'
        console.log('day3 MIN temp:', day3_minTemp)
        // day 4 ————————————————————————————————————————————
        const day4_data = data.list.slice(day4-1, day5-1)        
        console.log('day 4 data:', day4_data)
        const day4_temps = []
        for(let i = 1; i < day4_data.length; i++) {
          day4_temps.push(day4_data[i].main.temp)
        }
        const day4_maxTemp = Math.round((9 / 5) * (Math.max(...day4_temps) - 273) + 32) + '°F'
        console.log('day4 MAX temp:', day4_maxTemp)
        const day4_minTemp = Math.round((9 / 5) * (Math.min(...day4_temps) - 273) + 32) + '°F'
        console.log('day4 MIN temp:', day4_minTemp)
        // day 5 ————————————————————————————————————————————        
        const day5_data = data.list.slice(day5-1, data.list.length)
        console.log('day 5 data:', day5_data)
        const day5_temps = []
        for(let i = 1; i < day5_data.length; i++) {
          day5_temps.push(day5_data[i].main.temp)
        }
        const day5_maxTemp = Math.round((9 / 5) * (Math.max(...day5_temps) - 273) + 32) + '°F'
        console.log('day5 MAX temp:', day5_maxTemp)
        const day5_minTemp = Math.round((9 / 5) * (Math.min(...day5_temps) - 273) + 32) + '°F'
        console.log('day5 MIN temp:', day5_minTemp)
                        
        let today_day = timeConverter(data.list[today].dt)
        let today_weather = data.list[0].weather[0].description
        let day1_day = timeConverter(data.list[day1].dt)
        let day1_weather = data.list[day1+4].weather[0].description
        let day2_day = timeConverter(data.list[day2].dt)
        let day2_weather = data.list[day2+4].weather[0].description
        let day3_day = timeConverter(data.list[day3].dt)
        let day3_weather = data.list[day3+4].weather[0].description
        let day4_day = timeConverter(data.list[day4].dt)
        let day4_weather = data.list[day4].weather[0].description
        let day5_day = timeConverter(data.list[day5].dt)
        let day5_weather = data.list[day5].weather[0].description
        // console.log('day4 day:', day4_day)                        
        // console.log('day4 weather:', day4_weather)

        that.setState({
          today_day: today_day,
          today_weather: today_weather,
          today_minTemp: today_minTemp,
          today_maxTemp: today_maxTemp,
          day1_day: day1_day,
          day1_weather: day1_weather,
          day1_minTemp: day1_minTemp,
          day1_maxTemp: day1_maxTemp,
          day2_day: day2_day,
          day2_weather: day2_weather,
          day2_minTemp: day2_minTemp,
          day2_maxTemp: day2_maxTemp,
          day3_day: day3_day,
          day3_weather: day3_weather,
          day3_minTemp: day3_minTemp,
          day3_maxTemp: day3_maxTemp,
          day4_day: day4_day,
          day4_weather: day4_weather,
          day4_minTemp: day4_minTemp,
          day4_maxTemp: day4_maxTemp,
          day5_day: day5_day,
          day5_weather: day5_weather,
          day5_minTemp: day5_minTemp,
          day5_maxTemp: day5_maxTemp
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
    let weather = this.state.weather

    // let todayday = this.state.today_day
    let todayweather = this.state.today_weather
    let todayminTemp = this.state.today_minTemp
    let todaymaxTemp = this.state.today_maxTemp
    let day1day = this.state.day1_day
    let day1weather = this.state.day1_weather
    let day1minTemp = this.state.day1_minTemp
    let day1maxTemp = this.state.day1_maxTemp
    let day2day = this.state.day2_day
    let day2weather = this.state.day2_weather
    let day2minTemp = this.state.day2_minTemp
    let day2maxTemp = this.state.day2_maxTemp
    let day3day = this.state.day3_day
    let day3weather = this.state.day3_weather
    let day3minTemp = this.state.day3_minTemp
    let day3maxTemp = this.state.day3_maxTemp
    let day4day = this.state.day4_day
    let day4weather = this.state.day4_weather
    let day4minTemp = this.state.day4_minTemp
    let day4maxTemp = this.state.day4_maxTemp
    let day5day = this.state.day5_day
    let day5weather = this.state.day5_weather
    let day5minTemp = this.state.day5_minTemp
    let day5maxTemp = this.state.day5_maxTemp
    return (
      <div className="App-weather">
        <p>Current weather in <b>{location}</b>:</p>
        <div className="border mg-tp-xs mg-bt-md">
          <h2>{temperature}</h2>
          <p>{weather}</p>
        </div>
        <p>5 day forecast for <b>{location}</b>:</p>
        <ul className="weather-modules mg-tp-xs">
          {/* <li className="border"><p className="day">Today</p><p className="weather">{todayweather}</p><p>lo: {todayminTemp}</p><p>hi: {todaymaxTemp}</p></li> */}
          <li className="border"><p className="day">{day1day}</p><p className="weather">{day1weather}</p><p>hi: {day1maxTemp}</p><p>lo: {day1minTemp}</p></li>
          <li className="border"><p className="day">{day2day}</p><p className="weather">{day2weather}</p><p>hi: {day2maxTemp}</p><p>lo: {day2minTemp}</p></li>
          <li className="border"><p className="day">{day3day}</p><p className="weather">{day3weather}</p><p>hi: {day3maxTemp}</p><p>lo: {day3minTemp}</p></li>
          <li className="border"><p className="day">{day4day}</p><p className="weather">{day4weather}</p><p>hi: {day4maxTemp}</p><p>lo: {day4minTemp}</p></li>
          <li className="border"><p className="day">{day5day}</p><p className="weather">{day5weather}</p><p>hi: {day5maxTemp}</p><p>lo: {day5minTemp}</p></li>
        </ul>
      </div>
    )
  }
}
export default Weather