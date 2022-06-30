const { specification, shortStat } = require('ebisu/constants');
const grading = require('ebisu/grading');

/**
 * [Armor description]
 */
class Armor {
  /**
   * [constructor description]
   *
   * @param {Object} options The stats of the armor piece.
   * @param {Number} options.mob Mobility stat stat of the specific armor piece.
   * @param {Number} options.res Resilience stat of the specific armor piece.
   * @param {Number} options.rec Recovery stat of the specific armor piece.
   * @param {Number} options.dis Discipline stat of the specific armor piece.
   * @param {Number} options.int Intellect stat of the specific armor piece.
   * @param {Number} options.str Strength stat of the specific armor piece.
   * @param {String} options.type Type of armor we're currently listing.
   * @param {String} options.id Type of armor we're currently listing.
   * @param {String} options.char The character/class of the armor.
   * @param {String} options.rarity Rarity of the armor.
   * @private
   */
  constructor({ type, rarity, char, id, ...stats } = {}) {
    Object.keys(shortStat).forEach((name) => {
      this[name] = name in stats ? +stats[name] : 2
    });

    this.id = id;
    this.type = type;
    this.char = char;
    this.rarity = rarity;

    this.spike = {
      'class': Math.max(this.mob, this.res, this.rec),
      'ability': Math.max(this.dis, this.int, this.str)
    };

    this.plugs = {
      'class': this.mob + this.res + this.rec,
      'ability': this.dis + this.int + this.str
    };

    this.total = Object.values(this.plugs).reduce((sum, val) => sum + val, 0);
  }

  /**
   * Returns an array with all the relevant armor stats. The array will be
   * sorted on highest stats first.
   *
   * @returns {Array} List of armor
   * @public
   */
  stats() {
    return Object.keys(shortStat).map((short) => ({
      value: this[short], stat: short
    })).sort(function sort(a, b) {
      return b.value - a.value;
    });
  }

  /**
   * Returns the highest stats.
   *
   * @returns {Object} The highest stat.
   * @public
   */
  highest() {
    return this.stats()[0];
  }

  /**
   * Grades the armor piece according to a given specification.
   *
   * @param {Array} [spec=specification] Specification describing the grades.
   * @returns {String}
   */
  quality(rules = specification) {
    const data = new Map([
      ...Object.keys(shortStat).reduce((memo, short) => memo.push(
        [short, this[short]]
      ) && memo, []),
      ['tot', this.total],
      ['total', this.total],
      ['char', this.char],
      ['type', this.type],
      ['rarity', this.rarity],
      ['class.plug', this.plugs['class']],
      ['ability.plug', this.plugs['ability']],
      ['class.spike', this.spike['class']],
      ['ability.spike', this.spike['ability']]
    ]);

    for (let i = 0; i < rules.length; i++) {
      const rating = grading(rules[i], data);

      if (rating) return rating;
    }

    return 'low';
  }
}

//
// Expose the armor class.
//
module.exports = Armor;
