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
    this.enemyAttack = this.enemyAttack.bind(this);
    this.enemyDefend = this.enemyDefend.bind(this);
    this.enemyFlee = this.enemyFlee.bind(this);
    this.randomEnemyAction = this.randomEnemyAction.bind(this);
    this.rollDice = this.rollDice.bind(this);
  }

  componentDidUpdate() { // Checks if Player or Enemy is dead
    if (this.state.playerHp <= 0) {
      alert("You are dead!")
      // Player is dead
    } else if (this.state.enemyHp <= 0) {
      alert("You killed the enemy!")
      // Enemy is dead
    }
  }

  updatePlayerHp(hit) {
    console.log("updatePlayerHp")
    this.setState({ playerHp: hit });
  }

  updateEnemyHp(hit) {
    console.log("updateEnemyHp")
    this.setState({ enemyHp: hit });
  }

  rollDice(number) {
    let roll = Math.floor(Math.random() * Math.floor(number));
    return roll
  }

  randomEnemyAction() {
    let action = this.rollDice(3);
    let roll = this.rollDice(21);
    console.log('Enemy action roll is ' + action)
    if (action === 0) {
      this.enemyAttack(this.rollDice(roll))
    } else if (action === 1) {
      this.enemyDefend(this.rollDice(roll))
    } else if (action === 2) {
      this.enemyFlee(this.rollDice(roll))
    }
  }

  enemyAttack(attackRoll) {
    console.log('enemyAttack ' + attackRoll)
    let newPlayerHp = this.state.playerHp - this.rollDice(attackRoll);
    this.updatePlayerHp(newPlayerHp)
  }

  enemyDefend(defenseRoll) {
    console.log('enemyDefend ' + defenseRoll)
  }

  enemyFlee(fleeRoll) {
    console.log('enemyFlee ' + fleeRoll)
  }

  render() {
    return (
      <div id="BattleWindow">
        <div id="LeftWindow">
          <p>{this.state.playerHp}</p>
          <Player
            updateEnemyHp={this.updateEnemyHp}
            enemyHp={this.state.enemyHp}
            rollDice={this.rollDice}
            randomEnemyAction={this.randomEnemyAction}/>
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
