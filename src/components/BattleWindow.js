import React, { Component } from 'react';
import './BattleWindow.css';
import Player from './player/Player';
import Enemy from './enemy/Enemy';
import Log from './log/Log';
import BattleResolution from './BattleResolution';

class BattleWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnNumber: 1,
      playerHp: 100,
      playerWeaponDmg: 12,
      playerArmorDef: 8,
      playerHit: 0,
      enemyHp: 100,
      enemyWeaponDmg: 6,
      enemyArmorDef: 4,
      enemyHit: 0,
      completeLog: [],
      turn: "player",
      battleResolutionIsHidden: true,
    }
    this.updatePlayerHp = this.updatePlayerHp.bind(this);
    this.updateEnemyHp = this.updateEnemyHp.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.updateLog = this.updateLog.bind(this);
    this.toggleTurn = this.toggleTurn.bind(this);
  }

  componentDidUpdate() { // Checks if Player or Enemy is dead
    if (this.state.playerHp <= 0) {
      this.setState({
        battleResolutionIsHidden: !this.state.battleResolutionIsHidden
      })
      // Player is dead
    } else if (this.state.enemyHp <= 0) {
      this.setState({
        battleResolutionIsHidden: !this.state.battleResolutionIsHidden
      })
      // Enemy is dead
    }
  }

  toggleTurn() {
      if (this.state.turn === "player") {
        this.setState({ turn: "enemy"});
        console.log("Current Turn: "+ this.state.turn)
      } else {
        this.setState({ turn: "player", turnNumber: this.state.turnNumber+1  });
        console.log("Current Turn: "+ this.state.turn)
      }
  }

  updatePlayerHp(roll) {
    console.log("updatePlayerHp")
    this.setState({ playerHp: roll });
  }

  updateEnemyHp(roll) {
    console.log("updateEnemyHp")
    this.setState({ enemyHp: roll });
  }

  rollDice(number) {
    let roll = Math.floor(Math.random() * Math.floor(number));
    return roll
  }

  updateLog(logType, roll) {
    let newLog = this.state.completeLog
    if (logType === "playerDefense") {
      newLog.push("Player defended for "+roll)
    } else if (logType === "enemyDefense") {
      newLog.push("Enemy defended for "+roll)
    } else if (logType === "playerAttack") {
      newLog.push("Player attacked for "+roll)
    } else if (logType === "enemyAttack") {
      newLog.push("Enemy attacked for "+roll)
    } else if (logType === "playerFlee") {
      newLog.push("Player Flee for "+roll)
    } else if (logType === "enemyFlee") {
      newLog.push("Enemy Flee for "+roll)
    }
    this.setState({ completeLog: newLog })
  }

  render() {
    return (
      <div id="BattleWindow">
        {!this.state.battleResolutionIsHidden && <BattleResolution
          playerHp={this.state.playerHp}
          enemyHp={this.state.enemyHp}
          rollDice={this.rollDice}/>}
        <div id="LeftWindow">
          <p>{this.state.playerHp}</p>
          <Player
            toggleTurn={this.toggleTurn}
            updateEnemyHp={this.updateEnemyHp}
            enemyHp={this.state.enemyHp}
            playerArmorDef={this.state.playerArmorDef}
            rollDice={this.rollDice}
            randomEnemyAction={this.randomEnemyAction}
            updateLog={this.updateLog}/>
        </div>
        <div id="CenterWindow">
          <Log
            turnNumber={this.state.turnNumber}
            completeLog={this.state.completeLog}
          />
        </div>
        <div id="RightWindow">
          <p>{this.state.enemyHp}</p>
          <Enemy
          toggleTurn={this.toggleTurn}
          turn={this.state.turn}
          playerHp={this.state.playerHp}
          enemyHp={this.state.enemyHp}
          updatePlayerHp={this.updatePlayerHp}
          rollDice={this.rollDice}
          updateLog={this.updateLog}
          enemyWeaponDmg={this.state.enemyWeaponDmg}
          enemyArmorDef={this.state.enemyArmorDef} />
        </div>
      </div>
    );
  }
}

export default BattleWindow;
