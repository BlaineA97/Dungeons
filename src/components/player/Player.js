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
    let newPlayerHp = this.props.currentPlayerHp - this.rollDice(21);;
    this.props.updatePlayerHp(newPlayerHp);
  }

  rollDice(number) {
    let roll = Math.floor(Math.random() * Math.floor(number));
    return roll
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
