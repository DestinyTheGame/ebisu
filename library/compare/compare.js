/**
 * Simple filter function that compares armor pieces and returns the worse
 * versions.
 *
 * @param {Function} fn Compare function that receives, the better, and worse armor.
 * @returns {Function} Configured compare function.
 * @private
 */
module.exports = function compare(fn) {
  /**
   * Compare 2 given armor pieces to see if they are duplicate.
   *
   * @param {Armor} armor Armor piece.
   * @param {Number} _index The index of the armor piece in the array.
   * @param {Array} all All the armor pieces.
   * @param {Array} flagged All previously flagged armor pieces.
   * @returns {Boolean} Indication that compared (b) should be flagged.
   * @private
   */
  return function filter(armor, _index, all, flagged) {
    if (flagged.includes(armor)) return;

    const better = all.some(function search(better) {
      if (armor === better || armor.rarity !== better.rarity || flagged.includes(better)) {
        return false;
      }

      return fn(better, armor);
    });

    if (better) return armor;
  }
}
