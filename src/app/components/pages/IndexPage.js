import React from 'react';

import CompactScoreBoard from '../cards/CompactScoreBoard';
import CompactRoundsBoard from '../cards/CompactRoundsBoard';

class IndexPage extends React.Component {

  constructor(props) {
    super(props);

    this.onPrevRound = this.onPrevRound.bind(this);
    this.onNextRound = this.onNextRound.bind(this);
  }

  onPrevRound(args) {
    args.preventDefault();
    if(this.props.onPrevRound) { this.props.onPrevRound(); }
  }

  onNextRound(args) {
    args.preventDefault();
    if(this.props.onNextRound) { this.props.onNextRound(); }
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>
                Round {this.props.gameRound.number}
                <button className="btn btn-outline-primary btn-sm ml-2" disabled={this.props.gameRound.number === 1} onClick={this.onPrevRound}>&laquo; Prev</button>
                <button className="btn btn-outline-primary btn-sm ml-2" onClick={this.onNextRound}>Next &raquo;</button>
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