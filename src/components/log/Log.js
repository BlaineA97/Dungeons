import React, { Component } from 'react';
import './Log.css';

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: null
    }
  }

  render() {
    let logDisplay = this.props.completeLog
    let updatedLogDisplay = logDisplay.map((item) => <p key={item.id}>{item}</p>);
    updatedLogDisplay.reverse();
    return (
      <div id="Log">
        <p>Battle Log</p>
        <div>
          <ul>{updatedLogDisplay}</ul>
        </div>
      </div>
    );
  }
}

export default Log;
