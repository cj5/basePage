import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clock from './components/Clock'
// import './App.css';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <div>
        <h1>BasePage</h1>
        <Clock ></Clock>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
