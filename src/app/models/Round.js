

class Round {

  get playDate() { return this._playDate; }
  get number() { return this._number; }
  get matches() { return this._matches; }
  get scoreBoard() { return this._scoreBoard; }

  constructor(roundNumber, matches, scoreBoard, date) {
    this._number = roundNumber;
    this._matches = matches;
    this._scoreBoard = scoreBoard;
    this._playDate = date;
  }
}

export default Round;