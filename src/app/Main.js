import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import IndexPage from './components/pages/IndexPage';
import Navbar from './components/Navbar';

import Game from './models/Game';

class Main extends Component {
  constructor(props) {
    super(props);

    //Generate a game and store it as variable
    this.game = new Game();
    this.currentRoundNumber = this.game.rounds[this.game.rounds.length - 1].number;

    this.state = {
      gameRound: this.game.getLastRound()
    };


    this.onPrevRound = this.onPrevRound.bind(this);
    this.onNextRound = this.onNextRound.bind(this);
  }

  onPrevRound() {

    if(this.currentRoundNumber === 1) { return; }

    this.currentRoundNumber -= 1;
    this.setState({
      gameRound: this.game.rounds[this.currentRoundNumber - 1]
    });

  }

  onNextRound() {

    if(this.currentRoundNumber + 1 > this.game.rounds.length) {
      this.game.playNextRound();
    }

    this.currentRoundNumber += 1;

    this.setState({
      gameRound: this.game.rounds[this.currentRoundNumber - 1]
    });
  }

  render() {
    return (
        <Router>
          <Navbar location={this.props.location}></Navbar>

          <Route exact path="/" render={() => (
              <IndexPage gameRound={this.state.gameRound}
                         onPrevRound={this.onPrevRound}
                         onNextRound={this.onNextRound}/>
              )}></Route>
        </Router>

    );
  }
}



export default Main;