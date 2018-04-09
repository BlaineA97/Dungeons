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
    this.props.randomEnemyAction();
    this.props.updateLog("attack", playerAttackRoll);
  }

  handleDefendClick() {
    let playerDefenseRoll = this.props.rollDice(this.props.playerArmorDef);
    this.props.randomEnemyAction(playerDefenseRoll);
    this.props.updateLog("defense", playerDefenseRoll);
  }

  handleFleeClick() {
  }

  render() {
    return (
      <div id="Player">
        Player Window
        <div>
          <button onClick={this.handleAttackClick}>Attack</button>
          <button onClick={this.handleDefendClick}>Defend</button>
          <button onClick={this.handleFleeClick}>Flee</button>
        </div>
      </div>
    );
  }
}

export default Player;
