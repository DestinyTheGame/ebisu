const csvparse = require('csv-parse/sync').parse;
const { shortStat } = require('ebisu/constants');

/**
 * Rename schema for our normalization process. The `key` is our expected key,
 * and the value is how it's presented in the dataset.
 *
 * @type {Object}
 * @private
 */
const schema = {
  ...Object.keys(shortStat).reduce(function reduce(memo, short) {
    memo[`${shortStat[short]} (Base)`] = short;
    return memo;
  }, {}),

  Type: ['type', {
    'Chest Armor': 'chest',
    'Leg Armor': 'legs',
    'Helmet': 'helmet',
    'Gauntlets': 'arms',
    'Warlock Bond': 'identity',
    'Titan Mark': 'identity',
    'Hunter Cloak': 'identity'
  }],
  Tier: ['rarity', {
    'Legendary': 'legendary',
    'Exotic': 'exotic',
    'Rare': 'rare',
    'Uncommon': 'uncommon',
    'Common': 'common'
  }],
  Equippable: ['char', {
    'Titan': 'titan',
    'Hunter': 'hunter',
    'Warlock': 'warlock'
  }],
  Id: 'id'
};

/**
 * Normalize parsed data structure to something smaller and managable. The
 * resulting object is created from a `null` to prevent any pre-existing
 * JavaScript properties from interfering or can be used as potential
 * exploit as we have no control over the data structure that we receive.
 *
 * @param {Object} item A single line from the destinyArmor.csv
 * @returns {Object} Normalized result with only the data we need.
 * @private
 */
function normalize(item) {
  return Object.keys(schema).reduce(function rename(memo, old) {
    let key = schema[old];
    let value = item[old];

    if (Array.isArray(key)) {
      value = key[1][value];
      key = key[0];
    }

    memo[key] = value;
    return memo;
  }, Object.create(null));
}

/**
 * Use the destinyArmor.csv output from DIM as armor source.
 *
 * @param {String} contents Contents of the `destinyArmor.csv` file.
 * @returns {Object} Parsed contents.
 * @public
 */
module.exports = async function parser(contents) {
  const csv = csvparse(contents, {
   skip_empty_lines: true,
   columns: true
 });

 //
 // Now that we have all the information we want to group data by class
 // then armor type so we can compare stats better.
 //
 const chars = {};

 csv.forEach(function each(armor) {
   const data = normalize(armor);
   const char = data.char;
   const type = data.type;

   //
   // Ensure that we make our dataset easily accessible by just grouping
   // armor based on their type.
   //
   if (!chars[char]) chars[char] = {};
   if (!chars[char][type]) chars[char][type] = [];

    chars[char][type].push(data);
 });

 return chars;
};
