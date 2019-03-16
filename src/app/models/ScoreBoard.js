
class ScoreBoard {

  get items() { return this._items; }


  constructor(players, previousScoreBoard) {
    this._items = [];

    let newPlayersArr = players.slice();
    newPlayersArr.sort((a, b) => b.elo - a.elo);

    for(let i = 0; i < newPlayersArr.length; i++) {

      let player = newPlayersArr[i];

      let previousItem = null;

      //If there was a previous scorde board
      if(previousScoreBoard) {
        previousItem = previousScoreBoard.items.filter(x => x.player.uuid == player.uuid).shift();
      }

      let item = new ScoreBoardItem(player, i + 1, previousItem);

      this._items.push(item);
    }
  }

}

class ScoreBoardItem {

  get position() { return this._position; }
  get positionChange() { return this._positionChange; }
  get player() { return this._player; }


  constructor(player, position, previousItem) {

    this._player = player;
    this._position = position;
    this._positionChange = 0;

    if(previousItem != null) {
      this._positionChange = previousItem.position - this.position;
    }

  }
}

export default ScoreBoard;