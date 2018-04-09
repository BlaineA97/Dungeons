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
    let action = this.props.rollDice(3);
    if (action === 0) {
      console.log('randomEnemyAction action Attack')
      this.enemyAttack(this.props.rollDice(this.props.enemyWeaponDmg))
    } else if (action === 1) {
      console.log('randomEnemyAction action Defense')
      this.enemyDefend(this.props.rollDice(this.props.enemyArmorDef))
    } else if (action === 2) {
      console.log('randomEnemyAction action Flee')
      this.enemyFlee(this.props.rollDice(21))
    }
  }

  enemyAttack(attackRoll) {
    console.log('enemyAttack ' + attackRoll)
    let newPlayerHp = this.props.playerHp - this.props.rollDice(attackRoll);
    this.props.updatePlayerHp(newPlayerHp);
    this.props.updateLog("enemyAttack", attackRoll);
    this.props.toggleTurn()
  }

  enemyDefend(defenseRoll) {
    console.log('enemyDefend ' + defenseRoll)
    this.props.updateLog("enemyDefense", defenseRoll);
    // let newPlayerHp = this.rollDice(defenseRoll) - this.state.playerArmorDef
    // newPlayerHp = this.state.playerHp
    this.props.toggleTurn()
  }

  enemyFlee(fleeRoll) {
    console.log('enemyFlee ' + fleeRoll)
    this.props.updateLog("enemyFlee", fleeRoll);
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
