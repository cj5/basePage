import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clock from './components/Clock'
// import Weather from './components/Weather'
// import Weather1 from './components/Weather1'
import WeatherNew from './components/WeatherNew'
// import WeatherForecast from './components/WeatherForecast'
// import './App.css';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="mg-tp-sm mg-bt-lg">BasePage</h1>
        <Clock></Clock>
        {/* <Weather></Weather> */}
        <WeatherNew></WeatherNew>
        {/* <WeatherForecast></WeatherForecast> */}
        {/* <Weather1></Weather1> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
