import { subscribe, getSnapshot } from './storage';
import Dropzone from './components/dropzone';
import { useSyncExternalStore } from 'react';
import Character from 'ebisu/character';
import App from './components/app';

/**
 * Render the content based on the current state.
 *
 * @private
 */
function Content() {
  const storage = useSyncExternalStore(subscribe, getSnapshot);

  //
  // If we don't have any armor loaded we need to promp our consumers for
  // their data. Currently we only support the DIM destinyArmor.csv file.
  // In the future a selection should be made between "stale" DIM data or
  // "live" API Data from the Bungie API.
  //
  if (!storage.armor) return <Dropzone />;

  return <App characters={
    Object.keys(storage.armor).map((char) => new Character(storage.armor[char], { char }))
  } />;
}

/**
 * Application boostrapping.
 *
 * @constructor
 * @private
 */
export default function Boostrap() {
  return (
    <div className="container">
      <Content />
    </div>
  );
};
