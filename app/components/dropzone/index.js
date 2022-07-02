import { useCallback, useState } from 'react';
import { state, parse } from '../../storage';
import { useDropzone } from 'react-dropzone';
import { FaFileCsv, FaCog } from 'react-icons/fa';
import Header from '../header';
import Alert from '../alert';

import './styles.css';

/**
 * Display a dropzone that will accept a users destinyArmor.csv file so we
 * can use it as it as source of information.
 *
 * @return {React.Element} The dropzone.
 * @public
 */
export default function Dropzone() {
  const [failed, setFailed] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: useCallback(function dropped(files) {
      files.forEach(async function each(file) {
        let armor;

        try { armor = await parse(file); }
        catch (e) { return setFailed(e); }

        state.armor = armor;
      });
    })
  });

  return (
    <>
      <Header />

      <div className="dropzone container">
        { failed && <Alert error={ failed } /> }

        <div className="columns">
          <div className="column col-6 drop-container">
            <div className="drop-target" { ...getRootProps() }>
              <input { ...getInputProps() } />

              <div>
                <FaFileCsv />
                <h5>Import your destinyArmor.csv</h5>
                <p>Drag 'n' drop the .csv or <a href="#fake">click to select</a></p>
              </div>
            </div>
          </div>
          <div className="column col-6">
            <h5>Where do you find the destinyArmor.csv</h5>
            <p className="help">
              The destinyArmor.csv file is exported by the
              <a href="https://dim.gg/" title="Destiny Item Manageer"> DIM </a>
              application. We use this file as source of data for the whole
              application.
            </p>
            <ol className="steps">
              <li>Open the application, and log-in with your Bungie account.</li>
              <li>Once DIM is loaded press the <FaCog /> icon.</li>
              <li>In the settings menu click the "SPREADSHEETS" item</li>
              <li>Click the Armor button</li>
              <li>Save the exported to disk, and then drop it in our file import.</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
