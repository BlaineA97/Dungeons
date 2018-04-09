import React, { Component } from 'react';
import './BattleWindow.css';
import Player from './player/Player';
import Enemy from './enemy/Enemy';
import Log from './log/Log';

class BattleWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHp: 100,
      playerWeaponDmg: 12,
      playerArmorDef: 8,
      playerHit: 0,
      enemyHp: 100,
      enemyWeaponDmg: 6,
      enemyArmorDef: 4,
      enemyHit: 0,
      completeLog: ["bob"],
    }
    this.updatePlayerHp = this.updatePlayerHp.bind(this);
    this.updateEnemyHp = this.updateEnemyHp.bind(this);
    this.enemyAttack = this.enemyAttack.bind(this);
    this.enemyDefend = this.enemyDefend.bind(this);
    this.enemyFlee = this.enemyFlee.bind(this);
    this.randomEnemyAction = this.randomEnemyAction.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.updateLog = this.updateLog.bind(this);
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
    console.log('randomEnemyAction action ' + action)
    // console.log('randomEnemyAction playerDefenseRoll ' + playerDefenseRoll)
    if (action === 0) {
      this.enemyAttack(this.rollDice(this.state.enemyWeaponDmg))
    } else if (action === 1) {
      this.enemyDefend(this.rollDice(this.state.enemyArmorDef))
    } else if (action === 2) {
      this.enemyFlee(this.rollDice(21))
    }
  }

  enemyAttack(attackRoll) {
    console.log('enemyAttack ' + attackRoll)
    let newPlayerHp = this.state.playerHp - this.rollDice(attackRoll);
    this.updatePlayerHp(newPlayerHp);
  }

  enemyDefend(defenseRoll) {
    console.log('enemyDefend ' + defenseRoll)
    // let newPlayerHp = this.rollDice(defenseRoll) - this.state.playerArmorDef
    // newPlayerHp = this.state.playerHp
  }

  enemyFlee(fleeRoll) {
    console.log('enemyFlee ' + fleeRoll)
  }

  updateLog(logType, roll) {
    let newLog;
    newLog = this.state.completeLog
    if (logType === "defense") {
      console.log("Player defended for "+roll)
      newLog.push("Player defended for "+roll)
    } else if (logType === "attack") {
      console.log("Player attacked for "+roll)
      newLog.push("Player attacked for "+roll)
    }
    this.setState({ completeLog: newLog })
  }

  render() {
    return (
      <div id="BattleWindow">
        <div id="LeftWindow">
          <p>{this.state.playerHp}</p>
          <Player
            updateEnemyHp={this.updateEnemyHp}
            enemyHp={this.state.enemyHp}
            playerArmorDef={this.state.playerArmorDef}
            rollDice={this.rollDice}
            randomEnemyAction={this.randomEnemyAction}
            updateLog={this.updateLog}/>
        </div>
        <div id="CenterWindow">
          <Log
            completeLog={this.state.completeLog}
          />
        </div>
        <div id="RightWindow">
          <p>{this.state.enemyHp}</p>
          <Enemy />
        </div>
      </div>
    );
  }
}

export default BattleWindow;
