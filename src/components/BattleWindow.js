import React, { Component } from 'react';
import './BattleWindow.css';

class BattleWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHp: 10,
      enemyHp: 10
    }
  }
  render() {
    return (
      <div id="BattleWindow">
        <div id="LeftWindow">Player Window</div>
        <div id="CenterWindow">Battle Calculator</div>
        <div id="RightWindow">Enemy Window</div>
      </div>
    );
  }
}

export default BattleWindow;
