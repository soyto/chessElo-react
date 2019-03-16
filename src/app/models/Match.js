import uuid from 'uuid/v1';
import is from 'is_js';
import Player from './Player';

/**
 *
 */
class Match {

  /**
   *
   * @returns {string}
   */
  get uuid() {
    return this._id;
  }

  /**
   *
   * @returns {MatchPlayer}
   */
  get whitePlayer() {
    return this._whitePlayer;
  }

  /**
   *
   * @returns {MatchPlayer}
   */
  get blackPlayer() {
    return this._blackPlayer;
  }

  /**
   * a number that express what was the result of the match:
   * - null:  Match wasn't realized
   * - 1: white won
   * - 0: black won
   * - 0.5: withdraws
   * @returns {Number}
   */
  get result() {
    return this._result;
  }

  /**
   * The date where this match was played
   * @returns {null}
   */
  get date() {
    return this._date;
  }

  /**
   *
   * @param {Player} whitePlayer
   * @param {Player} blackPlayer
   */
  constructor(whitePlayer, blackPlayer) {

    if(is.null(whitePlayer) || !(whitePlayer instanceof Player)) {
      throw new Error('White player should be an instance of Player');
    }

    if(is.null(blackPlayer) || !(blackPlayer instanceof Player)) {
      throw new Error('Black player should be an instance of Player');
    }

    this._id = uuid();

    let qA = Math.pow(10, whitePlayer.elo / 400);
    let qB = Math.pow(10, blackPlayer.elo / 400);

    let whiteChance = qA / (qA + qB);
    let blackChance = qB / (qA + qB);

    this._whitePlayer = new MatchPlayer(whitePlayer, whiteChance);
    this._blackPlayer = new MatchPlayer(blackPlayer, blackChance);

    //Match doesn't have a result yet
    this._result = null;

    //The date where the match was done
    this._date = null;
  }

  /**
   * Plays the match, indicating what's the match result and when it was played
   * @param {Number} matchResult
   * @param {Date} date
   */
  play(matchResult, date) {

    if(this._result != null) { throw new Error('match was already played'); }

    if([1, 0.5, 0].indexOf(matchResult) < 0 ) { throw new Error('matchResult should be 1, 0.5 or 0 values'); }

    this._result = matchResult;
    this._date = date;

    switch(matchResult) {
      case 1:
        this.whitePlayer.player.elo += this.whitePlayer.onWin;
        this.blackPlayer.player.elo += this.blackPlayer.onLose;

        break;

      case 0.5:

        this.whitePlayer.player.elo += this.whitePlayer.onWithdraw;
        this.blackPlayer.player.elo += this.blackPlayer.onWithdraw;

        break;


      case 0:
        this.whitePlayer.player.elo += this.whitePlayer.onLose;
        this.blackPlayer.player.elo += this.blackPlayer.onWin;

        break;

    }

    //Update match final elo
    this.whitePlayer.finalElo = this.whitePlayer.player.elo;
    this.blackPlayer.finalElo = this.blackPlayer.player.elo;
  }
}


class MatchPlayer {

  get player() { return this._player; }
  get chance() { return this._chance; }
  get kFactor() { return this._kFactor; }
  get originalElo() { return this._originalElo; }
  get finalElo() { return this._finalElo; }
  set finalElo(newElo) { this._finalElo = newElo; }


  get onWin() { return this._onWin; }
  get onLose() { return this._onLose; }
  get onWithdraw() { return this._onWithdraw; }

  constructor(player, chance) {
    this._player = player;
    this._chance = chance;
    this._kFactor = this._player.elo > 2400 ? 15 : 30;

    this._originalElo = player.elo;
    this._finalElo = null;

    this._onWin = Math.round(this._kFactor * (1 - chance));
    this._onLose = Math.round(this._kFactor * (0 - chance));
    this._onWithdraw = Math.round(this._kFactor * (0.5 - chance));
  }
}


export default Match;