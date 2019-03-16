import React, {Component} from 'react';

class MatchPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Match {this.props.matchInfo.uuid}</h1>
              <h3><b>Match result:</b> {this.props.matchInfo.result === 1 ? 'White wins' : this.props.matchInfo.result === 0 ? 'Black wins' : 'Withdraw'}</h3>
              <h5><b>Date:</b> {this.props.matchInfo.date.toLocaleDateString()} {this.props.matchInfo.date.toLocaleTimeString()}</h5>
            </div>

            <div className="col-12 col-lg-6">
              <h2>White player</h2>

              <dl className="row">
                <dt className="col-sm-3">Name</dt>
                <dd className="col-sm-9">{this.props.matchInfo.whitePlayer.player.name}</dd>

                <dt className="col-sm-3">Chance to win</dt>
                <dd className="col-sm-9">{ (this.props.matchInfo.whitePlayer.chance * 100).toFixed(2)}%</dd>

                <dt className="col-sm-3">Original elo</dt>
                <dd className="col-sm-9">{this.props.matchInfo.whitePlayer.originalElo}</dd>

                <dt className="col-sm-3">Final elo</dt>
                <dd className="col-sm-9">{this.props.matchInfo.whitePlayer.finalElo}</dd>
              </dl>

            </div>

            <div className="col-12 col-lg-6">
              <h2>Black player</h2>

              <dl className="row">
                <dt className="col-sm-3">Name</dt>
                <dd className="col-sm-9">{this.props.matchInfo.blackPlayer.player.name}</dd>

                <dt className="col-sm-3">Chance to win</dt>
                <dd className="col-sm-9">{ (this.props.matchInfo.blackPlayer.chance * 100).toFixed(2)}%</dd>

                <dt className="col-sm-3">Original elo</dt>
                <dd className="col-sm-9">{this.props.matchInfo.blackPlayer.originalElo}</dd>

                <dt className="col-sm-3">Final elo</dt>
                <dd className="col-sm-9">{this.props.matchInfo.blackPlayer.finalElo}</dd>
              </dl>

            </div>


          </div>
        </div>
    );
  }
}

export default MatchPage;