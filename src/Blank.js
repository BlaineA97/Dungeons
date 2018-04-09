import React, { Component } from 'react';
import './Blank.css';

class Blank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: null
    }
  }
  render() {
    return (
      <div id="Blank">

      </div>
    );
  }
}

export default Blank;
