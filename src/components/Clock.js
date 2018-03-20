import React, { Component } from 'react'

class Clock extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    )
  }
  componentWillUnmount() {
    clearInterval(this.intervalID)
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    })
  } 
  render() {
    return (
      <div className="App-clock">
        <h2 className="date">{this.state.date}</h2>
        <p className="clock border ft-sz-xl">{this.state.time}</p>
      </div>      
    )
  }
}
export default Clock