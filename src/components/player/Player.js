import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: null
    }
  }
  render() {
    return (
      <div id="Player">
        Player Window
      </div>
    );
  }
}

export default Player;
