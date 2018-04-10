import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: null
    };
    this.handleAttackClick = this.handleAttackClick.bind(this);
    this.handleDefendClick = this.handleDefendClick.bind(this);
    this.handleFleeClick = this.handleFleeClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
  }

  handleAttackClick() {
    let attackRoll = this.props.rollDice(21);
    let block = this.props.enemyArmorDef;
    let newEnemyHp;
    if (this.props.enemyDefending === true) {
      let newAttackRoll = attackRoll - block;
      // Check to make sure the block does not add health to the enemy.
      if (newAttackRoll < 0) {
        newAttackRoll = 0;
      }
      newEnemyHp = this.props.enemyHp - newAttackRoll;
      this.props.updateLog("playerAttackWithBlock", attackRoll);
      this.props.toggleEnemyDefendingFalse();
    } else {
      newEnemyHp = this.props.enemyHp - attackRoll;
      this.props.updateLog("playerAttack", attackRoll);
    }
    this.props.updateEnemyHp(newEnemyHp);
    this.props.toggleTurn();
  }

  handleDefendClick() {
    this.props.updateLog("playerDefense", this.props.playerArmorDef);
    this.props.togglePlayerDefendingTrue();
    this.props.toggleTurn();
  }

  handleFleeClick() {
    let playerFleeRoll = this.props.rollDice(21);
    let fleeDifficultyRoll = this.props.rollDice(21);
    if ( (playerFleeRoll / 2) >= fleeDifficultyRoll) {
      this.props.updateLog("playerFleeSuccess", playerFleeRoll);
      this.props.toggleBattleResolution("Player fled!")
    } else {
      this.props.updateLog("playerFleeFailure", playerFleeRoll);
    }
    this.props.toggleTurn()
  }

  handleEndClick() {
    this.props.toggleBattleResolution("Player Ended Battle!")
  }

  render() {
    const controls = this.props.battleResolutionIsHidden ? (
      <div id="Controls">
        <button
          className="playerButton"
          onClick={this.handleAttackClick}
          > Attack </button>
        <button
          className="playerButton"
          onClick={this.handleDefendClick}
          > Defend </button>
        <button
          className="playerButton"
          onClick={this.handleFleeClick}
          > Flee </button>
        <button
          className="playerButton"
          onClick={this.handleEndClick}
          > End </button>
      </div>
    ) : (
      <div id="Controls">
      </div>
    ) ;

    return (
      <div id="Player">
        <div id="Title">Player Window</div>
        {controls}
      </div>
    );
  }
}

export default Player;
