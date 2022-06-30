/**
 * Our default armor grading specification. This will be used to determine the
 * quality of a given armor piece.
 *
 * NOTE: https://www.reddit.com/r/DestinyTheGame/comments/mpaopq/how_armor_stats_roll_an_advanced_insight_into/
 *
 * @type {Object}
 */
const specification = [
  { 'total': '>=67', 'quality': 'high' },
  { 'total': '>=63', 'class.spike': '>=20', 'ability.spike': '>=20', 'quality': 'high' },
  { 'class.spike': '>=20', 'ability.spike': '>=20', 'quality': 'medium' },
  { 'total': '<60', 'quality': 'low' }
];

/**
 * Mapping of short hand stat names to their full name counterparts.
 *
 * @type {Object}
 */
const shortStat = {
  'mob': 'Mobility',
  'res': 'Resilience',
  'rec': 'Recovery',
  'int': 'Intellect',
  'dis': 'Discipline',
  'str': 'Strength'
};

/**
 * List of all the different quality tiers we want to restrict armor to.
 *
 * @type {Array}
 */
const tiers = [
  'low',
  'medium',
  'high'
];

/**
 * List of properties that can be used for queries.
 *
 * @type {Object}
 */
const queries = {
  ...shortStat,

  'tot': 'Total',
  'char': 'Character',
  'type': 'Armor piece',
  'rarity': 'Item rarity',
  'class.plug': 'Total points for the class plug (top 3 stats)',
  'ability.plug': 'Total points for the ability plug (bottom 3 stats)',
  'class.spike': 'Highest stat in the class plug (top 3 stats)',
  'ability.spike': 'Highest stat in the ability plug (bottom 3 stats)'
};

module.exports = {
  specification,
  shortStat,
  queries,
  tiers
};
