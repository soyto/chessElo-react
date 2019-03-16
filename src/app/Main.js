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

    this.state = {
      gameRound: this.game.getLastRound()
    };

    this.onGenerateNextRound = this.onGenerateNextRound.bind(this);
  }

  onGenerateNextRound() {
    this.game.playNextRound();
    this.setState({
      gameRound: this.game.getLastRound()
    })
  }

  render() {
    return (
        <Router>
          <Navbar location={this.props.location}></Navbar>

          <Route exact path="/" render={() => (
              <IndexPage gameRound={this.state.gameRound} onGenerateNextRound={this.onGenerateNextRound}/>
              )}></Route>
        </Router>

    );
  }
}



export default Main;