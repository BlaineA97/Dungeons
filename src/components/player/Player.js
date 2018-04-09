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
  }

  handleAttackClick() {
    let playerAttackRoll = this.props.rollDice(21)
    let newEnemyHp = this.props.enemyHp - playerAttackRoll;
    this.props.updateEnemyHp(newEnemyHp);
    this.props.updateLog("playerAttack", playerAttackRoll);
    this.props.toggleTurn()
  }

  handleDefendClick() {
    let playerDefenseRoll = this.props.rollDice(this.props.playerArmorDef);
    this.props.updateLog("playerDefense", playerDefenseRoll);
    this.props.toggleTurn()
  }

  handleFleeClick() {
    let playerFleeRoll = this.props.rollDice(5);
    this.props.updateLog("playerFlee", playerFleeRoll);
    this.props.toggleTurn()
  }

  render() {
    const controls = this.props.battleResolutionIsHidden ? (
      <div id="Controls">
        <button onClick={this.handleAttackClick}>Attack</button>
        <button onClick={this.handleDefendClick}>Defend</button>
        <button onClick={this.handleFleeClick}>Flee</button>
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
