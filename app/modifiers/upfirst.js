/**
 * Transforms a given string into an uppercase first variant.
 *
 * @param {String} str String to transform.
 * @returns {String} Uppercase first string.
 * @pubilc
 */
export default function upfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
