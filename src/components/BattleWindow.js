import React, { Component } from 'react';
import './BattleWindow.css';
import Player from './player/Player';
import Enemy from './enemy/Enemy';

class BattleWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHp: 10,
      enemyHp: 100
    }
    this.updatePlayerHp = this.updatePlayerHp.bind(this);
    this.updateEnemyHp = this.updateEnemyHp.bind(this);
    this.rollDice = this.rollDice.bind(this);
  }

  updatePlayerHp(hit) {
    console.log("updatePlayerHp")
    this.setState({
      playerHp: hit
    });
  }

  updateEnemyHp(hit) {
    console.log("updateEnemyHp")
    this.setState({
      enemyHp: hit
    });
  }

  rollDice(number) {
    let roll = Math.floor(Math.random() * Math.floor(number));
    return roll
  }

  render() {
    return (
      <div id="BattleWindow">
        <div id="LeftWindow">
          <p>{this.state.playerHp}</p>
          <Player
            updateEnemyHp={this.updateEnemyHp}
            updatePlayerHp={this.updatePlayerHp}
            playerHp={this.state.playerHp}
            enemyHp={this.state.enemyHp}
            rollDice={this.rollDice} />
        </div>
        <div id="CenterWindow">Battle Calculator</div>
        <div id="RightWindow">
          <p>{this.state.enemyHp}</p>
          <Enemy />
        </div>
      </div>
    );
  }
}

export default BattleWindow;
