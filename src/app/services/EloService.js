import Player from '../models/Player';
import Match from '../models/Match';

class EloService {
  constructor() {}

  /**
   * Plays a match and generates it's result
   * @param match
   * @param date
   */
  playAMatch(match, date) {
    if(!match || !(match instanceof Match)) { throw new Error('match argument is required'); }

    let whiteDice = Math.random();
    let blackDice = Math.random();

    //If it's a withdraw
    if(whiteDice <= match.whitePlayer.chance && blackDice <= match.blackPlayer.chance ||
      whiteDice > match.whitePlayer.chance && blackDice > match.blackPlayer.chance) {

      match.play(0.5, date);
    }
    //Whites won
    else if(whiteDice < match.whitePlayer.chance) {
      match.play(1, date);
    }
    //Black won
    else {
      match.play(0, date);
    }

  }

}

export default (new EloService());