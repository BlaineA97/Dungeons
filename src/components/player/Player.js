import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHpPercentage: 100,
      isButtonDisabled: false,
      playerPortrait: "playerRogueFemale",
      playerName: 'Blaine'
    };
    this.handleAttackClick = this.handleAttackClick.bind(this);
    this.handleDefendClick = this.handleDefendClick.bind(this);
    this.handleFleeClick = this.handleFleeClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) { // Checks if Player or Enemy is dead
    if (this.props.playerHp != prevProps.playerHp) {
      let newHpPercentage = this.props.playerMaxHp - (this.props.playerMaxHp - this.props.playerHp)
      this.setState({
        currentHpPercentage: newHpPercentage
      })
    }
  }

  handleAttackClick() {
    this.setState({
      isButtonDisabled: true
    });
    let attackRoll = this.props.rollDice(21);
    let block = this.props.enemyArmorDef;
    let newEnemyHp;
    if (this.props.enemyDefending === true) {
      let newAttackRoll = attackRoll - block;
      // Check to make sure the block does not add health to the enemy.
      if (newAttackRoll < 0) {
        newAttackRoll = 0;
      }
      newEnemyHp = this.props.enemyHp - newAttackRoll;
      this.props.updateLog("playerAttackWithBlock", attackRoll);
      this.props.toggleEnemyDefendingFalse();
    } else {
      newEnemyHp = this.props.enemyHp - attackRoll;
      this.props.updateLog("playerAttack", attackRoll);
    }
    this.props.updateEnemyHp(newEnemyHp);
    this.props.toggleTurn();
    setTimeout(() => this.setState({ isButtonDisabled: false }), 1500);
  }

  handleDefendClick() {
    this.setState({
      isButtonDisabled: true
    });
    this.props.updateLog("playerDefense", this.props.playerArmorDef);
    this.props.togglePlayerDefendingTrue();
    this.props.toggleTurn();
    setTimeout(() => this.setState({ isButtonDisabled: false }), 1500);
  }

  handleFleeClick() {
    this.setState({
      isButtonDisabled: true
    });
    let playerFleeRoll = this.props.rollDice(21);
    let fleeDifficultyRoll = this.props.rollDice(21);
    if ( (playerFleeRoll / 2) >= fleeDifficultyRoll) {
      this.props.updateLog("playerFleeSuccess", playerFleeRoll);
      this.props.toggleBattleResolution("Player fled!")
    } else {
      this.props.updateLog("playerFleeFailure", playerFleeRoll);
    }
    this.props.toggleTurn()
    setTimeout(() => this.setState({ isButtonDisabled: false }), 1500);
  }

  handleEndClick() {
    this.setState({
      isButtonDisabled: true
    });
    this.props.toggleBattleResolution("Player Ended Battle!")
    setTimeout(() => this.setState({ isButtonDisabled: false }), 1500);
  }

  handleNextPortraitClick() {
      console.log('next')
  }
  handlePreviousPortraitClick() {
      console.log('previous')
  }

  render() {
    const playerControlsActive = (
      <div id="Controls">
        <button className="playerButton" onClick={this.handleAttackClick} disabled={this.state.isButtonDisabled} > Attack </button>
        <button className="playerButton" onClick={this.handleDefendClick} disabled={this.state.isButtonDisabled} > Defend </button>
        <button className="playerButton" onClick={this.handleFleeClick} disabled={this.state.isButtonDisabled} > Flee </button>
        <button className="playerButton" onClick={this.handleEndClick} disabled={this.state.isButtonDisabled} > End </button>
      </div>
    )
    const playerControlsInactive = (
      <div id="Controls">
        <button className="playerButton" > Attack </button>
        <button className="playerButton" > Defend </button>
        <button className="playerButton" > Flee </button>
        <button className="playerButton" > End </button>
      </div>
    )

    const controls = this.props.battleResolutionIsHidden ? (playerControlsActive) : (playerControlsInactive) ;

    return (
      <div id="Player">
        <div id="PlayerName">{this.state.playerName}</div>
        <div id="PlayerHitPoint">
          <div id="PlayerHitPoint-bar" style={{width: `${this.state.currentHpPercentage}%`}}>
            {this.props.playerHp} / {this.props.playerMaxHp}
          </div>
        </div>
        <div id="Portrait">
          <button id="leftButton" className="playerPortraitButton" onClick={this.handlePreviousPortraitClick} > {"<"} </button>
          <img
            id="playerPortrait"
            src={require(`../../images/${this.state.playerPortrait}.jpg`)} alt={`${this.props.playerName + " Image"}`}
          />
          <button id="rightButton" className="playerPortraitButton" onClick={this.handleNextPortraitClick}> {">"} </button>
        </div>
        {controls}
      </div>
    );
  }
}

export default Player;
