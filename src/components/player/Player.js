import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHpPercentage: 100,
      isButtonDisabled: false,
      playerName: 'Character Name',
      playerPortraitList: [],
      portraitKey: 1,
      playerEditingName: false
    };
    this.handleAttackClick = this.handleAttackClick.bind(this);
    this.handleDefendClick = this.handleDefendClick.bind(this);
    this.handleFleeClick = this.handleFleeClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
    this.setupPlayerPortrait = this.setupPlayerPortrait.bind(this);
    this.handleNextPortraitClick = this.handleNextPortraitClick.bind(this);
    this.handlePreviousPortraitClick = this.handlePreviousPortraitClick.bind(this);
    this.handlePlayerNameInputChange = this.handlePlayerNameInputChange.bind(this);
    this.handlePlayerNameFullSizeClick = this.handlePlayerNameFullSizeClick.bind(this);
    this.handlePlayerNameSaveChanges = this.handlePlayerNameSaveChanges.bind(this);
  }

  componentWillMount() {
    this.setupPlayerPortrait()
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

  setupPlayerPortrait() {
    // Player Portrait Setup:
    const playerMageMale = {key: 1, name: 'playerMageMale'}
    const playerMageFemale = {key: 2, name: 'playerMageFemale'}
    const playerWarriorMale = {key: 3, name: 'playerWarriorMale'}
    const playerWarriorFemale = {key: 4, name: 'playerWarriorFemale'}
    const playerRogueMale = {key: 5, name: 'playerRogueMale'}
    const playerRogueFemale = {key: 6, name: 'playerRogueFemale'}
    const playerPortraitArray = [playerMageMale, playerMageFemale, playerWarriorMale, playerWarriorFemale, playerRogueMale, playerRogueFemale]
    let randomStarterPortrait = this.props.rollDice(playerPortraitArray.length)
    this.setState({
      playerPortraitList: playerPortraitArray,
      portraitKey: randomStarterPortrait
    })

  }
  handleNextPortraitClick() {
    const allPortraits = this.state.playerPortraitList;
    const currentPortraitKey = this.state.portraitKey;
    for (let i = 0; i < this.state.playerPortraitList.length; i++) {
      if (allPortraits[i] === allPortraits[this.state.portraitKey]) {
        console.log('Current Key: '+this.state.portraitKey+' | MATCH: '+i)
        if ((i + 1) >= this.state.playerPortraitList.length) {
          this.setState({ portraitKey: 0 })
        } else {
          let nextPortrait = i + 1
          this.setState({ portraitKey: nextPortrait })
        }
      }
    }
  }
  handlePreviousPortraitClick() {
    const allPortraits = this.state.playerPortraitList;
    const currentPortraitKey = this.state.portraitKey;
    for (let i = 0; i < this.state.playerPortraitList.length; i++) {
      if (allPortraits[i] === allPortraits[this.state.portraitKey]) {
        if ((i - 1) < 0) {
          let previousPortrait = allPortraits.length - 1;
          this.setState({ portraitKey: previousPortrait })
        } else {
          let previousPortrait = i - 1
          this.setState({ portraitKey: previousPortrait })
        }
      }
    }
  }

  handlePlayerNameInputChange(e) {
    this.setState({
      playerName: e.target.value
    })
  }

  handlePlayerNameFullSizeClick() {
    this.setState({
      playerEditingName: true,
    })
  }

  handlePlayerNameSaveChanges() {
    this.setState({
      playerEditingName: false
    })
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

    const playerNameChangeActive = (
      <div id="PlayerName">
        <input id ="PlayerNameInput" value={this.state.playerName} type='text' onChange={this.handlePlayerNameInputChange} />
        <button id="PlayerNameSubmit" value='Submit' onClick={this.handlePlayerNameSaveChanges}>Submit</button>
      </div>
    )
    const playerNameChangeInactive = (
      <div id="PlayerName">
        <h3 id ="PlayerNameFullSize" onClick={this.handlePlayerNameFullSizeClick}>
          {this.state.playerName}
        </h3>
      </div>
    )
    const characterName = this.state.playerEditingName ? (playerNameChangeActive) : (playerNameChangeInactive) ;

    return (
      <div id="Player">
          {characterName}
        <div id="PlayerHitPoint">
          <div id="PlayerHitPoint-bar" style={{width: `${this.state.currentHpPercentage}%`}}>
          </div>
          <div id="PlayerHitPoint-numbers"> {this.props.playerHp} / {this.props.playerMaxHp} </div>
        </div>
        <div id="Portrait">
          <button id="leftButton" className="playerPortraitButton" onClick={this.handlePreviousPortraitClick} > {"<"} </button>
          <img
            id="playerPortrait"
            src={require(`../../images/${this.state.playerPortraitList[this.state.portraitKey].name}.jpg`)} alt={`${this.props.playerName + " Image"}`}
          />
          <button id="rightButton" className="playerPortraitButton" onClick={this.handleNextPortraitClick}> {">"} </button>
        </div>
        {controls}
      </div>
    );
  }
}

export default Player;
