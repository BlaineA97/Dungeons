import React, { Component } from 'react';
import './BattleResolution.css';

class BattleResolution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: null
    }
  }

  render() {
    return (
      <div id="BattleResolution">
        <div id="OptionsContainer">
          <div id="Outcome">Outcome</div>
          <div id="Outcome">{this.props.resolutionCondition}</div>
          <div id="Options">
            <button id="OptionOne" className="OptionItem" onClick={this.props.newGame}>New Game</button>
            <button id="OptionTwo" className="OptionItem" onClick={this.props.newGame}>New Game</button>
            <button id="OptionThree" className="OptionItem" onClick={this.props.newGame}>New Game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BattleResolution;
