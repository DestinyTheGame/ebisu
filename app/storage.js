const { useSyncExternalStore } = require('react');
const csv = require('ebisu/sources/csv');

/**
 * Contains all the assigned listeners of our state.
 *
 * @type {Set}
 * @private
 */
const listeners = new Set();

/**
 * Snapshot of the current state.
 *
 * @type {Object}
 */
let snapshot = {};

/**
 * The current global state of the application. This is where you configuration
 * and parsed data should be stored. A proxy is used to trigger change "events"
 * so React can re-render the application when new data is added.
 *
 * This will be the main entry point.
 *
 * @type {Proxy}
 * @public
 */
const state = new Proxy({}, {
  ...['deleteProperty', 'defineProperty'].reduce(function reduce(memo, op) {
    memo[op] = function listen() {
      //
      // Process any modification of our global state before we trigger
      // change handlers.
      //
      const response = Reflect[op](...arguments);

      //
      // Generate a snapshot of the new state of the universe, React expects
      // the snapshots to be somewhat consistent, it will throw a fit when
      // you keep returning fresh objects as snapshots even when the contents
      // never changed. So to ensure that we have a consistent, but unique
      // snapshot we create this aftere the modifications are done.
      //
      snapshot = { ...state };

      //
      // Finally all required changese are made, we can notify any subscribers
      // that a change has been received and updates should be processed.
      //
      listeners.forEach((fn) => fn());

      //
      // Important, we still want to return the response of our Reflect
      // operation to ensure that we follow the expect behavior of the applied
      // modification.
      //
      return response;
    };

    return memo;
  }, {})
});

/**
 * Subscribe to state changes.
 *
 * @param {Function} fn Listener.
 * @returns {Function} Removes the assigned listener.
 * @public
 */
function subscribe(fn) {
  listeners.add(fn);

  return () => listeners.delete(fn);
}

/**
* Get a snapshot of the current state.
*
* @returns {Object} Snapshot of the state.
* @public
*/
function getSnapshot() {
  return snapshot;
}

/**
 * Parse the received file, we make the assumption that this is a .csv file
 * that contains all the armor information we need from DIM.
 *
 * @param {Blob} file The file we received from the dropzone.
 * @returns {Promise} Completion when the file is read, and parsed.
 * @private
 */
function parse(file) {
  const reader = new FileReader();

  return new Promise(function pinky(resolve, reject) {
    reader.onabort = () => reject(new Error('File reading was aborted'));
    reader.onerror = () => reject(new Error('Failed to read the file'));

    reader.onload = async function onload() {
      let data;

      try { data = await csv(reader.result); }
      catch (e) { /* We assume no data == failure */ }

      if (data) return resolve(data);
      reject(new Error('Failed to parse data'));
    };

    reader.readAsText(file);
  });
}

module.exports = {
  state,
  parse,
  subscribe,
  getSnapshot
};
