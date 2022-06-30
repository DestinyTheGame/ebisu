const ArmorSet = require('ebisu/armor-set');

/**
 * Representation of a single character.
 *
 * @public
 */
class Character {
  /**
   * [constructor description]
   *
   * @param {Array} data Dataset.
   * @param {Object} meta Meta data about the dataset.
   * @param {Object} meta.char Character
   * @public
   */
  constructor(data, { char }) {
    this.char = char;
    this.gear = ['arms', 'legs', 'chest', 'helmet', 'identity'].reduce(
      (memo, type) => {
        memo[type] = new ArmorSet(data[type], { type, char });
        return memo;
      }, {}
    );

    ['metrics', 'filter', 'focus'].forEach(
      (method) => this[method] = this.proxy.bind(this, method)
    );

    ['forEeach', 'map', 'reduce'].forEach(
      (method) => this[method] = (...args) => Object.entries(this.gear)[method](...args)
    );
  }


  /**
   * Call the given method on each of the armor sets.
   *
   * @param {String} method Name of the method to excute.
   * @param {Mixed} args arguments for the given method.
   * @returns {Object} Object where the key is the armor piece, value the result.
   * @private
   */
  proxy(method, ...args) {
    return Object.entries(this.gear).reduce(function (memo, [type, set]) {
      memo[type] = set[method](...args);
      return memo;
    }, {});
  }
}

//
//
//
module.exports = Character;
