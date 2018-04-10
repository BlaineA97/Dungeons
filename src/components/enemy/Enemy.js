import React, { Component } from 'react';
import './Enemy.css';

class Enemy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: null
    };
    this.enemyAttack = this.enemyAttack.bind(this);
    this.enemyDefend = this.enemyDefend.bind(this);
    this.enemyFlee = this.enemyFlee.bind(this);
    this.randomEnemyAction = this.randomEnemyAction.bind(this);
  }

  randomEnemyAction() {
    let action = this.props.rollDice(101);
    if (action === 100) {
      this.enemyFlee(this.props.rollDice(21))
    } else if (action <= 49) {
      this.enemyDefend(this.props.rollDice(this.props.enemyArmorDef))
    } else if (action <= 99) {
      this.enemyAttack(this.props.rollDice(this.props.enemyWeaponDmg))
    }
  }

  enemyAttack(attackRoll) {
    let block = this.props.playerArmorDef;
    let newPlayerHp;
    let newAttackRoll;
    if (this.props.playerDefending === true) {
      newAttackRoll = attackRoll - block;
      // Check to make sure the block does not add health to the player.
      if (newAttackRoll < 0) {
        newAttackRoll = 0;
      }
      newPlayerHp = this.props.playerHp - newAttackRoll;
      this.props.updateLog("enemyAttackWithBlock", attackRoll);
      this.props.togglePlayerDefendingFalse();
    } else {
      newPlayerHp = this.props.playerHp - attackRoll;
      this.props.updateLog("enemyAttack", attackRoll);
    }
    this.props.updatePlayerHp(newPlayerHp);
    this.props.toggleTurn()
  }

  enemyDefend(defenseRoll) {
    this.props.updateLog("enemyDefense", defenseRoll);
    // let newPlayerHp = this.rollDice(defenseRoll) - this.state.playerArmorDef
    // newPlayerHp = this.state.playerHp
    this.props.toggleTurn()
  }

  enemyFlee(fleeRoll) {
    let enemyFleeRoll = this.props.rollDice(21);
    let fleeDifficultyRoll = this.props.rollDice(21);
    if ( (enemyFleeRoll / 2) >= fleeDifficultyRoll) {
      this.props.updateLog("enemyFleeSuccess", enemyFleeRoll);
      this.props.toggleBattleResolution("Enemy fled!")
    } else {
      this.props.updateLog("enemyFleeFailure", enemyFleeRoll);
    }
    this.props.toggleTurn()
  }

  render() {
    if (this.props.turn === "enemy") {
      this.randomEnemyAction()
    }
    return (
      <div id="Enemy">
        <div id="Title">Enemy Window</div>
        <div id="Stats">
          <span id="hp">Hp: {this.props.enemyHp}</span>
        </div>
      </div>
    );
  }
}

export default Enemy;
