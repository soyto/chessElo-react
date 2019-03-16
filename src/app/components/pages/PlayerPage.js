import React, {Component} from 'react';
import {Link} from "react-router-dom";

class PlayerPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let matches = this.props.playerInfo.matches.slice();
    let items = matches.map(x => {
      return CompactPlayerMatchesItem(this.props.playerInfo.player, x.match);
    });

    return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>{this.props.playerInfo.player.name} ({this.props.playerInfo.player.elo})</h1>
            </div>
            <div className="col-12">
              <div className="card card-compact-rounds-board">
                <div className="card-header text-center">Matches for {this.props.playerInfo.player.name}</div>
                <table className="table table-striped table-sm">
                  <thead>
                  <tr>
                    <th></th>
                    <th className="text-right">White player</th>
                    <th></th>
                    <th className="text-left">Black player</th>
                  </tr>
                  </thead>
                  <tbody>
                  {items}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

function CompactPlayerMatchesItem(player, match) {

  let whiteClass = match.result === 1 ? 'bg-won' : match.result === 0 ? 'bg-lose' : null;
  let blackClass = match.result === 0 ? 'bg-won' : match.result === 1 ? 'bg-lose' : null;

  let whiteBold = match.whitePlayer.player.uuid == player.uuid ? 'font-weight-bold' : '';
  let blackBold = match.blackPlayer.player.uuid == player.uuid ? 'font-weight-bold' : '';

  return (
      <tr key={match.uuid}>
        <td><Link to={`/m/${match.uuid}`}>#{match.uuid.split('-')[0]}</Link></td>
        <td className={`text-right ${whiteClass} ${whiteBold}`}>
          {match.whitePlayer.player.name} ({match.whitePlayer.originalElo})
        </td>
        <td><i className="fa fa-minus"></i></td>
        <td className={`text-left ${blackClass} ${blackBold}`}>
          {match.blackPlayer.player.name} ({match.blackPlayer.originalElo})
        </td>
      </tr>
  );
}

export default PlayerPage;