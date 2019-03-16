import React, {Component} from 'react';
import {Link} from 'react-router-dom';


function CompactRoundsBoardItem(match) {

  let whiteClass = match.result === 1 ? 'bg-won' : match.result === 0 ? 'bg-lose' : null;
  let blackClass = match.result === 0 ? 'bg-won' : match.result === 1 ? 'bg-lose' : null;

  return (
      <tr key={match.uuid}>
        <td><Link to={`/m/${match.uuid}`}>#{match.uuid.split('-')[0]}</Link></td>
        <td className={`text-right ${whiteClass}`}>
          {match.whitePlayer.player.name} ({match.whitePlayer.originalElo})
        </td>
        <td><i className="fa fa-minus"></i></td>
        <td className={`text-left ${blackClass}`}>
          {match.blackPlayer.player.name} ({match.blackPlayer.originalElo})
        </td>
      </tr>
  );
}

class CompactRoundsBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let maxItems = this.props.numElements ? this.props.numElements : 50;
    let matches = this.props.round.matches.slice();
    matches.sort((a, b) => (b.whitePlayer.originalElo + b.blackPlayer.originalElo) - (a.whitePlayer.originalElo + a.blackPlayer.originalElo));

    let items = matches.slice(0, maxItems).map(x => CompactRoundsBoardItem(x));


    return (
        <div className="card card-compact-rounds-board">
          <div className="card-header text-center">Best Matches. Round #{this.props.round.number}</div>
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
    );
  }
}
export default CompactRoundsBoard;