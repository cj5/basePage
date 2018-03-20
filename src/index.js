import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import './App.css';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <div>
        <h1>BasePage</h1>
        
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
