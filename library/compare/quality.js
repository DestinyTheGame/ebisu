module.exports = function quality({ quality, rules } = {}) {
  /**
   * Compare 2 given armor pieces to see if they are duplicate.
   *
   * @param {Armor} armor Armor piece.
   * @returns {Boolean} Indication that compared (b) should be flagged.
   * @private
   */
  return function filter(armor) {
    const tier = armor.quality(rules);

    if (tier === quality) return armor;
  }
}
