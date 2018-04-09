import React, { Component } from 'react';
import './Enemy.css';

class Enemy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let newEnemyHp = this.props.currentEnemyHp - this.rollDice(21);;
    this.props.updateEnemyHp(newEnemyHp);
  }

  render() {
    return (
      <div id="Enemy">
        Enemy Window
        <div>
          <button onClick={this.handleClick}>Attack</button>
        </div>
      </div>
    );
  }
}

export default Enemy;
