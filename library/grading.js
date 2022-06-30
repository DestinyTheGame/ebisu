/**
 * Parses the query and checks if there is a match with the value.
 *
 * @param {String} str The query string to parse.
 * @param {Number|String} value Value it should match.
 * @returns {Boolean} If the query is satisfied.
 * @private
 */
function query(str, value) {
  const [match, operator, stat] = (/([!>=<]+)?(\d+)/.exec(str) || []);

  if (!match || !operator) return str.toString() === value.toString();

  switch(operator) {
    case '>': return +value > +stat;
    case '>=': return +value >= +stat;
    case '<': return +value < +stat;
    case '<=': return +value <= +stat;
    default: return value.toString() === stat.toString();
  }
}

/**
 * Grade the given data according to a given rule.
 *
 * @param {Object} rule A single rule.
 * @param {Map} data Data the rule is allowed to use.
 * @returns {False|String} Quality of the item according to the rule, or false.
 */
function grading(rule = {}, data = new Map()) {
  const { quality, ...specification } = rule;

  return Object.keys(specification).every(function every(key) {
    if (!data.has(key)) return false;

    return query(specification[key], data.get(key));
  }) && quality;
}

module.exports = grading;
