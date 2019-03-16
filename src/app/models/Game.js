
import Player from './Player';
import Round from './Round';
import Match from './Match';
import ScoreBoard from './ScoreBoard';
import eloService from '../services/EloService';

class Game {

  get players() { return this._players; }
  get rounds() { return this._rounds; }

  constructor() {
    this._players = _generatePlayers();
    this._rounds = [];

    _generatePlayers();

    //Generate first round
    this.playNextRound();
  }

  /**
   *
   */
  playNextRound() {
    let previousScoreBoard = this.rounds.length > 0 ? this.rounds[this.rounds.length - 1].scoreBoard : null;
    let roundNumber = this.rounds.length + 1;
    let date = new Date();
    let matches = _generateMatches(this.players, date);
    let scoreBoard = new ScoreBoard(this.players, previousScoreBoard);

    this._rounds.push(new Round(roundNumber, matches, scoreBoard, date));
  }

  /**
   * Retrieves the last round
   * @returns {Round}
   */
  getLastRound() {
    if(this.rounds.length === 0) { return null;}
    return this.rounds[this.rounds.length - 1];
  }

  /**
   * Retrieves player Info
   * @param playerUuid
   * @returns {*}
   */
  getPlayerInfo(playerUuid) {
    let playerInfo = {
      player: null,
      matches: []
    };

    playerInfo.player = this.players.filter(x => x.uuid == playerUuid).shift();
    if(!playerInfo.player) { return null; }

    //Add player matches
    for(let round of this.rounds) {
      let match = round.matches
          .filter(x => x.whitePlayer.player.uuid == playerUuid || x.blackPlayer.player.uuid == playerUuid)
          .shift();

      if(match) {
        playerInfo.matches.push({
          roundNumber: round.number,
          match: match
        });
      }
    }

    return playerInfo;
  }

  getMatchInfo(matchUuid) {

    let match = null;

    for(let round of this.rounds) {
      match = round.matches.filter(x => x.uuid == matchUuid).shift();
      if(match) { break; }
    }


    return match;
  }

}

//At first moment we will generate matches just making em randomly
function _generateMatches(players, date) {
  let result = [];

  let playersRandom = players.slice();
  playersRandom.sort((a, b) => Math.random() * 10 - 5);

  //Split array
  let items = playersRandom.splice(0, Math.floor(playersRandom.length / 2));
  let maxLength = Math.min(items.length, playersRandom.length);

  for(let i = 0; i < maxLength; i++) {
    let whitePlayer = items[i];
    let blackPlayer = playersRandom[i];

    let match = new Match(whitePlayer, blackPlayer);
    eloService.playAMatch(match, date);

    result.push(match);
  }

  return result;
}

/**
 * Will generate application players
 * @private
 */
function _generatePlayers() {
  let result = [];
  for(let i = 0; i < 1000; i++) {
    result.push(Player.generate());
  }

  return result;
}

export default Game;