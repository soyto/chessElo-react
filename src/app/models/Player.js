import uuid from 'uuid/v1';
import is from 'is_js';
import $Chance from 'chance';

const chance = new $Chance();

class Player {

  /**
   * Unique uuid for each player
   * @returns {string}
   */
  get uuid() {
    return this._id;
  }

  /**
   * Elo of the player
   * @returns {number}
   */
  get elo() {
    return this._elo;
  }

  /**
   * Elo of the player
   * @param {number} newElo
   */
  set elo(newElo) {
    this._elo = newElo;
  }

  /**
   * Name of the player
   * @returns {*}
   */
  get name() {
    return this._name;
  }

  /**
   * Constructor
   * @param {string} name
   * @throws {Error} if no name argument is given
   */
  constructor(name) {

    if(is.undefined(name) || is.null(name) || !is.string(name) || is.empty(name.trim())) {
      throw new Error('You should specify name argument');
    }

    this._name = name;
    this._elo = 1500;
    this._id = uuid();
  }
}

Player.generate = function() {
  return new Player(chance.name({middle: true}));
};


export default Player;