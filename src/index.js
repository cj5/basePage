import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clock from './components/Clock'
import Weather from './components/Weather'
// import './App.css';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="mg-tp-sm mg-bt-lg">BasePage</h1>
        <Clock></Clock>
        <Weather></Weather>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
