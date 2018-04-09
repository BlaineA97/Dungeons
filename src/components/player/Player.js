import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let newEnemyHp = this.props.enemyHp - this.props.rollDice(21);
    this.props.updateEnemyHp(newEnemyHp);
    this.props.randomEnemyAction();
  }

  render() {
    return (
      <div id="Player">
        Player Window
        <div>
          <button onClick={this.handleClick}>Attack</button>
        </div>
      </div>
    );
  }
}

export default Player;
