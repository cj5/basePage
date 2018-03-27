import React, { Component } from 'react'
import WeatherForecast from './components/WeatherForecast'

class Weather1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weather1: ''
    }
  }

  componentDidMount() {
    console.log(data)
    this.setState({
      weather1: 'test Weather1'
    })
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Weather1