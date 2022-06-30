const Character = require('ebisu/character');

/**
 * Simple representation of a vault that contains the items for characters.
 *
 * @public
 */
class Vault {
  /**
   * Creates a new container for characters.
   *
   * @param {Object} characters K/V object where key is the name, value the items it holds.
   * @private
   */
  constructor(characters) {
    this.chars = Object.keys(characters).reduce(function reduce(memo, char) {
      memo[char] = new Character(characters[char], { char });

      return memo;
    }, {});

    ['metrics', 'filter', 'focus'].forEach(
      (method) => this[method] = this.proxy.bind(this, method)
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
    return Object.entries(this.chars).reduce(function (memo, [type, char]) {
      memo[type] = char[method](...args);
      return memo;
    }, {});
  }
}

//
// Expose the vault.
//
module.exports = Vault;
