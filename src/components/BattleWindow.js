import React, { Component } from 'react';
import './BattleWindow.css';
import Player from './player/Player';

class BattleWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHp: 10,
      enemyHp: 10
    }
    this.updatePlayerHp = this.updatePlayerHp.bind(this);
  }

  updatePlayerHp(hit) {
    console.log("updatePlayerHp")
    this.setState({
      playerHp: hit
    });
  }

  render() {
    return (
      <div id="BattleWindow">
        <div id="LeftWindow">
          <p>{this.state.playerHp}</p>
          <Player updatePlayerHp={this.updatePlayerHp} />
        </div>
        <div id="CenterWindow">Battle Calculator</div>
        <div id="RightWindow">Enemy Window</div>
      </div>
    );
  }
}

export default BattleWindow;
