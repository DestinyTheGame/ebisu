const dedupe = require('ebisu/compare/duplicate');
const Armor = require('ebisu/armor');

/**
 * A collection of Armor Pieces.
 *
 * @public
 */
class ArmorSet {
  /**
   * [constructor description]
   *
   * @param {Array} items List of items in the collection.
   * @param {Object} meta Meta information about the collection
   * @param {String} meta.type Type of armor that we hold in our collection.
   * @param {String} meta.char Character class that owns this armor.
   * @public
   */
  constructor(items, { type, char }) {
    this.set = new Set(items.map((item) => new Armor(item)));

    this.type = type;
    this.char = char
  }

  /**
   * List how many armor pieces have a specific focus in their stat tier
   * distributions. This can give you information on what armor you can
   * focus to round out some of your armor collections.
   *
   * @returns {Object} Object with stat -> amount mapping
   * @public
   */
  focus() {
    const stat = {};

    this.set.forEach(function forEach(armor) {
      const highest = armor.highest();

      if (!stat[highest.stat]) stat[highest.stat] = 0;
      stat[highest.stat]++;
    });

    return stat;
  }

  /**
   * Compare the different armor pieces within the set.
   *
   * @param {Function} fn Compare function that receives 2 armor pieces to compare.
   * @returns {Array} List of armor pieces have been flagged by the function.
   * @public
   */
  filter(fn = dedupe()) {
    if (this.type === 'identity') return [];

    const items = Array.from(this.set);
    const flagged = [];

    items.forEach(function filter(armor, index) {
      const result = fn(armor, index, items, flagged);
      if (result) flagged.push(result);
    });

    return flagged;
  }

  /**
   * [metrics description]
   *
   * @returns {[type]} [description]
   * @public
   */
  metrics() {
    const spike = { 'class': 0, 'ability': 0 };
    const plugs = { 'class': 0, 'ability': 0 };
    const highest = {};
    const rarity = {};
    let total = 0;

    this.set.forEach(function each(armor) {
      if (!rarity[armor.rarity]) rarity[armor.rarity] = 0;
      rarity[armor.rarity]++;

      ['class', 'ability'].forEach(function sum(group) {
        if (spike[group] < armor.spike[group]) spike[group] = armor.spike[group];
        if (plugs[group] < armor.plugs[group]) plugs[group] = armor.plugs[group];
      });

      const high = armor.highest();

      if (!highest[high.stat]) highest[high.stat] = 0;
      if (highest[high.stat] < high.value) highest[high.stat] = high.value;

      if (total < armor.total) total = armor.total;
    });

    return {
      size: this.set.size,
      focus: this.focus(),
      highest,
      rarity,
      total,
      spike,
      plugs
    };
  }
}

module.exports = ArmorSet;
