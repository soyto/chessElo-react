import React from 'react';

import CompactScoreBoard from '../cards/CompactScoreBoard';
import CompactRoundsBoard from '../cards/CompactRoundsBoard';

class IndexPage extends React.Component {

  constructor(props) {
    super(props);

    this.onGenerateNextRound = this.onGenerateNextRound.bind(this);
  }

  onGenerateNextRound(args) {
    args.preventDefault();

    if(this.props.onGenerateNextRound) {
      this.props.onGenerateNextRound();
    }

  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Round {this.props.gameRound.number}
              <button className="btn btn-outline-primary btn-sm ml-2" onClick={this.onGenerateNextRound}>Generate next round</button>
              </h1>
            </div>
            <div className="col-12 col-lg-4">
              <CompactScoreBoard round={this.props.gameRound}/>
            </div>
            <div className="col-12 col-lg-8">
              <CompactRoundsBoard round={this.props.gameRound}/>
            </div>
          </div>
        </div>
    );
  }
}

export default IndexPage;