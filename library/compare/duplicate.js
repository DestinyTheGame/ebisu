const { shortStat } = require('ebisu/constants');
const compare = require('./compare');

/**
 * Dedupe armor pieces. Finds duplicates that are better.
 *
 * @param {Number} [points=0] The amount of points we should bump our base armor with.
 * @returns {Function} compare function.
 */
module.exports = function duplicate(points=0) {
  /**
   * Compares that stats to see if there are better or same armor pieces
   * available.
   *
   * @param {Armor} better Potentially better armor.
   * @param {Armor} worse Potentially worse armor.
   * @returns {Boolean} Indication that the first piece is better.
   * @private
   */
  return compare(function compare(better, worse) {
    return Object.keys(shortStat).every(function every(stat) {
      return (better[stat] + points) >= worse[stat];
    });
  });
}
