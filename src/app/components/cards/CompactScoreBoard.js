import React from 'react';
import {Link} from 'react-router-dom';

function CompactScoreBoardItem(props) {

  let arrow = null;

  if(props.positionChange > 0) {
    arrow = <i className="fa fa-arrow-up"></i>
  }
  else if(props.positionChange < 0) {
    arrow = <i className="fa fa-arrow-down"></i>
  }

  return (
      <tr key={props.player.uuid}>
        <td><Link to={`/p/${props.player.uuid}`}>#{props.position}</Link></td>
        <td>{arrow} {props.positionChange}</td>
        <td>{props.player.name}</td>
        <td>{props.player.elo}</td>
      </tr>
  )
}

class CompactScoreBoard extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    let maxItems = this.props.numElements ? this.props.numElements : 50;
    let items = this.props.round.scoreBoard.items.slice(0, maxItems ).map(x => CompactScoreBoardItem(x));

    return (
        <div className="card card-compact-score-board">
          <div className="card-header text-center">Best players. Round #{this.props.round.number}</div>
          <table className="table table-striped table-sm">
            <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Elo</th>
            </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
          <div className="card-footer text-center">
            <Link to={`/round/${this.props.round.number}/scoreboard`}>View more</Link>
          </div>
        </div>
    );
  }
}


export default CompactScoreBoard;