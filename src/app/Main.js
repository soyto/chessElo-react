import React, {Component} from 'react';
import {HashRouter as Router, Route} from "react-router-dom";

import IndexPage from './components/pages/IndexPage';
import PlayerPage from './components/pages/PlayerPage';
import NotFoundPage from './components/pages/NotFoundPage';
import MatchPage from './components/pages/MatchPage';

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
          )} />

          <Route exact path="/m/:uuid" render={({match, history}) => {
            let matchInfo = this.game.getMatchInfo(match.params.uuid);

            if(!matchInfo) {
              history.push('/404/');
              return null;
            }

            return (<MatchPage matchInfo={matchInfo} />);
          }} />

          <Route exact path="/p/:uuid" render={({match, history}) => {
            let playerInfo = this.game.getPlayerInfo(match.params.uuid);

            if(!playerInfo) {
              history.push('/404/');
              return null;
            }

            return (<PlayerPage playerInfo={playerInfo} />);
          }} />


          <Route path="/404/" component={NotFoundPage}></Route>
        </Router>

    );
  }
}



export default Main;