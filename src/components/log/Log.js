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
        <div id='backdrop'>
          <div id='backdropBorder'>
            <div id="Title">Battle Log</div>
            <div id="TurnCounter">Turn: {this.props.turnNumber}</div>
            <div id="LogDisplay">
              <ul>{updatedLogDisplay}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Log;
