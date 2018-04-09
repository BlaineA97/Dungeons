import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const playerHp = e.target.value;
    this.props.updatePlayerHp(playerHp);
  }

  render() {
    return (
      <div id="Player">
        Player Window
        <div>
          <input type="text" onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default Player;
