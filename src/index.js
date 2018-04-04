import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clock from './components/Clock'
// import WeatherOriginal from './components/WeatherOriginal'
import WeatherCurrent from './components/WeatherCurrent'
import Weather1 from './components/Weather1'
import Weather2 from './components/Weather2'
import Weather3 from './components/Weather3'
import Weather4 from './components/Weather4'
// import WeatherForecast from './components/WeatherForecast'
// import './App.css';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="mg-tp-sm mg-bt-lg">BasePage</h1>
        <Clock />
        {/* <WeatherOriginal></WeatherOriginal> */}
        <div className="weather-section">
          <WeatherCurrent />        
          {/* <WeatherForecast></WeatherForecast> */}
          <p>Next 4 days:</p>
          <ul className="weather-modules mg-tp-xs">
            <li className="border"><Weather1 /></li>
            <li className="border"><Weather2 /></li>
            <li className="border"><Weather3 /></li>
            <li className="border"><Weather4 /></li>
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
