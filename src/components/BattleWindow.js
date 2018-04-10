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
      playerHp: 1,
      playerWeaponDmg: 12,
      playerArmorDef: 8,
      playerHit: 0,
      enemyHp: 1,
      enemyWeaponDmg: 6,
      enemyArmorDef: 4,
      enemyHit: 0,
      completeLog: [],
      turn: "player",
      battleResolutionIsHidden: true,
      resolutionCondition: ''
    }
    this.updatePlayerHp = this.updatePlayerHp.bind(this);
    this.updateEnemyHp = this.updateEnemyHp.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.updateLog = this.updateLog.bind(this);
    this.toggleTurn = this.toggleTurn.bind(this);
    this.newGame = this.newGame.bind(this);
    this.toggleBattleResolution = this.toggleBattleResolution.bind(this);
  }

  componentDidUpdate(prevProps, prevState) { // Checks if Player or Enemy is dead
    if (this.state.battleResolutionIsHidden == true) {
      if (this.state.playerHp <= 0 || this.state.enemyHp <= 0) {
        this.toggleBattleResolution()
      }
    }
  }

  toggleBattleResolution(resolutionCondition) {
    this.setState({
      battleResolutionIsHidden: !this.state.battleResolutionIsHidden,
      resolutionCondition: resolutionCondition
    })
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
    } else if (logType === "playerFleeSuccess") {
      newLog.push("Player Flee succeeds with: "+roll)
    } else if (logType === "enemyFlee") {
      newLog.push("Enemy Flee for "+roll)
    } else if (logType === "playerFleeFailure") {
      newLog.push("Player Flee fails with: "+roll)
    } else if (logType === "enemyFlee") {
      newLog.push("Enemy Flee for "+roll)
    }
    this.setState({ completeLog: newLog })
  }

  newGame() {
    this.setState({
      enemyHp: 100,
      playerHp: 100,
      turnNumber: 1,
      turn: "player",
      battleResolutionIsHidden: true,
      completeLog: []
    })
  }

  render() {
    return (
      <div id="BattleWindow">
        {!this.state.battleResolutionIsHidden && <BattleResolution
          newGame={this.newGame}
          resolutionCondition={this.state.resolutionCondition}
        />}
        <div id="LeftWindow">
          <p>{this.state.playerHp}</p>
          <Player
            battleResolutionIsHidden={this.state.battleResolutionIsHidden}
            toggleTurn={this.toggleTurn}
            toggleBattleResolution={this.toggleBattleResolution}
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
