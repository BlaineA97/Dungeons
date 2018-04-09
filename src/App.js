import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BattleWindow from './components/BattleWindow';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BattleWindow />
      </div>
    );
  }
}

export default App;
