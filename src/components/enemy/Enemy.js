import React, { Component } from 'react';
import './Enemy.css';

class Enemy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: null
    };
  }

  render() {
    return (
      <div id="Enemy">
        Enemy Window
      </div>
    );
  }
}

export default Enemy;
