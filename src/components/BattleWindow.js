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
      playerName: 'WickedAmusingBus',
      playerHp: 100,
      playerMaxHp: 100,
      playerWeaponDmg: 10,
      playerArmorDef: 5,
      playerDefending: false,
      playerHit: 0,
      enemyHp: 100,
      enemyMaxHp: 100,
      enemyWeaponDmg: 10,
      enemyArmorDef: 5,
      enemyDefending: false,
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
    this.togglePlayerDefendingTrue = this.togglePlayerDefendingTrue.bind(this);
    this.togglePlayerDefendingFalse = this.togglePlayerDefendingFalse.bind(this);
    this.toggleEnemyDefendingTrue = this.toggleEnemyDefendingTrue.bind(this);
    this.toggleEnemyDefendingFalse = this.toggleEnemyDefendingFalse.bind(this);
  }

  componentDidUpdate(prevProps, prevState) { // Checks if Player or Enemy is dead
    if (this.state.battleResolutionIsHidden === true) {
      if (this.state.playerHp <= 0) {
        this.toggleBattleResolution("Enemy defeated Player!")
      } else if (this.state.enemyHp <= 0) {
        this.toggleBattleResolution("Player defeated Enemy!")
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

  togglePlayerDefendingTrue() {
    this.setState({
      playerDefending: true
    })
  }
  togglePlayerDefendingFalse() {
    this.setState({
      playerDefending: false
    })
  }
  toggleEnemyDefendingTrue() {
    this.setState({
      enemyDefending: true
    })
  }
  toggleEnemyDefendingFalse() {
    this.setState({
      enemyDefending: false
    })
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
    let newLog = this.state.completeLog;
    let playerBlock = this.state.playerArmorDef;
    let enemyBlock = this.state.enemyArmorDef;
    if (logType === "playerDefense") {
      newLog.push("Player defended for "+roll)
    } else if (logType === "enemyDefense") {
      newLog.push("Enemy defended for "+roll)
    } else if (logType === "playerAttack") {
      newLog.push("Player attacked for "+roll)
    } else if (logType === "playerAttackWithBlock") {
      newLog.push("Player attacked for "+roll+" ("+enemyBlock+" blocked)");
    } else if (logType === "enemyAttack") {
      newLog.push("Enemy attacked for "+roll)
    } else if (logType === "enemyAttackWithBlock") {
      newLog.push("Enemy attacked for "+roll+" ("+playerBlock+" blocked)");
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
        <div>
        {!this.state.battleResolutionIsHidden &&
          <BattleResolution
          newGame={this.newGame}
          resolutionCondition={this.state.resolutionCondition}
        />}
        </div>

        <div id="LeftWindow">
          <Player
            playerName={this.state.playerName}
            toggleEnemyDefendingFalse={this.toggleEnemyDefendingFalse}
            toggleEnemyDefendingTrue={this.toggleEnemyDefendingTrue}
            togglePlayerDefendingTrue={this.togglePlayerDefendingTrue}
            enemyDefending={this.state.enemyDefending}
            enemyArmorDef={this.state.enemyArmorDef}
            playerDefending={this.state.playerDefending}
            battleResolutionIsHidden={this.state.battleResolutionIsHidden}
            toggleTurn={this.toggleTurn}
            toggleBattleResolution={this.toggleBattleResolution}
            updateEnemyHp={this.updateEnemyHp}
            enemyHp={this.state.enemyHp}
            playerHp={this.state.playerHp}
            playerMaxHp={this.state.playerMaxHp}
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
          <Enemy
          toggleEnemyDefendingTrue={this.toggleEnemyDefendingTrue}
          togglePlayerDefendingFalse={this.togglePlayerDefendingFalse}
          togglePlayerDefendingTrue={this.togglePlayerDefendingTrue}
          playerDefending={this.state.playerDefending}
          playerArmorDef={this.state.playerArmorDef}
          toggleBattleResolution={this.toggleBattleResolution}
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
